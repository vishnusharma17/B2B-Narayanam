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
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.log("Admin token missing");
        setLoading(false);
        return;
      }

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
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-xl">
        Failed to load dashboard data
      </div>
    );
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
      title: "Pending Orders",
      value: stats.pendingOrders,
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
      title: "Testimonials",
      value: stats.totalTestimonials,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F3EC] p-8">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-light">Business Dashboard</h1>

        <p className="text-gray-500 mt-2">Track your business performance</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-gray-500 text-lg">{card.title}</h2>

            <p className="text-3xl font-bold mt-4 text-[#7A1E1E]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-8 rounded-3xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>

        {!stats.recentOrders || stats.recentOrders.length === 0 ? (
          <p className="text-gray-500">No recent orders found</p>
        ) : (
          <div className="grid gap-4">
            {stats.recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {order.customerName}
                  </h3>

                  <p className="text-gray-500">{order.email}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-[#7A1E1E]">
                    ₹{order.totalAmount}
                  </p>

                  <p className="text-sm text-gray-500 capitalize">
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
