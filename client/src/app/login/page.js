"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("userToken", res.data.token);

      localStorage.setItem("userData", JSON.stringify(res.data.user));

      // navbar refresh
      window.dispatchEvent(new Event("storage"));

      toast.success("Login successful");

      router.push("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] flex justify-center items-center px-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light">Welcome Back</h1>

          <p className="text-gray-500 mt-2">Login to continue shopping</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full border p-4 rounded-xl outline-none"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full border p-4 rounded-xl outline-none"
            />

            <button
              type="button"
              className="absolute right-4 top-4 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-[#D4AF37] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl hover:bg-[#D4AF37] hover:text-black transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link href="/register" className="text-[#D4AF37] font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
