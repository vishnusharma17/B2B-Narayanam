"use client";
import {
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

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

  if (!footerData) {
  return (
    <div className="bg-red-500 text-white p-10">
      FOOTER DATA NOT FOUND
    </div>
  );
}

  return (
   <footer className="relative bg-black text-white overflow-hidden border-t border-white/10">

  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D4AF37]/10 blur-[180px] rounded-full pointer-events-none"></div>

      {/* TOP */}
      <div
        className="
        relative
        z-10
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
        <div className="bg-gradient-to-r from-[#D4AF37] via-[#f0d36f] to-[#D4AF37] rounded-[32px] p-8 sm:p-12 text-center text-black mb-12 relative z-10">

  <h2 className="text-3xl sm:text-5xl font-light">
   Partner With India's Premium Ethnic Wear Brand
  </h2>

  <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base">
   Expand your business with exclusive ethnic collections, attractive wholesale pricing and PAN India delivery support.
  </p>

  <Link href="/wholesale">
    <button className="mt-6 bg-black text-white px-8 py-4 rounded-full hover:bg-[#222] transition-all duration-300">
      Explore Wholesale
    </button>
  </Link>

</div>
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
            <div className="w-20 h-[2px] bg-[#D4AF37] mt-3 mb-5"></div>

<p className="text-gray-500 italic text-sm">
  Timeless Ethnic Elegance
</p>

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
            <div className="flex gap-4 mt-6">

  <a
    href="#"
    className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all duration-300"
  >
    <FaInstagram />
  </a>

  <a
    href="#"
    className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all duration-300"
  >
    <FaFacebookF />
  </a>

  <a
    href="#"
    className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all duration-300"
  >
    <FaYoutube />
  </a>

  <a
    href="#"
    className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all duration-300"
  >
    <FaWhatsapp />
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
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-md">
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
      </div>
    </footer>
  );
}