"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      name: "Categories",
      path: "/admin/categories",
    },
    {
      name: "Orders",
      path: "/admin/orders",
    },

    {
      name: "Hero Banners",
      path: "/admin/banners",
    },
    {
      name: "Shop Roles",
      path: "/admin/shop-roles",
    },
    {
      name: "Fashion Stories",
      path: "/admin/fashion-stories",
    },
    {
      name: "Wardrobe Picks",
      path: "/admin/wardrobe-picks",
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
    {
      name: "WholeSale",
      path: "/admin/wholesale",
    },
    {
      name: "About",
      path: "/admin/about",
    },
    {
      name: "contact",
      path: "/admin/contact",
    },
  ];

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl sm:text-2xl">
        Loading Admin...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F8F3EC] pt-[70px] sm:pt-[80px] relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="
          lg:hidden
          fixed
          top-[85px]
          left-4
          z-50
          bg-black
          text-white
          p-2.5
          rounded-lg
          shadow-lg
        "
      >
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed
          lg:sticky
          top-[70px]
          sm:top-[80px]
          left-0
          z-50
          w-[260px]
          sm:w-[280px]
          bg-black
          text-white
          p-5
          sm:p-8
          min-h-[calc(100vh-70px)]
          sm:min-h-[calc(100vh-80px)]
          overflow-y-auto
          transition-transform
          duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <h1 className="text-2xl sm:text-3xl font-light text-[#C9A227] mb-8 sm:mb-10 tracking-wide">
          Narayanam Admin
        </h1>

        {/* Menu */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setSidebarOpen(false)}
              className="
                  hover:text-[#C9A227]
                  transition
                  text-base
                  sm:text-lg
                "
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
          className="
            mt-8
            sm:mt-10
            bg-[#7A1E1E]
            px-5
            py-3
            rounded-xl
            w-full
            hover:bg-red-700
            transition
            text-sm
            sm:text-base
          "
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full">
        {children}
      </div>
    </div>
  );
}
