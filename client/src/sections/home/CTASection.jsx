"use client";

import { useEffect, useState } from "react";

import API from "../../lib/api";

export default function CTASection() {
  const [wholesaleData, setWholesaleData] = useState(null);

  useEffect(() => {
    fetchWholesaleData();
  }, []);

  const fetchWholesaleData = async () => {
    try {
      const res = await API.get("/wholesale-settings");

      setWholesaleData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-black
        text-white
        py-16
        sm:py-20
        lg:py-28
        px-4
        sm:px-6
        md:px-10
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[500px]
          bg-[#D4AF37]/10
          blur-[140px]
          rounded-full
        "
      />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* SMALL TAG */}
        <p
          className="
            uppercase
            tracking-[4px]
            sm:tracking-[6px]
            text-[#D4AF37]
            text-xs
            sm:text-sm
            mb-5
          "
        >
          Wholesale Fashion Partner
        </p>

        {/* HEADING */}
        <h2
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-bold
            leading-tight
          "
        >
          {wholesaleData?.ctaTitle ||
            "Ready To Scale Your Fashion Business?"}
        </h2>

        {/* DESCRIPTION */}
        <p
          className="
            text-gray-300
            mt-6
            max-w-2xl
            mx-auto
            text-sm
            sm:text-base
            leading-7
            px-2
          "
        >
          {wholesaleData?.heroSubtitle ||
            "Partner with Narayanam Sons for premium ethnic collections, fast delivery, low MOQ and exclusive wholesale pricing trusted by boutiques and retailers across India."}
        </p>

        {/* BUTTONS */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            justify-center
            items-center
            gap-4
            mt-10
          "
        >
          {/* PRIMARY BUTTON */}
          <a href="/contact">
            <button
              className="
                bg-[#D4AF37]
                hover:bg-[#c39d24]
                transition
                duration-300
                text-black
                px-8
                sm:px-10
                py-4
                rounded-full
                font-semibold
                text-sm
                sm:text-base
                shadow-lg
                hover:scale-105
              "
            >
              {wholesaleData?.ctaButtonText ||
                "Get Wholesale Pricing"}
            </button>
          </a>

          {/* SECONDARY BUTTON */}
          <a href="/products">
            <button
              className="
                border
                border-white/20
                hover:bg-white
                hover:text-black
                transition
                duration-300
                px-8
                sm:px-10
                py-4
                rounded-full
                text-sm
                sm:text-base
              "
            >
              Explore Collection
            </button>
          </a>
        </div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-4
            gap-5
            mt-14
            pt-10
            border-t
            border-white/10
          "
        >
          {wholesaleData?.stats?.map((item, index) => (
            <div key={index}>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                {item.value}
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}