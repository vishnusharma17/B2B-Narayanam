"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      const res = await API.post("/auth/register", form);

      localStorage.setItem("userToken", res.data.token);

      localStorage.setItem("userData", JSON.stringify(res.data.user));

      window.dispatchEvent(new Event("storage"));

      toast.success("Registration successful");

      router.push("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] flex justify-center items-center px-6">
      <div className="bg-white p-10 rounded-3xl w-full max-w-lg shadow-md">
        <h1 className="text-4xl text-center mb-8">Create Account</h1>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            placeholder="Full Name"
            className="w-full border p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            className="w-full border p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            placeholder="Phone"
            className="w-full border p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Address"
            className="w-full border p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border p-4 rounded-xl"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full border p-4 rounded-xl"
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button
              type="button"
              className="absolute right-4 top-4"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-xl">
            Register
          </button>
        </form>

        <p className="text-center mt-6">
          Already have account?{" "}
          <Link href="/login" className="text-[#D4AF37]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
