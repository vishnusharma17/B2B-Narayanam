"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Collection",
      path: "/products",
    },
    {
      name: "Wholesale",
      path: "/wholesale",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Wishlist",
      path: "/wishlist",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-[#D4AF37]/20 backdrop-blur-lg">

      <div className="max-w-7xl mx-auto px-6">

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between h-[90px]">

          {/* Left Links */}
          <div className="flex gap-6 uppercase tracking-[2px] text-sm">
            {links
              .slice(0, 3)
              .map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="hover:text-[#D4AF37] transition"
                >
                  {link.name}
                </Link>
              ))}
          </div>

          {/* Center Logo */}
          <Link href="/">
            <div className="text-center">
              <h1 className="text-3xl tracking-[8px] font-light text-[#D4AF37]">
                NARAYANAM
              </h1>

              <p className="text-[10px] tracking-[4px] text-gray-400 uppercase mt-1">
                Luxury Ethnic House
              </p>
            </div>
          </Link>

          {/* Right Links */}
          <div className="flex gap-6 uppercase tracking-[2px] text-sm">
            {links
              .slice(3)
              .map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="hover:text-[#D4AF37] transition"
                >
                  {link.name}
                </Link>
              ))}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between h-[75px]">

          <Link href="/">
            <h1 className="text-2xl tracking-[5px] font-light text-[#D4AF37]">
              NARAYANAM
            </h1>
          </Link>

          <button
            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }
            className="text-2xl"
          >
            {menuOpen
              ? "✕"
              : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center gap-5 pb-6 uppercase tracking-[3px] text-sm">
            {links.map(
              (link) => (
                <Link
                  key={
                    link.name
                  }
                  href={
                    link.path
                  }
                  onClick={() =>
                    setMenuOpen(
                      false
                    )
                  }
                  className="hover:text-[#D4AF37]"
                >
                  {
                    link.name
                  }
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}