"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../lib/api";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribeNewsletter = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Enter email");
    }

    try {
      setLoading(true);

      await API.post("/newsletter", {
        email,
      });

      toast.success("Subscribed successfully");

      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Subscription failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 md:px-10 bg-[#F8F3EC]">
      <div className="max-w-5xl mx-auto bg-black text-white rounded-3xl p-10 md:p-16 text-center">
        <Mail
          size={50}
          className="mx-auto mb-6 text-[#D4AF37]"
        />

        <p className="text-[#D4AF37] tracking-[5px] uppercase text-sm mb-3">
          Stay Updated
        </p>

        <h2 className="text-4xl md:text-5xl font-bold">
          Join Our Newsletter
        </h2>

        <p className="text-gray-300 mt-4 mb-8">
          Get exclusive offers, festive discounts and latest arrivals.
        </p>

        <form
          onSubmit={subscribeNewsletter}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-4 rounded-full text-black w-full md:w-[400px]"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-semibold"
          >
            {loading
              ? "Subscribing..."
              : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
