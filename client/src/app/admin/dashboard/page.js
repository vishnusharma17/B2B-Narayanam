"use client";

import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // FIXED

      const res = await API.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data.data);
    } catch (error) {
      console.log("Dashboard Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-2xl p-10">Loading Dashboard...</div>;
  }

  if (!stats) {
    return <div className="text-red-500 p-10">Failed to load dashboard</div>;
  }

  const cards = [
    {
      title: "Products",
      value: stats.totalProducts,
    },
    {
      title: "Orders",
      value: stats.totalOrders,
    },
    {
      title: "Categories",
      value: stats.totalCategories,
    },
    {
      title: "Enquiries",
      value: stats.totalEnquiries,
    },
    {
      title: "Paid Orders",
      value: stats.paidOrders,
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
    },
    {
      title: "Testimonials",
      value: stats.totalTestimonials,
    },
  ];

  return (
    <div className="p-10 bg-[#F9F6F1] min-h-screen">
      <h1 className="text-4xl mb-10 font-bold">Business Dashboard</h1>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 shadow rounded-2xl">
            <h2 className="text-gray-500">{card.title}</h2>

            <p className="text-3xl font-bold mt-3 text-[#7A1E1E]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-5">Recent Orders</h2>

        {stats.recentOrders?.length === 0 ? (
          <p>No recent orders</p>
        ) : (
          stats.recentOrders.map((order) => (
            <div key={order._id} className="flex justify-between border-b py-4">
              <div>
                <h3 className="font-semibold">{order.customerName}</h3>

                <p className="text-gray-500">{order.email}</p>
              </div>

              <div className="text-right">
                <p>₹{order.totalAmount}</p>

                <p className="capitalize text-sm text-gray-500">
                  {order.status}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
