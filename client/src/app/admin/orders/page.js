"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../../lib/api";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");

      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, {
        status,
        ...trackingData[id],
      });

      alert("Order Updated Successfully");

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-light mb-10">Orders Dashboard</h1>

        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-8 rounded-3xl shadow-md">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Customer Info */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Customer Info</h2>

                  <p>
                    <strong>Name:</strong> {order.customerName}
                  </p>

                  <p>
                    <strong>Phone:</strong> {order.phone}
                  </p>

                  <p>
                    <strong>Email:</strong> {order.email}
                  </p>

                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>
                </div>

                {/* Order Info */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Order Info</h2>

                  <p>
                    <strong>Total:</strong> ₹{order.totalAmount}
                  </p>

                  <p>
                    <strong>Payment:</strong> {order.paymentStatus}
                  </p>

                  <p>
                    <strong>Current Status:</strong> {order.status}
                  </p>

                  {/* Status Update */}
                  <select
                    className="mt-5 border p-3 rounded-xl w-full"
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>

                    <option value="confirmed">Confirmed</option>

                    <option value="shipped">Shipped</option>

                    <option value="delivered">Delivered</option>

                    <option value="cancelled">Cancelled</option>
                  </select>

                  {/* View Details */}
                  <Link href={`/admin/orders/${order._id}`}>
                    <button className="mt-5 w-full bg-black hover:bg-[#7A1E1E] text-white py-3 rounded-xl transition">
                      View Full Details
                    </button>
                  </Link>

                  {/* Download Invoice */}
                  <a
                    href={`http://localhost:5004/api/invoice/${order._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="mt-4 w-full bg-[#C9A227] hover:bg-[#b8941f] text-black py-3 rounded-xl transition font-medium">
                      Download Invoice
                    </button>
                  </a>
                </div>
              </div>

              {/* Products Preview */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Ordered Products</h3>

                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 border-b"
                  >
                    <p>{item.productId?.name}</p>

                    <p>Qty: {item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
