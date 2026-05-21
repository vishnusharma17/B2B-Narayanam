"use client";

import Link from "next/link";

import {
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../lib/api";

export default function Footer() {
  const [footerData, setFooterData] =
    useState(null);

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter =
    async () => {
      try {
        const res =
          await API.get(
            "/footer-settings"
          );

        setFooterData(
          res.data.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleSubscribe =
    async (e) => {
      e.preventDefault();

      if (!email) {
        return toast.error(
          "Please enter email"
        );
      }

      try {
        setLoading(true);

        const res =
          await API.post(
            "/newsletter",
            {
              email,
            }
          );

        toast.success(
          res.data.message ||
            "Subscribed successfully"
        );

        setEmail("");
      } catch (error) {
        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Subscription failed"
        );
      } finally {
        setLoading(false);
      }
    };

  if (!footerData) return null;

  return (
    <footer className="bg-black text-white overflow-hidden">
      
      {/* TOP */}
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          md:px-10
          pt-16
          sm:pt-20
          pb-12
        "
      >
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10
            lg:gap-12
            border-b
            border-white/10
            pb-12
          "
        >
          {/* BRAND */}
          <div>
            <h2
              className="
                text-3xl
                sm:text-4xl
                tracking-[6px]
                text-[#D4AF37]
                font-semibold
                mb-5
              "
            >
              NARAYANAM
            </h2>

            <p
              className="
                text-gray-400
                leading-7
                text-sm
                sm:text-base
              "
            >
              Premium ethnic wear
              manufacturer trusted by
              boutiques, wholesalers
              and fashion retailers
              across India.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-6">
              
              {/* INSTAGRAM */}
              <a
                href="#"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white/10
                  hover:bg-[#D4AF37]
                  hover:text-black
                  transition
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-bold
                "
              >
                IG
              </a>

              {/* FACEBOOK */}
              <a
                href="#"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white/10
                  hover:bg-[#D4AF37]
                  hover:text-black
                  transition
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-bold
                "
              >
                FB
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3
              className="
                text-xl
                font-semibold
                mb-6
              "
            >
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 text-gray-400">
              
              <Link
                href="/"
                className="hover:text-[#D4AF37] transition"
              >
                Home
              </Link>

              <Link
                href="/products"
                className="hover:text-[#D4AF37] transition"
              >
                Collection
              </Link>

              <Link
                href="/wishlist"
                className="hover:text-[#D4AF37] transition"
              >
                Wishlist
              </Link>

              <Link
                href="/cart"
                className="hover:text-[#D4AF37] transition"
              >
                Cart
              </Link>

              <Link
                href="/contact"
                className="hover:text-[#D4AF37] transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3
              className="
                text-xl
                font-semibold
                mb-6
              "
            >
              Contact Info
            </h3>

            <div className="space-y-5 text-gray-400">
              
              <div className="flex gap-3 items-start">
                <MapPin
                  size={18}
                  className="mt-1 text-[#D4AF37]"
                />

                <p className="leading-7 text-sm sm:text-base">
                  {footerData.address}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <Phone
                  size={18}
                  className="text-[#D4AF37]"
                />

                <p className="text-sm sm:text-base">
                  {footerData.phone}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <Mail
                  size={18}
                  className="text-[#D4AF37]"
                />

                <p className="text-sm sm:text-base break-all">
                  {footerData.email}
                </p>
              </div>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3
              className="
                text-xl
                font-semibold
                mb-6
              "
            >
              Newsletter
            </h3>

            <p
              className="
                text-gray-400
                mb-5
                leading-7
                text-sm
                sm:text-base
              "
            >
              Get latest product
              launches, wholesale
              offers and trending
              fashion updates.
            </p>

            <form
              onSubmit={
                handleSubscribe
              }
              className="space-y-4"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  h-12
                  rounded-xl
                  px-4
                  text-black
                  outline-none
                  border-2
                  border-transparent
                  focus:border-[#D4AF37]
                "
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

              <button
                disabled={loading}
                className="
                  w-full
                  bg-[#D4AF37]
                  hover:bg-[#c89d1e]
                  transition
                  duration-300
                  text-black
                  py-3
                  rounded-xl
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  disabled:opacity-60
                "
              >
                <Send size={16} />

                {loading
                  ? "Subscribing..."
                  : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
            pt-8
          "
        >
          <p
            className="
              text-gray-500
              text-sm
              text-center
              md:text-left
            "
          >
            {footerData.copyrightText}
          </p>

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-5
              text-sm
              text-gray-500
            "
          >
            <Link
              href="/privacy-policy"
              className="hover:text-[#D4AF37] transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-[#D4AF37] transition"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/shipping-policy"
              className="hover:text-[#D4AF37] transition"
            >
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}