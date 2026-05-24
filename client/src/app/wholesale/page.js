"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import API from "../../lib/api";

export default function WholesalePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchWholesaleData();
  }, []);

  const fetchWholesaleData = async () => {
    try {
      const res = await API.get("/wholesale-settings");

      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-xl sm:text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F1] pt-20">
      {/* HERO */}
      <section
        className="
          relative
          min-h-[60vh]
          sm:min-h-[70vh]
          flex
          items-center
          justify-center
          overflow-hidden
        "
        style={{
          backgroundImage: `url(${data.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl">
          <p
            className="
              text-[#D4AF37]
              uppercase
              tracking-[3px]
              sm:tracking-[6px]
              text-[10px]
              sm:text-sm
              mb-4
              sm:mb-5
            "
          >
            Business Growth
          </p>

          <h1
            className="
              text-3xl
              sm:text-5xl
              lg:text-7xl
              font-light
              leading-tight
            "
          >
            {data.heroTitle}
          </h1>

          <p
            className="
              mt-5
              sm:mt-6
              text-gray-200
              text-sm
              sm:text-base
              leading-6
              sm:leading-7
              max-w-2xl
              mx-auto
              px-2
            "
          >
            {data.heroSubtitle}
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-8 sm:py-10 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            {data.stats?.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white/5
                  rounded-2xl
                  p-4
                  sm:p-6
                  border
                  border-white/10
                  backdrop-blur-sm
                "
              >
                <h3
                  className="
                    text-xl
                    sm:text-4xl
                    font-semibold
                    text-[#d4af37]
                  "
                >
                  {item.value}
                </h3>

                <p className="text-gray-300 mt-2 text-xs sm:text-base leading-5">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-14 sm:py-24 px-4 md:px-8 lg:px-10">
        <div className="text-center mb-10 sm:mb-14">
          <p
            className="
              uppercase
              tracking-[3px]
              sm:tracking-[5px]
              text-[#b68d40]
              text-xs
              sm:text-sm
              mb-3
            "
          >
            Why Partner With Us
          </p>

          <h2 className="text-2xl sm:text-5xl font-light">
            Wholesale Benefits
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data.benefits?.map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                p-5
                sm:p-8
                rounded-2xl
                sm:rounded-3xl
                shadow-sm
                hover:shadow-xl
                transition
                duration-300
              "
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                {item.title}
              </h2>

              <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14 sm:py-24 bg-white px-4 md:px-8 lg:px-10">
        <div className="text-center mb-10 sm:mb-14">
          <p
            className="
              uppercase
              tracking-[3px]
              sm:tracking-[5px]
              text-[#b68d40]
              text-xs
              sm:text-sm
              mb-3
            "
          >
            Simple Process
          </p>

          <h2 className="text-2xl sm:text-5xl font-light">How It Works</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.processSteps?.map((step, index) => (
            <div
              key={index}
              className="
                bg-[#F9F6F1]
                p-5
                sm:p-8
                rounded-2xl
                sm:rounded-3xl
                text-center
                relative
              "
            >
              <div
                className="
                  w-12
                  h-12
                  sm:w-14
                  sm:h-14
                  rounded-full
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-4
                  sm:mb-5
                  text-lg
                  sm:text-xl
                  font-semibold
                "
              >
                {index + 1}
              </div>

              <p className="text-gray-700 leading-6 sm:leading-7 text-sm sm:text-base">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-24 text-center px-4">
        <div
          className="
            max-w-5xl
            mx-auto
            bg-black
            rounded-[28px]
            sm:rounded-[40px]
            px-5
            sm:px-10
            py-10
            sm:py-14
            text-white
          "
        >
          <h2
            className="
              text-2xl
              sm:text-5xl
              font-light
              leading-tight
            "
          >
            {data.ctaTitle}
          </h2>

          <p className="text-gray-300 mt-4 sm:mt-5 max-w-2xl mx-auto leading-6 sm:leading-7 text-sm sm:text-base">
            Partner with Narayanam for premium ethnic wear collections,
            business-friendly MOQ and PAN India wholesale delivery.
          </p>

          <Link href="/contact">
            <button
              className="
                mt-7
                sm:mt-8
                bg-[#D4AF37]
                hover:bg-[#c59b20]
                transition
                text-black
                px-7
                sm:px-10
                py-3
                sm:py-4
                rounded-full
                font-semibold
                text-sm
                sm:text-base
                w-full
                sm:w-auto
              "
            >
              {data.ctaButtonText}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
