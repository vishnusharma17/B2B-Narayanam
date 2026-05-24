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
    <footer className="bg-black text-white overflow-hidden border-t border-white/10">

      {/* TOP */}
      <div
        className="
          max-w-[1600px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          pt-12
          sm:pt-16
          lg:pt-20
          pb-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-8
            sm:gap-10
            lg:gap-12
            border-b
            border-white/10
            pb-10
          "
        >

          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">

            <h2
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                tracking-[3px]
                sm:tracking-[5px]
                text-[#D4AF37]
                font-semibold
                mb-4
              "
            >
              NARAYANAM
            </h2>

            <p
              className="
                text-gray-400
                leading-6
                sm:leading-7
                text-sm
                max-w-sm
              "
            >
              Premium ethnic wear
              manufacturer trusted by
              boutiques, wholesalers
              and fashion retailers
              across India.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-6">

              <a
                href="#"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white/10
                  hover:bg-[#D4AF37]
                  hover:text-black
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-semibold
                "
              >
                IG
              </a>

              <a
                href="#"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white/10
                  hover:bg-[#D4AF37]
                  hover:text-black
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-semibold
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
                text-lg
                sm:text-xl
                font-semibold
                mb-5
              "
            >
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400 text-sm">

              <Link
                href="/"
                className="hover:text-[#D4AF37] transition-all duration-300"
              >
                Home
              </Link>

              <Link
                href="/products"
                className="hover:text-[#D4AF37] transition-all duration-300"
              >
                Collection
              </Link>

              <Link
                href="/wishlist"
                className="hover:text-[#D4AF37] transition-all duration-300"
              >
                Wishlist
              </Link>

              <Link
                href="/cart"
                className="hover:text-[#D4AF37] transition-all duration-300"
              >
                Cart
              </Link>

              <Link
                href="/contact"
                className="hover:text-[#D4AF37] transition-all duration-300"
              >
                Contact
              </Link>

            </div>
          </div>

          {/* CONTACT */}
          <div>

            <h3
              className="
                text-lg
                sm:text-xl
                font-semibold
                mb-5
              "
            >
              Contact Info
            </h3>

            <div className="space-y-4 text-gray-400">

              <div className="flex gap-3 items-start">
                <MapPin
                  size={17}
                  className="mt-1 text-[#D4AF37] shrink-0"
                />

                <p className="leading-6 text-sm">
                  {footerData.address}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <Phone
                  size={17}
                  className="text-[#D4AF37] shrink-0"
                />

                <p className="text-sm break-all">
                  {footerData.phone}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <Mail
                  size={17}
                  className="text-[#D4AF37] shrink-0"
                />

                <p className="text-sm break-all">
                  {footerData.email}
                </p>
              </div>

            </div>
          </div>

          {/* NEWSLETTER */}
          <div>

            <h3
              className="
                text-lg
                sm:text-xl
                font-semibold
                mb-5
              "
            >
              Newsletter
            </h3>

            <p
              className="
                text-gray-400
                mb-5
                leading-6
                text-sm
              "
            >
              Get latest product
              launches, wholesale
              offers and fashion
              updates.
            </p>

            <form
              onSubmit={
                handleSubscribe
              }
              className="space-y-3"
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
                  text-sm
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
                  transition-all
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
                  text-sm
                "
              >
                <Send size={15} />

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
            lg:flex-row
            justify-between
            items-center
            gap-4
            pt-6
          "
        >

          <p
            className="
              text-gray-500
              text-xs
              sm:text-sm
              text-center
              lg:text-left
            "
          >
            {footerData.copyrightText}
          </p>

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-4
              sm:gap-5
              text-xs
              sm:text-sm
              text-gray-500
            "
          >

            <Link
              href="/privacy-policy"
              className="hover:text-[#D4AF37] transition-all duration-300"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-[#D4AF37] transition-all duration-300"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/shipping-policy"
              className="hover:text-[#D4AF37] transition-all duration-300"
            >
              Shipping Policy
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
}