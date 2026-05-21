"use client";

import {
  Heart,
  LogOut,
  MapPin,
  Package,
  Pencil,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (!userData) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(userData));
  }, []);

  const logout = () => {
    localStorage.removeItem("userToken");

    localStorage.removeItem("userData");

    window.dispatchEvent(new Event("storage"));

    toast.success("Logged out successfully");

    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const cards = [
    {
      title: "My Orders",
      icon: <Package size={22} />,
      link: "/my-orders",
    },
    {
      title: "Wishlist",
      icon: <Heart size={22} />,
      link: "/wishlist",
    },
    {
      title: "Saved Address",
      icon: <MapPin size={22} />,
      link: "/profile/address",
    },
    {
      title: "Change Password",
      icon: <Shield size={22} />,
      link: "/forgot-password",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-[120px] px-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 shadow-md mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center">
              <User size={35} />
            </div>

            <div>
              <h1 className="text-3xl font-light">{user.name}</h1>

              <p className="text-gray-500">{user.email}</p>

              <p className="text-gray-500">{user.phone}</p>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl">
            <Pencil size={18} />
            Edit Profile
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card, index) => (
            <Link key={index} href={card.link}>
              <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition cursor-pointer">
                <div className="mb-4 text-[#D4AF37]">{card.icon}</div>

                <h2 className="text-xl font-medium">{card.title}</h2>
              </div>
            </Link>
          ))}
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-3xl p-8 shadow-md mb-10">
          <h2 className="text-2xl mb-6">Personal Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500">Full Name</p>
              <h3>{user.name}</h3>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <h3>{user.email}</h3>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <h3>{user.phone}</h3>
            </div>

            <div>
              <p className="text-gray-500">Address</p>
              <h3>{user.address}</h3>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="text-center">
          <button
            onClick={logout}
            className="bg-red-500 text-white px-8 py-4 rounded-xl flex items-center gap-3 mx-auto"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
