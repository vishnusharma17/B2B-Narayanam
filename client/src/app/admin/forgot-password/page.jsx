"use client";

import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../../lib/api";

export default function AdminForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/auth/forgot-password", {
        email,
        isAdmin: true,
      });

      toast.success("Reset link sent to your email");

      setTimeout(() => {
        router.push("/admin/login");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center px-6">
      <div className="bg-white max-w-md w-full rounded-3xl p-10 shadow-xl">

        <div className="text-center mb-8">
          <LockKeyhole size={45} className="mx-auto text-[#7A1E1E]" />

          <h1 className="text-3xl font-light mt-5">
            Admin Forgot Password
          </h1>

          <p className="text-gray-500 mt-3">
            Enter your admin email.
          </p>
        </div>

        <form onSubmit={submit}>

          <div className="relative">

            <Mail
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type="email"
              placeholder="Admin Email"
              className="w-full border pl-12 p-4 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <button
            className="w-full mt-6 bg-black text-white py-4 rounded-xl"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <Link
          href="/admin/login"
          className="flex justify-center mt-6 text-sm"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Login
        </Link>

      </div>
    </div>
  );
}