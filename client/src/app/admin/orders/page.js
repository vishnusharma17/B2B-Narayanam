"use client";

import {
  DollarSign,
  ExternalLink,
  Eye,
  Package,
  Save,
  Search,
  ShoppingBag,
  Truck,
} from "lucide-react";

import Link from "next/link";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../../lib/api";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const [trackingData, setTrackingData] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // FETCH ORDERS
  // =========================

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

      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE STATUS
  // =========================

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

  // =========================
  // FILTERED ORDERS
  // =========================

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id?.slice(-6).includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =========================
  // STATS
  // =========================

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

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          justify-center
          items-center
          bg-[#F8F3EC]
        "
      >
        <div className="text-center">
          <div
            className="
              w-14
              h-14
              border-4
              border-[#7A1E1E]
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
              mb-5
            "
          />

          <h2
            className="
              text-xl
              sm:text-2xl
              font-medium
            "
          >
            Loading Orders...
          </h2>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue}`,
      icon: <DollarSign size={24} />,
    },

    {
      title: "Total Orders",
      value: orders.length,
      icon: <ShoppingBag size={24} />,
    },

    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <Package size={24} />,
    },

    {
      title: "Delivered Orders",
      value: deliveredOrders,
      icon: <Truck size={24} />,
    },
  ];

  return (
    <div
      className="
        min-h-screen
        bg-[#F8F3EC]
        p-4
        sm:p-6
        lg:p-8
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="mb-8 sm:mb-10">
          <p
            className="
              uppercase
              tracking-[4px]
              text-[#C9A227]
              text-[11px]
              sm:text-xs
              mb-2
            "
          >
            Order Analytics
          </p>

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-light
              leading-tight
            "
          >
            Orders Dashboard
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              text-sm
              sm:text-base
            "
          >
            Manage orders, tracking and deliveries
          </p>
        </div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-4
            sm:gap-6
            mb-8
            sm:mb-10
          "
        >
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="
                  relative
                  overflow-hidden
                  bg-white
                  p-5
                  sm:p-6
                  rounded-[24px]
                  sm:rounded-[30px]
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
            >
              <div
                className="
                    absolute
                    top-0
                    right-0
                    w-[90px]
                    h-[90px]
                    bg-[#C9A227]/10
                    blur-[60px]
                    rounded-full
                  "
              />

              <div className="relative z-10">
                <div
                  className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-[#F8F3EC]
                      flex
                      items-center
                      justify-center
                      text-[#7A1E1E]
                      mb-4
                    "
                >
                  {card.icon}
                </div>

                <p
                  className="
                      text-gray-500
                      text-xs
                      sm:text-sm
                    "
                >
                  {card.title}
                </p>

                <h2
                  className="
                      text-2xl
                      sm:text-3xl
                      font-bold
                      mt-3
                      text-[#7A1E1E]
                      break-words
                    "
                >
                  {card.value}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH FILTER */}
        <div
          className="
            bg-white
            p-4
            sm:p-6
            rounded-[24px]
            sm:rounded-[30px]
            shadow-sm
            mb-8
            sm:mb-10
            flex
            flex-col
            lg:flex-row
            gap-4
          "
        >
          {/* SEARCH */}
          <div
            className="
              flex
              items-center
              border
              border-gray-200
              rounded-2xl
              px-4
              flex-1
              bg-[#fafafa]
            "
          >
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search customer or order id"
              className="
                w-full
                p-3
                outline-none
                bg-transparent
                text-sm
                sm:text-base
              "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* FILTER */}
          <select
            className="
              border
              border-gray-200
              p-3
              rounded-2xl
              outline-none
              bg-[#fafafa]
              text-sm
              sm:text-base
              min-w-[180px]
            "
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

        {/* ORDERS */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="
                  bg-white
                  rounded-[28px]
                  sm:rounded-[36px]
                  p-5
                  sm:p-8
                  shadow-sm
                  overflow-hidden
                "
            >
              {/* HEADER */}
              <div
                className="
                    flex
                    flex-col
                    lg:flex-row
                    justify-between
                    items-start
                    gap-5
                    border-b
                    border-gray-100
                    pb-6
                  "
              >
                {/* LEFT */}
                <div>
                  <p
                    className="
                        text-[#C9A227]
                        text-xs
                        uppercase
                        tracking-[3px]
                        mb-2
                      "
                  >
                    Order ID
                  </p>

                  <h2
                    className="
                        text-xl
                        sm:text-2xl
                        font-semibold
                      "
                  >
                    #{order._id.slice(-6)}
                  </h2>

                  <p className="text-gray-600 mt-3 break-words">
                    {order.customerName}
                  </p>

                  <p className="text-gray-500 text-sm break-all mt-1">
                    {order.email}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="lg:text-right">
                  <h3
                    className="
                        text-2xl
                        sm:text-3xl
                        font-bold
                        text-[#7A1E1E]
                      "
                  >
                    ₹{order.totalAmount}
                  </h3>

                  <div
                    className="
                        inline-flex
                        items-center
                        px-4
                        py-2
                        rounded-full
                        bg-[#F8F3EC]
                        text-sm
                        capitalize
                        mt-3
                      "
                  >
                    {order.status}
                  </div>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="mt-6 space-y-4">
                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className="
                          flex
                          flex-col
                          sm:flex-row
                          justify-between
                          items-start
                          sm:items-center
                          gap-4
                          border
                          border-gray-100
                          rounded-2xl
                          p-4
                        "
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.productId?.mainImage ||
                          item.productId?.galleryImages?.[0] ||
                          "/placeholder-product.jpg"
                        }
                        alt={item.productId?.name}
                        className="
                              w-16
                              h-16
                              sm:w-20
                              sm:h-20
                              object-cover
                              rounded-2xl
                              bg-[#f5f5f5]
                              shrink-0
                            "
                      />

                      <div>
                        <h3
                          className="
                                font-semibold
                                text-sm
                                sm:text-lg
                                leading-snug
                              "
                        >
                          {item.productId?.name}
                        </h3>

                        <p className="text-gray-500 text-sm mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* UPDATE SECTION */}
              <div
                className="
                    grid
                    md:grid-cols-2
                    gap-4
                    mt-8
                  "
              >
                <select
                  className="
                      border
                      border-gray-200
                      p-3.5
                      rounded-2xl
                      outline-none
                      bg-[#fafafa]
                    "
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
                  className="
                      border
                      border-gray-200
                      p-3.5
                      rounded-2xl
                      outline-none
                      bg-[#fafafa]
                    "
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
                  className="
                      border
                      border-gray-200
                      p-3.5
                      rounded-2xl
                      outline-none
                      bg-[#fafafa]
                    "
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
                  className="
                      border
                      border-gray-200
                      p-3.5
                      rounded-2xl
                      outline-none
                      bg-[#fafafa]
                    "
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

              {/* BUTTONS */}
              <div
                className="
                    flex
                    flex-col
                    sm:flex-row
                    flex-wrap
                    gap-4
                    mt-8
                  "
              >
                {/* SAVE */}
                <button
                  onClick={() => updateStatus(order._id, order.status)}
                  className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      bg-green-600
                      hover:bg-green-700
                      transition
                      text-white
                      px-6
                      py-3.5
                      rounded-2xl
                      w-full
                      sm:w-auto
                    "
                >
                  <Save size={18} />
                  Save Changes
                </button>

                {/* DETAILS */}
                <Link
                  href={`/admin/orders/${order._id}`}
                  className="
                      w-full
                      sm:w-auto
                    "
                >
                  <button
                    className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-black
                        hover:bg-[#222]
                        transition
                        text-white
                        px-6
                        py-3.5
                        rounded-2xl
                      "
                  >
                    <Eye size={18} />
                    View Details
                  </button>
                </Link>

                {/* INVOICE */}
                <a
                  href={`${BASE_URL}/api/invoice/${order._id}`}
                  target="_blank"
                  className="
                      w-full
                      sm:w-auto
                    "
                >
                  <button
                    className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-[#C9A227]
                        hover:bg-[#b8931f]
                        transition
                        text-black
                        px-6
                        py-3.5
                        rounded-2xl
                        font-medium
                      "
                  >
                    <ExternalLink size={18} />
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
