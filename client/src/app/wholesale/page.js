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
      <div className="h-screen flex flex-col items-center justify-center bg-[#F9F6F1]">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-700 tracking-wide animate-pulse">
          Loading Wholesale Experience...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F6F1] via-white to-[#F9F6F1] pt-16 sm:pt-20">
      {/* HERO SECTION */}
      <section
        className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden py-16 sm:py-24"
        style={{
          backgroundImage: `url(${data.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Responsive Readability Overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center justify-center w-full">
          <p className="text-[#D4AF37] uppercase tracking-[4px] sm:tracking-[8px] text-xs sm:text-sm mb-4 sm:mb-5 font-medium">
            Premium Wholesale Partner
          </p>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-light leading-[1.2] sm:leading-[1.15] tracking-tight max-w-4xl drop-shadow-sm">
            {data.heroTitle}
          </h1>

          <div className="w-20 sm:w-24 h-1 bg-[#D4AF37] mx-auto mt-5 sm:mt-6 rounded-full"></div>

          <p className="mt-5 sm:mt-6 text-gray-300 sm:text-gray-200 text-sm sm:text-lg leading-6 sm:leading-8 max-w-2xl mx-auto px-2">
            {data.heroSubtitle}
          </p>

          {/* Hero Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10 w-full sm:w-auto max-w-xs sm:max-w-none">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#D4AF37] text-black px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-[#c59b20] shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base">
                Request Catalogue
              </button>
            </Link>

            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto border border-white text-white px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base">
                Contact Team
              </button>
            </Link>
          </div>
        </div>

        {/* Floating Overlap Stats Badge Container */}
        {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 hidden lg:flex bg-white rounded-2xl shadow-xl px-10 py-6 gap-12 z-20 border border-[#D4AF37]/10">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#D4AF37]">500+</h3>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mt-0.5">
              Retail Partners
            </p>
          </div>
          <div className="w-px bg-gray-100 h-10 my-auto" />
          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#D4AF37]">50+</h3>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mt-0.5">
              Cities Served
            </p>
          </div>
          <div className="w-px bg-gray-100 h-10 my-auto" />
          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#D4AF37]">1L+</h3>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mt-0.5">
              Pieces Delivered
            </p>
          </div>
        </div> */}
      </section>

      {/* STATS SECTION */}
      <section className="pt-12 pb-8 sm:pt-20 sm:pb-14 bg-black text-white border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-center">
            {data.stats?.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/10 backdrop-blur-md hover:-translate-y-1 sm:hover:-translate-y-2 hover:border-[#D4AF37] transition-all duration-300 group"
              >
                <h3 className="text-xl sm:text-4xl font-semibold text-[#d4af37] transition-colors duration-300">
                  {item.value}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-200 mt-1 sm:mt-2 text-[11px] sm:text-base leading-tight sm:leading-5 transition-colors duration-300">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <p className="uppercase tracking-[3px] sm:tracking-[5px] text-[#b68d40] text-xs sm:text-sm mb-2 sm:mb-3 font-medium">
            Why Partner With Us
          </p>
          <h2 className="text-2xl sm:text-5xl font-light tracking-tight text-gray-900">
            Wholesale Benefits
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data.benefits?.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-white to-[#fffaf0] p-6 sm:p-10 rounded-xl lg:rounded-[32px] shadow-sm border border-[#D4AF37]/15 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <h3 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-4 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-6 sm:leading-7 text-xs sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-12 sm:py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="uppercase tracking-[3px] sm:tracking-[5px] text-[#b68d40] text-xs sm:text-sm mb-2 sm:mb-3 font-medium">
              Simple Process
            </p>
            <h2 className="text-2xl sm:text-5xl font-light tracking-tight text-gray-900">
              How It Works
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {data.processSteps?.map((step, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-white to-[#fffaf0] border border-[#D4AF37]/15 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-xl sm:rounded-[32px] p-6 sm:p-8 text-center flex flex-col items-center"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black text-white flex items-center justify-center mb-4 sm:mb-5 text-base sm:text-xl font-semibold shadow-md border border-[#D4AF37]/30 shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-6 sm:leading-7 text-xs sm:text-base font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#F9F6F1]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="uppercase tracking-[4px] sm:tracking-[5px] text-[#D4AF37] text-xs sm:text-sm mb-3 font-medium">
              Trusted Partner
            </p>
            <h2 className="text-2xl sm:text-5xl font-light tracking-tight text-gray-900">
              Why Retailers Choose Narayanam
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl sm:rounded-[32px] p-6 sm:p-10 border border-[#D4AF37]/15 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-[#D4AF37] transition-all duration-500">
              <h3 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900">
                Premium Quality
              </h3>
              <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
                Carefully crafted ethnic wear with premium fabrics.
              </p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-[32px] p-6 sm:p-10 border border-[#D4AF37]/15 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-[#D4AF37] transition-all duration-500">
              <h3 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900">
                Fast Delivery
              </h3>
              <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
                PAN India dispatch with reliable logistics support.
              </p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-[32px] p-6 sm:p-10 border border-[#D4AF37]/15 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-[#D4AF37] transition-all duration-500">
              <h3 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900">
                Low MOQ
              </h3>
              <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
                Business friendly minimum order quantities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 sm:py-24 text-center px-4 sm:px-6 bg-[#F9F6F1]">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-black via-[#1b1b1b] to-[#2d1b1b] rounded-xl sm:rounded-[48px] px-5 sm:px-16 py-10 sm:py-20 text-white shadow-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-xl sm:text-5xl font-light leading-snug sm:leading-tight tracking-tight relative z-10 px-2">
            {data.ctaTitle}
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#D4AF37] mx-auto mt-4 sm:mt-6 rounded-full relative z-10"></div>

          <p className="text-gray-300 mt-4 sm:mt-6 max-w-2xl mx-auto leading-6 sm:leading-7 text-xs sm:text-base relative z-10 px-2">
            Partner with Narayanam for premium ethnic wear collections,
            business-friendly MOQ and PAN India wholesale delivery.
          </p>

          <div className="mt-6 sm:mt-10 relative z-10 w-full sm:w-auto px-4 sm:px-0">
            <Link href="/contact" className="inline-block w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#c59b20] text-black px-10 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-[#D4AF37]/20">
                {data.ctaButtonText}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
