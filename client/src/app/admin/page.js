"use client";

import {
  BadgeIndianRupee,
  Boxes,
  ClipboardList,
  Layers3,
  PackageCheck,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";

import API from "../../../lib/api";

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
          px-4
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
            Loading Dashboard...
          </h2>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (!stats) {
    return (
      <div
        className="
          min-h-screen
          flex
          justify-center
          items-center
          text-red-500
          text-lg
          sm:text-xl
          px-4
          text-center
          bg-[#F8F3EC]
        "
      >
        Failed to load dashboard data
      </div>
    );
  }

  const cards = [
    {
      title: "Products",
      value: stats.totalProducts,
      icon: <ShoppingBag size={24} />,
    },

    {
      title: "Orders",
      value: stats.totalOrders,
      icon: <ClipboardList size={24} />,
    },

    {
      title: "Categories",
      value: stats.totalCategories,
      icon: <Layers3 size={24} />,
    },

    {
      title: "Enquiries",
      value: stats.totalEnquiries,
      icon: <Users size={24} />,
    },

    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: <PackageCheck size={24} />,
    },

    {
      title: "Paid Orders",
      value: stats.paidOrders,
      icon: <Boxes size={24} />,
    },

    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: <BadgeIndianRupee size={24} />,
    },

    {
      title: "Testimonials",
      value: stats.totalTestimonials,
      icon: <TrendingUp size={24} />,
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
      {/* HEADING */}
      <div
        className="
          mb-8
          sm:mb-10
        "
      >
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
          Admin Analytics
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
          Business Dashboard
        </h1>

        <p
          className="
            text-gray-500
            mt-3
            text-sm
            sm:text-base
          "
        >
          Track your business performance and orders
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
          sm:mb-12
        "
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="
                relative
                overflow-hidden
                bg-white
                p-5
                sm:p-7
                rounded-[24px]
                sm:rounded-[32px]
                shadow-sm
                hover:shadow-2xl
                transition-all
                duration-300
                border
                border-transparent
                hover:border-[#C9A227]/20
                hover:-translate-y-1
              "
          >
            {/* GLOW */}
            <div
              className="
                  absolute
                  top-0
                  right-0
                  w-[100px]
                  h-[100px]
                  bg-[#C9A227]/10
                  blur-[60px]
                  rounded-full
                "
            />

            <div className="relative z-10">
              {/* ICON */}
              <div
                className="
                    w-12
                    h-12
                    sm:w-14
                    sm:h-14
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

              {/* TITLE */}
              <h2
                className="
                    text-gray-500
                    text-xs
                    sm:text-sm
                    font-medium
                  "
              >
                {card.title}
              </h2>

              {/* VALUE */}
              <p
                className="
                    text-2xl
                    sm:text-4xl
                    font-bold
                    mt-3
                    text-[#7A1E1E]
                    break-words
                  "
              >
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS */}
      <div
        className="
          bg-white
          rounded-[28px]
          sm:rounded-[40px]
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
            sm:flex-row
            justify-between
            items-start
            sm:items-center
            gap-4
            mb-8
          "
        >
          <div>
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
              Latest Orders
            </p>

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-light
              "
            >
              Recent Orders
            </h2>
          </div>

          <div
            className="
              px-4
              py-2
              rounded-full
              bg-[#F8F3EC]
              text-sm
              text-gray-600
            "
          >
            Total: {stats.recentOrders?.length}
          </div>
        </div>

        {/* EMPTY */}
        {!stats.recentOrders || stats.recentOrders.length === 0 ? (
          <div
            className="
              text-center
              py-14
            "
          >
            <h3
              className="
                text-xl
                font-medium
                text-gray-700
              "
            >
              No recent orders found
            </h3>

            <p className="text-gray-500 mt-2">
              Orders will appear here once customers place orders.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <div
                key={order._id}
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
                    sm:p-5
                    hover:shadow-md
                    transition
                  "
              >
                {/* LEFT */}
                <div className="min-w-0">
                  <h3
                    className="
                        font-semibold
                        text-base
                        sm:text-lg
                        break-words
                      "
                  >
                    {order.customerName}
                  </h3>

                  <p
                    className="
                        text-gray-500
                        text-sm
                        break-all
                        mt-1
                      "
                  >
                    {order.email}
                  </p>
                </div>

                {/* RIGHT */}
                <div
                  className="
                      sm:text-right
                      w-full
                      sm:w-auto
                    "
                >
                  <p
                    className="
                        font-bold
                        text-xl
                        text-[#7A1E1E]
                      "
                  >
                    ₹{order.totalAmount}
                  </p>

                  <p
                    className="
                        text-sm
                        text-gray-500
                        capitalize
                        mt-1
                      "
                  >
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
