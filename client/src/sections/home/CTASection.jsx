"use client";

import { useEffect, useState } from "react";

import API from "../../lib/api";

export default function CTASection() {
  const [wholesaleData, setWholesaleData] =
    useState(null);

  useEffect(() => {
    fetchWholesaleData();
  }, []);

  const fetchWholesaleData =
    async () => {
      try {
        const res =
          await API.get(
            "/wholesale-settings"
          );

        setWholesaleData(
          res.data.data
        );
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
        py-12
        sm:py-16
        lg:py-20
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[260px]
          sm:w-[500px]
          h-[260px]
          sm:h-[500px]
          bg-[#D4AF37]/10
          blur-[100px]
          sm:blur-[140px]
          rounded-full
        "
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* SMALL TAG */}
        <p
          className="
            uppercase
            tracking-[3px]
            sm:tracking-[5px]
            text-[#D4AF37]
            text-[10px]
            sm:text-xs
            mb-3
          "
        >
          Wholesale Fashion Partner
        </p>

        {/* HEADING */}
        <h2
          className="
            text-2xl
            sm:text-4xl
            lg:text-5xl
            xl:text-6xl
            font-bold
            leading-tight
            max-w-5xl
            mx-auto
          "
        >
          {wholesaleData?.ctaTitle ||
            "Ready To Scale Your Fashion Business?"}
        </h2>

        {/* DESCRIPTION */}
        <p
          className="
            text-gray-300
            mt-4
            sm:mt-6
            max-w-2xl
            mx-auto
            text-xs
            sm:text-sm
            lg:text-base
            leading-6
            sm:leading-7
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
            gap-3
            sm:gap-4
            mt-8
            sm:mt-10
          "
        >
          {/* PRIMARY BUTTON */}
          <a
            href="/contact"
            className="w-full sm:w-auto"
          >
            <button
              className="
                w-full
                sm:w-auto
                bg-[#D4AF37]
                hover:bg-[#c39d24]
                transition
                duration-300
                text-black
                px-6
                sm:px-10
                py-3
                sm:py-4
                rounded-full
                font-semibold
                text-sm
                sm:text-base
                shadow-lg
              "
            >
              {wholesaleData?.ctaButtonText ||
                "Get Wholesale Pricing"}
            </button>
          </a>

          {/* SECONDARY BUTTON */}
          <a
            href="/products"
            className="w-full sm:w-auto"
          >
            <button
              className="
                w-full
                sm:w-auto
                border
                border-white/20
                hover:bg-white
                hover:text-black
                transition
                duration-300
                px-6
                sm:px-10
                py-3
                sm:py-4
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
            sm:gap-6
            mt-10
            sm:mt-14
            pt-8
            sm:pt-10
            border-t
            border-white/10
          "
        >
          {wholesaleData?.stats?.map(
            (item, index) => (
              <div
                key={index}
              >
                <h3 className="text-xl sm:text-3xl font-bold text-[#D4AF37]">
                  {item.value}
                </h3>

                <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
                  {item.label}
                </p>
              </div>
            )
          )}
        </div>

      </div>
    </section>
  );
}