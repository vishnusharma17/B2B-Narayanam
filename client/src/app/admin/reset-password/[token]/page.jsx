"use client";

import { Eye, EyeOff } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../../../lib/api";

export default function AdminResetPasswordPage() {
  const params = useParams();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleReset = async (e) => {
    e.preventDefault();

    if (!form.password || !form.confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await API.post(`/auth/reset-password/${params.token}`, form);

      toast.success("Admin password reset successfully");

      setTimeout(() => {
        router.push("/admin/login");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] flex justify-center items-center px-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-light">
            Admin Reset Password
          </h1>

          <p className="text-gray-500 mt-3">
            Create your new admin password
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl p-4 pr-12 outline-none focus:border-black"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl p-4 pr-12 outline-none focus:border-black"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-4"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-[#7A1E1E] text-white py-4 rounded-xl transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

      </div>
    </div>
  );
}