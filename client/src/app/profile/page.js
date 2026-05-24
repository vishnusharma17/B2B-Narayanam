"use client";

import {
  Heart,
  LogOut,
  Mail,
  MapPin,
  Package,
  Pencil,
  Phone,
  Save,
  Shield,
  User,
  X,
} from "lucide-react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../lib/api";

export default function ProfilePage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const [user, setUser] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // =========================
  // LOAD USER
  // =========================

  useEffect(() => {
    setMounted(true);

    const userData = localStorage.getItem("userData");

    if (!userData) {
      router.push("/login");

      return;
    }

    const parsedUser = JSON.parse(userData);

    setUser(parsedUser);

    setFormData({
      name: parsedUser.name || "",
      email: parsedUser.email || "",
      phone: parsedUser.phone || "",
      address: parsedUser.address || "",
    });
  }, [router]);

  // =========================
  // UPDATE PROFILE
  // =========================

  const updateProfile = async () => {
    try {
      if (!formData.name || !formData.email || !formData.phone) {
        return toast.error("Please fill required fields");
      }

      setSaving(true);

      const token = localStorage.getItem("userToken");

      const res = await API.put("/auth/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser = res.data.user;

      // UPDATE LOCAL STORAGE
      localStorage.setItem("userData", JSON.stringify(updatedUser));

      // UPDATE STATE
      setUser(updatedUser);

      // REFRESH NAVBAR
      window.dispatchEvent(new Event("storage"));

      toast.success("Profile Updated Successfully");

      setEditMode(false);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const cancelEdit = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    });

    setEditMode(false);
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("userToken");

    localStorage.removeItem("userData");

    window.dispatchEvent(new Event("storage"));

    toast.success("Logged out successfully");

    router.push("/");
  };

  // =========================
  // HYDRATION FIX
  // =========================

  if (!mounted || !user) {
    return (
      <div
        className="
          min-h-screen
          flex
          justify-center
          items-center
          bg-[#F8F3EC]
          text-lg
          sm:text-2xl
        "
      >
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
    <div
      className="
        min-h-screen
        bg-[#F8F3EC]
        pt-[100px]
        sm:pt-[120px]
        px-4
        sm:px-6
        lg:px-8
        pb-14
      "
    >
      <div className="max-w-6xl mx-auto">
        {/* PROFILE HEADER */}
        <div
          className="
            relative
            overflow-hidden
            bg-white
            rounded-[28px]
            sm:rounded-[40px]
            p-5
            sm:p-8
            lg:p-10
            shadow-sm
            border
            border-white/40
            mb-8
            sm:mb-10
          "
        >
          {/* GLOW */}
          <div
            className="
              absolute
              top-0
              right-0
              w-[220px]
              h-[220px]
              bg-[#D4AF37]/10
              blur-[100px]
              rounded-full
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              lg:flex-row
              justify-between
              items-start
              lg:items-center
              gap-6
            "
          >
            {/* LEFT */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                sm:items-start
                gap-5
                w-full
              "
            >
              {/* AVATAR */}
              <div
                className="
                  w-24
                  h-24
                  rounded-full
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-xl
                  shrink-0
                "
              >
                <User size={38} />
              </div>

              {/* USER INFO */}
              <div className="w-full">
                <p
                  className="
                    uppercase
                    tracking-[4px]
                    text-[#D4AF37]
                    text-xs
                    mb-2
                    text-center
                    sm:text-left
                  "
                >
                  Premium Member
                </p>

                {editMode ? (
                  <div className="space-y-4 w-full sm:max-w-[400px]">
                    {/* NAME */}
                    <div className="relative">
                      <User
                        size={18}
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                        "
                      />

                      <input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Full Name"
                        className="
                          w-full
                          border
                          border-gray-200
                          focus:border-black
                          outline-none
                          pl-12
                          pr-4
                          py-3.5
                          rounded-2xl
                        "
                      />
                    </div>

                    {/* EMAIL */}
                    <div className="relative">
                      <Mail
                        size={18}
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                        "
                      />

                      <input
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        placeholder="Email"
                        className="
                          w-full
                          border
                          border-gray-200
                          focus:border-black
                          outline-none
                          pl-12
                          pr-4
                          py-3.5
                          rounded-2xl
                        "
                      />
                    </div>

                    {/* PHONE */}
                    <div className="relative">
                      <Phone
                        size={18}
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                        "
                      />

                      <input
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        placeholder="Phone"
                        className="
                          w-full
                          border
                          border-gray-200
                          focus:border-black
                          outline-none
                          pl-12
                          pr-4
                          py-3.5
                          rounded-2xl
                        "
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1
                      className="
                        text-3xl
                        sm:text-4xl
                        font-light
                        leading-tight
                        text-center
                        sm:text-left
                      "
                    >
                      {user.name}
                    </h1>

                    <p
                      className="
                        text-gray-500
                        mt-3
                        break-all
                        text-center
                        sm:text-left
                      "
                    >
                      {user.email}
                    </p>

                    <p
                      className="
                        text-gray-500
                        mt-1
                        text-center
                        sm:text-left
                      "
                    >
                      {user.phone}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <div
              className="
                flex
                gap-3
                w-full
                sm:w-auto
              "
            >
              {editMode ? (
                <>
                  <button
                    onClick={updateProfile}
                    disabled={saving}
                    className="
                      flex-1
                      sm:flex-none
                      flex
                      items-center
                      justify-center
                      gap-2
                      bg-green-600
                      hover:bg-green-700
                      disabled:opacity-70
                      transition
                      text-white
                      px-6
                      py-3.5
                      rounded-2xl
                      shadow-lg
                    "
                  >
                    <Save size={18} />

                    {saving ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={cancelEdit}
                    className="
                      flex-1
                      sm:flex-none
                      flex
                      items-center
                      justify-center
                      gap-2
                      bg-gray-200
                      hover:bg-gray-300
                      transition
                      text-black
                      px-6
                      py-3.5
                      rounded-2xl
                    "
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="
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
                    shadow-lg
                    w-full
                    sm:w-auto
                  "
                >
                  <Pencil size={18} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
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
          {cards.map((card, index) => (
            <Link key={index} href={card.link}>
              <div
                className="
                    group
                    bg-white
                    p-5
                    sm:p-8
                    rounded-[24px]
                    sm:rounded-[32px]
                    shadow-sm
                    hover:shadow-2xl
                    transition-all
                    duration-300
                    cursor-pointer
                    border
                    border-transparent
                    hover:border-[#D4AF37]/40
                    hover:-translate-y-1
                    h-full
                  "
              >
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
                      mb-4
                      text-[#D4AF37]
                      group-hover:bg-black
                      group-hover:text-white
                      transition-all
                      duration-300
                    "
                >
                  {card.icon}
                </div>

                <h2
                  className="
                      text-sm
                      sm:text-xl
                      font-medium
                      leading-snug
                    "
                >
                  {card.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {/* PERSONAL INFO */}
        <div
          className="
            bg-white
            rounded-[28px]
            sm:rounded-[40px]
            p-5
            sm:p-8
            lg:p-10
            shadow-sm
            mb-8
            sm:mb-10
          "
        >
          <div className="mb-8">
            <p
              className="
                uppercase
                tracking-[4px]
                text-[#D4AF37]
                text-xs
                mb-2
              "
            >
              Account Details
            </p>

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-light
              "
            >
              Personal Information
            </h2>
          </div>

          <div
            className="
              grid
              sm:grid-cols-2
              gap-5
              sm:gap-6
            "
          >
            {/* NAME */}
            <div
              className="
                bg-[#F8F3EC]
                rounded-2xl
                p-5
              "
            >
              <p className="text-gray-500 text-sm mb-2">Full Name</p>

              <h3 className="text-lg font-medium break-words">
                {user.name || "N/A"}
              </h3>
            </div>

            {/* EMAIL */}
            <div
              className="
                bg-[#F8F3EC]
                rounded-2xl
                p-5
              "
            >
              <p className="text-gray-500 text-sm mb-2">Email</p>

              <h3 className="text-lg font-medium break-all">
                {user.email || "N/A"}
              </h3>
            </div>

            {/* PHONE */}
            <div
              className="
                bg-[#F8F3EC]
                rounded-2xl
                p-5
              "
            >
              <p className="text-gray-500 text-sm mb-2">Phone</p>

              <h3 className="text-lg font-medium">{user.phone || "N/A"}</h3>
            </div>

            {/* ADDRESS */}
            <div
              className="
                bg-[#F8F3EC]
                rounded-2xl
                p-5
              "
            >
              <p className="text-gray-500 text-sm mb-2">Address</p>

              {editMode ? (
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    p-4
                    rounded-2xl
                    outline-none
                    min-h-[120px]
                    resize-none
                  "
                />
              ) : (
                <h3
                  className="
                    text-lg
                    font-medium
                    break-words
                  "
                >
                  {user.address || "No Address Added"}
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* LOGOUT */}
        <div className="text-center">
          <button
            onClick={logout}
            className="
              bg-red-500
              hover:bg-red-600
              transition
              text-white
              px-8
              sm:px-10
              py-4
              rounded-2xl
              flex
              items-center
              justify-center
              gap-3
              mx-auto
              shadow-lg
              hover:scale-105
              duration-300
              w-full
              sm:w-auto
            "
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
