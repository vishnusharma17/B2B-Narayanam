"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/forgot-password", { email });

      toast.success("Reset link sent to email");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F8F3EC]">
      <form
        onSubmit={submit}
        className="bg-white p-10 rounded-3xl w-full max-w-md"
      >
        <h1 className="text-3xl mb-6">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full border p-4 rounded-xl mb-5"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-black text-white py-3 rounded-xl">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
