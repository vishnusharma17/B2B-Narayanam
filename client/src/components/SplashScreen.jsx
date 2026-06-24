"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-cream overflow-hidden select-none">
      
      {/* LUXURY AMBIENT GLOWS (Slow moving background light) */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gold/10 blur-[150px] rounded-full pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[130px] rounded-full pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      
      {/* VIGNETTE OVERLAY (Gives depth like fine paper/fabric) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(122,30,30,0.03))] pointer-events-none" />

      {/* CONTENT CONTAINER */}
      <div 
        className={`text-center z-10 px-8 transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) transform ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
        }`}
      >
        {/* BRAND ICON / EMBLEM AREA */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Minimalist fine-line geometric diamond acting as a premium structural anchor */}
            <div className="absolute inset-0 border border-gold/30 rotate-45 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-2 border border-primary/20 -rotate-45 animate-[spin_15s_linear_infinite]" />
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
          </div>
        </div>

        {/* BRAND TITLE (Cinematic tracking expansion) */}
        <h1 
          className={`font-serif text-4xl sm:text-5xl font-extralight uppercase text-primary transition-all duration-[1600ms] delay-300 ${
            mounted ? "tracking-[0.5em] pr-[-0.5em]" : "tracking-[0.2em] pr-[-0.2em]"
          }`}
          style={{ fontStyle: 'normal' }}
        >
          Narayanam
        </h1>

        {/* SUBTITLE */}
        <div className="overflow-hidden mt-4">
          <p 
            className={`text-gold tracking-[0.35em] uppercase text-[10px] sm:text-xs font-medium transition-all duration-1000 delay-700 transform ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            Premium Ethnic Collection
          </p>
        </div>

        {/* ELEGANT "SILK THREAD" LOADER */}
        <div className="mt-14 w-40 mx-auto relative">
          {/* Main Track */}
          <div className="h-[1px] w-full bg-primary/10 relative overflow-hidden">
            {/* The Golden Thread */}
            <div className="absolute top-0 left-0 h-full w-2/3 bg-gradient-to-r from-transparent via-gold to-transparent animate-premium-slide" />
          </div>
          
          {/* Subtle accent glow directly beneath the track */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[4px] w-12 bg-gold/20 blur-sm rounded-full animate-pulse" />
        </div>

        {/* STATUS TEXT */}
        <p className="mt-5 text-primary/40 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-light animate-[pulse_2.5s_ease-in-out_infinite]">
          Preparing your experience
        </p>
      </div>
    </div>
  );
}