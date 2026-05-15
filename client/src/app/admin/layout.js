"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin-login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
    },
    {
      name: "Products",
      path: "/admin/products",
    },
    {
      name: "Orders",
      path: "/admin/orders",
    },
    {
      name: "Categories",
      path: "/admin/categories",
    },
    {
      name: "Reviews",
      path: "/admin/reviews",
    },
    {
      name: "Newsletter",
      path: "/admin/newsletter",
    },
    {
      name: "Enquiries",
      path: "/admin/enquiries",
    },
  ];

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading Admin...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F8F3EC] pt-[80px]">
      {/* Sidebar */}
      <div className="w-[280px] bg-black text-white p-8 min-h-screen sticky top-[80px]">
        <h1 className="text-3xl font-light text-[#C9A227] mb-10 tracking-wide">
          Narayanam Admin
        </h1>

        {/* Menu */}
        <div className="flex flex-col gap-5">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="hover:text-[#C9A227] transition text-lg"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");

            router.push("/admin-login");
          }}
          className="mt-10 bg-[#7A1E1E] px-5 py-3 rounded-xl w-full hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">{children}</div>
    </div>
  );
}
