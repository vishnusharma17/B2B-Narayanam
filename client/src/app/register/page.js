"use client";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState } from "react";

import toast from "react-hot-toast";

import API from "../../lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  // =========================
  // REGISTER USER
  // =========================

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.city ||
      !formData.password
    ) {
      toast.error("Please fill all fields");

      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", formData);

      toast.success(res.data.message || "Registration successful");

      router.push("/login");
    } catch (error) {
      console.log("REGISTER ERROR:", error);

      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        min-h-screen
        bg-[#F8F3EC]
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-28
      "
    >
      <div
        className="
          w-full
          max-w-6xl
          bg-white
          rounded-[28px]
          sm:rounded-[36px]
          overflow-hidden
          shadow-2xl
          grid
          lg:grid-cols-2
        "
      >
        {/* =========================
            LEFT SIDE
        ========================= */}

        <div
          className="
            hidden
            lg:flex
            relative
            bg-black
            text-white
            p-12
            xl:p-16
            flex-col
            justify-between
            overflow-hidden
          "
        >
          {/* DECORATION */}

          <div
            className="
              absolute
              -top-28
              -right-28
              w-80
              h-80
              rounded-full
              border
              border-[#D4AF37]/30
            "
          />

          <div
            className="
              absolute
              -bottom-36
              -left-36
              w-96
              h-96
              rounded-full
              bg-[#D4AF37]/10
            "
          />

          {/* BRAND */}

          <div className="relative z-10">
            <p
              className="
                text-[#D4AF37]
                uppercase
                tracking-[6px]
                text-xs
              "
            >
              Narayanam
            </p>

            <h1
              className="
                text-5xl
                xl:text-6xl
                font-light
                leading-tight
                mt-6
              "
            >
              Join Our
              <br />
              Fashion
              <br />
              Community
            </h1>

            <p
              className="
                text-gray-400
                leading-8
                mt-8
                max-w-md
              "
            >
              Create your Narayanam account to explore premium ethnic
              collections, manage orders and enjoy a seamless shopping
              experience.
            </p>
          </div>

          {/* FEATURES */}

          <div
            className="
              relative
              z-10
              grid
              grid-cols-2
              gap-5
              mt-14
            "
          >
            <div
              className="
                border
                border-white/10
                bg-white/5
                rounded-2xl
                p-5
              "
            >
              <p
                className="
                  text-[#D4AF37]
                  text-2xl
                  font-semibold
                "
              >
                500+
              </p>

              <p
                className="
                  text-gray-400
                  text-sm
                  mt-2
                "
              >
                Premium Designs
              </p>
            </div>

            <div
              className="
                border
                border-white/10
                bg-white/5
                rounded-2xl
                p-5
              "
            >
              <p
                className="
                  text-[#D4AF37]
                  text-2xl
                  font-semibold
                "
              >
                100%
              </p>

              <p
                className="
                  text-gray-400
                  text-sm
                  mt-2
                "
              >
                Secure Shopping
              </p>
            </div>
          </div>
        </div>

        {/* =========================
            REGISTER FORM
        ========================= */}

        <div
          className="
            p-6
            sm:p-10
            lg:p-12
            xl:p-16
          "
        >
          {/* MOBILE BRAND */}

          <div
            className="
              lg:hidden
              text-center
              mb-8
            "
          >
            <p
              className="
                text-[#B68D40]
                uppercase
                tracking-[5px]
                text-xs
              "
            >
              Narayanam
            </p>
          </div>

          {/* HEADING */}

          <div className="mb-8">
            <p
              className="
                uppercase
                tracking-[4px]
                text-[#B68D40]
                text-[11px]
                mb-3
              "
            >
              Create Account
            </p>

            <h2
              className="
                text-3xl
                sm:text-4xl
                font-light
                text-black
              "
            >
              Register
            </h2>

            <p
              className="
                text-gray-500
                mt-3
                text-sm
                sm:text-base
              "
            >
              Enter your details to create a new account.
            </p>
          </div>

          {/* FORM */}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* NAME */}

            <div>
              <label
                htmlFor="name"
                className="
                  block
                  text-sm
                  font-medium
                  mb-2
                "
              >
                Full Name
              </label>

              <div className="relative">
                <User
                  size={19}
                  aria-hidden="true"
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-2xl
                    py-4
                    pl-12
                    pr-4
                    outline-none
                    focus:border-black
                    transition
                  "
                />
              </div>
            </div>

            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="
                  block
                  text-sm
                  font-medium
                  mb-2
                "
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  aria-hidden="true"
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-2xl
                    py-4
                    pl-12
                    pr-4
                    outline-none
                    focus:border-black
                    transition
                  "
                />
              </div>
            </div>

            {/* PHONE */}

            <div>
              <label
                htmlFor="phone"
                className="
                  block
                  text-sm
                  font-medium
                  mb-2
                "
              >
                Mobile Number
              </label>

              <div className="relative">
                <Phone
                  size={19}
                  aria-hidden="true"
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  autoComplete="tel"
                  required
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-2xl
                    py-4
                    pl-12
                    pr-4
                    outline-none
                    focus:border-black
                    transition
                  "
                />
              </div>
            </div>

            {/* CITY */}

            <div>
              <label
                htmlFor="city"
                className="
                  block
                  text-sm
                  font-medium
                  mb-2
                "
              >
                City
              </label>

              <div className="relative">
                <MapPin
                  size={19}
                  aria-hidden="true"
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  autoComplete="address-level2"
                  required
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-2xl
                    py-4
                    pl-12
                    pr-4
                    outline-none
                    focus:border-black
                    transition
                  "
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label
                htmlFor="password"
                className="
                  block
                  text-sm
                  font-medium
                  mb-2
                "
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  aria-hidden="true"
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  autoComplete="new-password"
                  required
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-2xl
                    py-4
                    pl-12
                    pr-14
                    outline-none
                    focus:border-black
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                >
                  {showPassword ? (
                    <EyeOff size={20} aria-hidden="true" />
                  ) : (
                    <Eye size={20} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full
                py-4
                rounded-full
                font-semibold
                transition-all
                duration-300
                ${
                  loading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-[#D4AF37] hover:text-black"
                }
              `}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* LOGIN */}

          <p
            className="
              text-center
              text-gray-500
              mt-8
              text-sm
            "
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="
                text-black
                font-semibold
                hover:text-[#B68D40]
                transition
              "
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
