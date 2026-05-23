"use client";

import { DollarSign, Package, Search, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import API from "../../../lib/api";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const [trackingData, setTrackingData] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("adminToken");

      const payload = {
        status: trackingData[id]?.status || currentStatus,

        trackingId: trackingData[id]?.trackingId || "",

        courierName: trackingData[id]?.courierName || "",

        trackingLink: trackingData[id]?.trackingLink || "",
      };

      await API.put(`/orders/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Order updated successfully");

      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order");
    }
  };

  // FILTERED ORDERS
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.slice(-6).includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // STATS
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0,
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered",
  ).length;

  return (
    <div className="min-h-screen bg-[#F8F3EC] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-light mb-8">Orders Dashboard</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <DollarSign className="mb-3" />
            <p className="text-gray-500">Total Revenue</p>
            <h2 className="text-2xl font-bold">₹{totalRevenue}</h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md">
            <ShoppingBag className="mb-3" />
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-2xl font-bold">{orders.length}</h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md">
            <Package className="mb-3" />
            <p className="text-gray-500">Pending Orders</p>
            <h2 className="text-2xl font-bold">{pendingOrders}</h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md">
            <Truck className="mb-3" />
            <p className="text-gray-500">Delivered Orders</p>
            <h2 className="text-2xl font-bold">{deliveredOrders}</h2>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="bg-white p-6 rounded-3xl shadow-md mb-10 flex flex-col md:flex-row gap-4">
          <div className="flex items-center border rounded-xl px-4 flex-1">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search by customer/order id"
              className="w-full p-3 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="border p-3 rounded-xl"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders */}
        <div className="grid gap-8">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white p-8 rounded-3xl shadow-md">
              {/* Header */}
              <div className="flex justify-between flex-wrap gap-4 border-b pb-5">
                <div>
                  <h2 className="text-xl font-semibold">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-gray-500">{order.customerName}</p>

                  <p className="text-gray-500">{order.email}</p>
                </div>

                <div>
                  <p className="font-semibold text-lg">₹{order.totalAmount}</p>

                  <p className="text-sm text-gray-500">{order.status}</p>
                </div>
              </div>

              {/* Products */}
              <div className="mt-6 grid gap-4">
                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.productId?.mainImage ||
                          item.productId?.galleryImages?.[0] ||
                          "/placeholder-product.jpg"
                        }
                        alt={item.productId?.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />

                      <div>
                        <h3 className="font-semibold">
                          {item.productId?.name}
                        </h3>

                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Update */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <select
                  className="border p-3 rounded-xl"
                  value={trackingData[order._id]?.status || order.status}
                  onChange={(e) =>
                    setTrackingData({
                      ...trackingData,
                      [order._id]: {
                        ...trackingData[order._id],
                        status: e.target.value,
                      },
                    })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <input
                  type="text"
                  placeholder="Tracking ID"
                  className="border p-3 rounded-xl"
                  onChange={(e) =>
                    setTrackingData({
                      ...trackingData,
                      [order._id]: {
                        ...trackingData[order._id],
                        trackingId: e.target.value,
                      },
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Courier Name"
                  className="border p-3 rounded-xl"
                  onChange={(e) =>
                    setTrackingData({
                      ...trackingData,
                      [order._id]: {
                        ...trackingData[order._id],
                        courierName: e.target.value,
                      },
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Tracking Link"
                  className="border p-3 rounded-xl"
                  onChange={(e) =>
                    setTrackingData({
                      ...trackingData,
                      [order._id]: {
                        ...trackingData[order._id],
                        trackingLink: e.target.value,
                      },
                    })
                  }
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={() => updateStatus(order._id, order.status)}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl"
                >
                  Save Changes
                </button>

                <Link href={`/admin/orders/${order._id}`}>
                  <button className="bg-black text-white px-6 py-3 rounded-xl">
                    View Details
                  </button>
                </Link>

                <a
                  href={`http://localhost:5004/api/invoice/${order._id}`}
                  target="_blank"
                >
                  <button className="bg-[#C9A227] px-6 py-3 rounded-xl">
                    Invoice
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
