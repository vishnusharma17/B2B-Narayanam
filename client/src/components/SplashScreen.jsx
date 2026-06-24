"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);

  // Trigger smooth entry transitions on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#FDFBF7] overflow-hidden select-none">
      
      {/* LUXURY AMBIENT GOLD GLOWS */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[130px] rounded-full pointer-events-none dynamic-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#B68D40]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* CONTENT CONTAINER */}
      <div 
        className={`text-center z-10 px-6 transition-all duration-1000 ease-out transform ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* BRAND LOGO */}
        <div className="mb-10 relative group">
          <div className="absolute inset-0 bg-[#D4AF37]/20 blur-md rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <img
            src="/logo.png"
            alt="Narayanam"
            className="w-24 sm:w-32 mx-auto object-contain relative animate-[pulse_3s_ease-in-out_infinite]"
          />
        </div>

        {/* BRAND TITLE */}
        <h1 className="text-3xl sm:text-4xl font-extralight tracking-[0.4em] text-neutral-800 uppercase bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-600">
          Narayanam
        </h1>

        {/* SUBTITLE */}
        <p className="mt-3 text-[#B68D40] tracking-[0.3em] uppercase text-[10px] sm:text-xs font-medium">
          Premium Ethnic Collection
        </p>

        {/* ELEGANT LINE LOADER */}
        <div className="mt-12 w-48 mx-auto relative">
          <div className="h-[1px] w-full bg-[#E8DFCF] relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-premium-slide" />
          </div>
        </div>

        {/* STATUS TEXT */}
        <p className="mt-4 text-neutral-400 text-xs tracking-widest uppercase font-light animate-pulse">
          Preparing your experience
        </p>
      </div>

      {/* REQUIRED CUSTOM ANIMATIONS */}
      <style jsx global>{`
        @keyframes premium-slide {
          0% { transform: translateX(-150%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(250%); }
        }
        .animate-premium-slide {
          animation: premium-slide 2.2s cubic-bezier(0.65, 0.05, 0.36, 1) infinite;
        }
      `}</style>
    </div>
  );
}