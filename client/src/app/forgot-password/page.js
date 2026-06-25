"use client";

import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../lib/api";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email address");
    }

    try {
      setLoading(true);

      // Naye interceptor logic ke hisab se Authorization ko false set kar rahe hain
      // Isse interceptor is request me token add nahi karega
      await API.post(
        "/auth/forgot-password",
        { email },
        {
          headers: {
            Authorization: false,
          },
        },
      );

      toast.success("Reset link sent successfully to your email!");
      setEmail("");

      // 2 second baad automatic user ko login page par redirect karega
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      // DEBUGGING: Ab console me exact error detail milegi aur undefined nahi aayega
      console.error("Forgot Password Raw Error:", error);
      console.error("Forgot Password Response Data:", error.response?.data);

      let errorMessage = "Something went wrong. Please try again.";

      // 1. Agar backend se error data response aaya ho (Jaise User Not Found, 400, 500)
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }
      // 2. Agar Render server band hai ya Network issue/CORS block hai (error.response missing ho)
      else if (error.message) {
        errorMessage = `${error.message}. Please check if backend server is awake.`;
      }

      toast.error(errorMessage);
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
      <div className="relative w-full max-w-md">
        {/* GLOW EFFECT */}
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

        {/* CARD FORM */}
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

          {/* TEXT HEADER */}
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

            <h1 className="text-3xl sm:text-4xl font-light leading-tight">
              Forgot Password
            </h1>

            <p className="text-gray-500 mt-4 text-sm sm:text-base leading-7">
              Enter your registered email address and we’ll send you a password
              reset link.
            </p>
          </div>

          {/* INPUT FIELD */}
          <div className="mb-6">
            <label className="text-sm text-gray-600 mb-3 block">
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
                name="email"
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

          {/* SUBMIT BUTTON */}
          <button
            disabled={loading}
            type="submit"
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
              flex
              justify-center
              items-center
            "
          >
            {loading ? "Sending Reset Link..." : "Send Reset Link"}
          </button>

          {/* BACK TO LOGIN LINK */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="
                inline-flex 
                items-center 
                gap-2 
                text-sm 
                text-gray-600 
                hover:text-black 
                transition-colors
              "
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
