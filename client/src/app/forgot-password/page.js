"use client";

import { LockKeyhole, Mail } from "lucide-react";

import { useState } from "react";

import toast from "react-hot-toast";

import API from "../../lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/auth/forgot-password", { email });

      toast.success("Reset link sent to email");

      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#F8F3EC]
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-10
        overflow-hidden
      "
    >
      {/* CONTAINER */}
      <div
        className="
          relative
          w-full
          max-w-md
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[280px]
            h-[280px]
            sm:w-[420px]
            sm:h-[420px]
            bg-[#D4AF37]/10
            blur-[100px]
            rounded-full
          "
        />

        {/* CARD */}
        <form
          onSubmit={submit}
          className="
            relative
            z-10
            bg-white/90
            backdrop-blur-xl
            border
            border-white/40
            shadow-2xl
            rounded-[30px]
            sm:rounded-[40px]
            p-6
            sm:p-10
          "
        >
          {/* ICON */}
          <div className="flex justify-center mb-6">
            <div
              className="
                w-16
                h-16
                sm:w-20
                sm:h-20
                rounded-full
                bg-[#F8F3EC]
                flex
                items-center
                justify-center
                text-[#D4AF37]
                shadow-sm
              "
            >
              <LockKeyhole size={34} />
            </div>
          </div>

          {/* TEXT */}
          <div className="text-center mb-8">
            <p
              className="
                uppercase
                tracking-[4px]
                text-[#D4AF37]
                text-[11px]
                sm:text-xs
                mb-3
              "
            >
              Account Recovery
            </p>

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-light
                leading-tight
              "
            >
              Forgot Password
            </h1>

            <p
              className="
                text-gray-500
                mt-4
                text-sm
                sm:text-base
                leading-7
              "
            >
              Enter your registered email address and we’ll send you a password
              reset link.
            </p>
          </div>

          {/* INPUT */}
          <div className="mb-6">
            <label
              className="
                text-sm
                text-gray-600
                mb-3
                block
              "
            >
              Email Address
            </label>

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
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  border
                  border-gray-200
                  focus:border-black
                  outline-none
                  bg-white
                  pl-12
                  pr-4
                  py-4
                  rounded-2xl
                  text-sm
                  sm:text-base
                  transition-all
                "
                required
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="
              w-full
              bg-black
              hover:bg-[#222]
              disabled:opacity-70
              transition-all
              duration-300
              text-white
              py-4
              rounded-2xl
              text-sm
              sm:text-base
              font-medium
              shadow-lg
              hover:scale-[1.01]
            "
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* FOOTER */}
          <p
            className="
              text-center
              text-gray-500
              text-xs
              sm:text-sm
              mt-6
              leading-6
            "
          >
            Make sure the email address is linked with your account.
          </p>
        </form>
      </div>
    </div>
  );
}
