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

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", form);

      localStorage.setItem("userToken", res.data.token);

      localStorage.setItem("userData", JSON.stringify(res.data.user));

      window.dispatchEvent(new Event("storage"));

      toast.success("Registration successful");

      router.push("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
          max-w-xl
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
            w-[320px]
            h-[320px]
            sm:w-[520px]
            sm:h-[520px]
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
          {/* HEADER */}
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
                <User size={34} />
              </div>
            </div>

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
              Premium Fashion Access
            </p>

            <h1
              className="
                text-3xl
                sm:text-5xl
                font-light
                leading-tight
              "
            >
              Create Account
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
              Join Narayanam and explore premium ethnic collections.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleRegister}
            className="
              px-6
              sm:px-10
              py-8
              sm:py-10
              space-y-5
            "
          >
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
                placeholder="Full Name"
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
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
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
                placeholder="Email Address"
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
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
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
                placeholder="Phone Number"
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
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />
            </div>

            {/* ADDRESS */}
            <div className="relative">
              <MapPin
                size={18}
                className="
                  absolute
                  left-4
                  top-5
                  text-gray-400
                "
              />

              <textarea
                placeholder="Address"
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
                  resize-none
                  min-h-[120px]
                "
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
              />
            </div>

            {/* PASSWORD */}
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
                placeholder="Password"
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
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
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

            {/* CONFIRM PASSWORD */}
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
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
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
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmPassword: e.target.value,
                  })
                }
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* BUTTON */}
            <button
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
                hover:scale-[1.01]
              "
            >
              {loading ? "Creating Account..." : "Register"}
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
            <p
              className="
                text-gray-600
                text-sm
                sm:text-base
              "
            >
              Already have account?{" "}
              <Link
                href="/login"
                className="
                  text-[#D4AF37]
                  font-medium
                  hover:underline
                "
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
