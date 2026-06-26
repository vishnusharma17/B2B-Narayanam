"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import API from "../../lib/api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.token;

      localStorage.setItem("adminToken", token);

      alert("Login Successful");

      router.push("/admin");
    } catch (error) {
      console.log(error);

      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center px-6">
      <div className="grid md:grid-cols-2 bg-white rounded-[40px] shadow-xl overflow-hidden max-w-5xl w-full">
        {/* Left Luxury Side */}
        <div className="bg-black text-white p-12 flex flex-col justify-center">
          <p className="text-[#C9A227] uppercase tracking-[6px] text-sm">
            Narayanam
          </p>

          <h1 className="text-5xl font-light mt-5 leading-tight">
            Admin Portal
          </h1>

          <div className="w-20 h-[2px] bg-[#C9A227] mt-6"></div>

          <p className="mt-8 text-gray-300 leading-8">
            Manage products, orders, customers, reviews and grow your luxury
            fashion business from one place.
          </p>
        </div>

        {/* Right Form */}
        <div className="p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-light mb-8">Login</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Admin Email"
              className="w-full border p-4 rounded-xl"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-4 rounded-xl"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />

            <button
              className="w-full bg-black hover:bg-[#7A1E1E] text-white py-4 rounded-full transition"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => router.push("/admin/forgot-password")}
                className="
      text-sm
      text-[#7A1E1E]
      hover:text-[#C9A227]
      transition
      underline
    "
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
