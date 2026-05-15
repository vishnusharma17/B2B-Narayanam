"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function Footer() {
  const [footerData, setFooterData] =
    useState(null);

  const [email, setEmail] =
    useState("");

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

      try {
        const res =
          await API.post(
            "/newsletter",
            {
              email
            }
          );

        alert(
          res.data.message ||
            "Subscribed successfully"
        );

        setEmail("");
      } catch (error) {
        console.log(error);
      }
    };

  if (!footerData) return null;

  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-10">
      <div className="grid md:grid-cols-4 gap-10 border-b border-gray-800 pb-14">

        {/* Brand */}
        <div>
          <h2 className="text-3xl tracking-[8px] text-[#D4AF37] mb-5">
            NARAYANAM
          </h2>

          <p className="text-gray-400 leading-7">
            Premium ethnic wear
            manufacturer for
            boutiques,
            wholesalers and
            retailers.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl mb-5 font-semibold">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">
            <Link href="/">
              Home
            </Link>
            <Link href="/products">
              Collection
            </Link>
            <Link href="/wishlist">
              Wishlist
            </Link>
            <Link href="/wholesale">
              Wholesale
            </Link>
            <Link href="/contact">
              Contact
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl mb-5 font-semibold">
            Contact
          </h3>

          <div className="space-y-3 text-gray-400">
            <p>
              {
                footerData.address
              }
            </p>

            <p>
              {
                footerData.phone
              }
            </p>

            <p>
              {
                footerData.email
              }
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl mb-5 font-semibold">
            Newsletter
          </h3>

          <p className="text-gray-400 mb-4">
            Get latest product
            launches &
            wholesale offers.
          </p>

          <form
            onSubmit={
              handleSubscribe
            }
          >
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-3 rounded-lg text-black mb-3"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            <button className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="pt-8 text-center text-gray-500 text-sm">
        {
          footerData.copyrightText
        }
      </div>
    </footer>
  );
}