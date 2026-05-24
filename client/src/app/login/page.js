"use client";

import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

import { GoogleLogin } from "@react-oauth/google";

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

  // =========================
  // LOGIN
  // =========================

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

      // NAVBAR REFRESH
      window.dispatchEvent(new Event("storage"));

      toast.success("Login successful");

      router.push("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================

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
      "
    >
      {/* MAIN CONTAINER */}
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
            w-[300px]
            h-[300px]
            sm:w-[420px]
            sm:h-[420px]
            bg-[#D4AF37]/10
            blur-[120px]
            rounded-full
          "
        />

        {/* CARD */}
        <div
          className="
            relative
            z-10
            bg-white/90
            backdrop-blur-xl
            border
            border-white/40
            rounded-[30px]
            sm:rounded-[40px]
            shadow-2xl
            overflow-hidden
          "
        >
          {/* TOP */}
          <div
            className="
              px-6
              sm:px-10
              pt-8
              sm:pt-10
              text-center
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

            {/* SMALL TAG */}
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
              Welcome Back
            </p>

            {/* TITLE */}
            <h1
              className="
                text-3xl
                sm:text-5xl
                font-light
                leading-tight
              "
            >
              Login Account
            </h1>

            {/* SUBTITLE */}
            <p
              className="
                text-gray-500
                mt-4
                text-sm
                sm:text-base
                leading-7
              "
            >
              Login to continue shopping premium fashion collections.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="
              px-6
              sm:px-10
              py-8
              sm:py-10
              space-y-5
            "
          >
            {/* EMAIL */}
            <div>
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
                  placeholder="Enter Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
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
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label
                className="
                  text-sm
                  text-gray-600
                  mb-3
                  block
                "
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    focus:border-black
                    outline-none
                    bg-white
                    pl-12
                    pr-12
                    py-4
                    rounded-2xl
                    text-sm
                    sm:text-base
                    transition-all
                  "
                />

                <button
                  type="button"
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-black
                    transition
                  "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="
                  text-sm
                  text-[#D4AF37]
                  hover:underline
                "
              >
                Forgot Password?
              </Link>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-black
                hover:bg-[#D4AF37]
                hover:text-black
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
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* FOOTER */}
          <div
            className="
              border-t
              border-gray-100
              px-6
              sm:px-10
              py-6
              text-center
              bg-[#fafafa]
            "
          >
            {/* GOOGLE LOGIN */}
            <div className="mb-5 flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await API.post("/auth/google-login", {
                      credential: credentialResponse.credential,
                    });

                    localStorage.setItem("userToken", res.data.token);

                    localStorage.setItem(
                      "userData",
                      JSON.stringify(res.data.user),
                    );

                    window.dispatchEvent(new Event("storage"));

                    toast.success("Google Login Successful");

                    router.push("/profile");
                  } catch (error) {
                    console.log(error);

                    toast.error("Google login failed");
                  }
                }}
                onError={() => {
                  toast.error("Google Login Failed");
                }}
              />
            </div>

            {/* REGISTER */}
            <p
              className="
                text-gray-600
                text-sm
                sm:text-base
              "
            >
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="
                  text-[#D4AF37]
                  font-medium
                  hover:underline
                "
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
