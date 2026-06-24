"use client";

import { useEffect, useRef, useState } from "react";

export default function SplashScreen({ onComplete }) {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setMousePos({ x: (clientX / width) * 100, y: (clientY / height) * 100 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Optional automatic trigger for demo purposes if no prop passed
    const timer = setTimeout(() => {
      if (onComplete) {
        setExiting(true);
        setTimeout(onComplete, 1000); // Wait for fade-out anim
      }
    }, 4500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const brandName = "NARAYANAM";

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-cream overflow-hidden select-none transition-all duration-[1000ms] cubic-bezier(0.76, 0, 0.24, 1) ${
        exiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* 1. SEAMLESS ROYAL ARCHITECTURAL GRID */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.03] px-8 sm:px-20">
        <div className="w-[1px] h-full bg-primary" />
        <div className="w-[1px] h-full bg-primary hidden md:block" />
        <div className="w-[1px] h-full bg-primary hidden md:block" />
        <div className="w-[1px] h-full bg-primary" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.03] py-12 sm:py-24">
        <div className="h-[1px] w-full bg-primary" />
        <div className="h-[1px] w-full bg-primary" />
      </div>

      {/* 2. DYNAMIC CURSOR PATTERNING & INTELLIGENT LIGHTING */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none bg-gold/5 blur-[160px] transition-all duration-[1500ms] ease-out hidden md:block"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Ambient Breathing Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/[0.02] blur-[150px] rounded-full pointer-events-none animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-gold/10 blur-[150px] rounded-full pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />

      {/* 3. BACKGROUND ROYAL KINETIC MOTIF */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] mix-blend-multiply scale-110 sm:scale-100">
        <svg className="w-[650px] h-[650px] animate-[spin_180s_linear_infinite]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <circle cx="100" cy="100" r="85" strokeWidth="0.15" strokeDasharray="3,3" className="text-primary"/>
          <circle cx="100" cy="100" r="65" strokeWidth="0.1" className="text-gold"/>
          <path d="M100 0 L100 200 M0 100 L200 100" strokeWidth="0.08" className="text-primary"/>
          {Array.from({ length: 12 }).map((_, i) => (
            <polygon 
              key={i} 
              points="100,35 138,100 100,165 62,100" 
              strokeWidth="0.08" 
              className="text-primary"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
        </svg>
      </div>

      {/* 4. MAIN EMBLEM & TYPOGRAPHY SYSTEM */}
      <div className="text-center z-10 px-8 relative">
        
        {/* HAUTE COUTURE LOGO ANCHOR */}
        <div className="mb-14 flex justify-center">
          <div className="relative w-24 h-24 flex items-center justify-center scale-90 sm:scale-100">
            <div className="absolute inset-0 border-[0.5px] border-gold/30 rounded-full animate-[spin_50s_linear_infinite]" />
            <div className="absolute inset-2 border-[0.5px] border-primary/10 rotate-45 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-4 border-[0.5px] border-gold/20 -rotate-45 animate-[spin_15s_linear_infinite]" />
            <div className="w-1.5 h-1.5 bg-gradient-to-tr from-gold via-[#F6E0A4] to-[#B68D40] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)] animate-pulse" />
          </div>
        </div>

        {/* METALLIC MOVEMENT CINEMATIC TEXT */}
        <div className="overflow-hidden py-3">
          <h1 className="text-4xl sm:text-6xl font-light tracking-[0.55em] uppercase flex justify-center items-center pl-[0.55em] transition-all duration-1000">
            {brandName.split("").map((letter, index) => (
              <span
                key={index}
                className={`inline-block text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/95 to-primary/80 transition-all duration-[1800ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
                  mounted ? "opacity-100 translate-y-0 filter blur-0" : "opacity-0 translate-y-12 filter blur-md"
                }`}
                style={{
                  transitionDelay: `${index * 45}ms`,
                  fontFamily: "var(--font-serif, serif)",
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* PREMIUM GOLD LIQUID SUBTITLE */}
        <div className="overflow-hidden mt-6">
          <p 
            className={`tracking-[0.45em] uppercase text-[9px] sm:text-xs font-medium transition-all duration-[1400ms] delay-[900ms] transform bg-clip-text text-transparent bg-gradient-to-r from-[#B68D40] via-[#F4D068] to-[#B68D40] bg-[length:200%_auto] animate-shimmer-gold ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            Premium Ethnic Collection
          </p>
        </div>

        {/* FINE HAIRLINE TIME PROGRESSION */}
        <div className="mt-24 w-36 mx-auto relative">
          <div className="h-[1px] w-full bg-primary/10 relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-gold to-transparent animate-premium-slide" />
          </div>
        </div>

        {/* ATELIER SIGNATURE */}
        <p className="mt-6 text-primary/25 text-[8px] sm:text-[9px] tracking-[0.45em] uppercase font-light font-sans">
          Curation In Progress
        </p>
      </div>

      {/* GLOBAL LUXURY STYLES */}
      <style jsx global>{`
        @keyframes premium-slide {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }
        @keyframes shimmer-gold {
          0% { bg-position: 0% center; }
          100% { bg-position: 200% center; }
        }
        .animate-premium-slide {
          animation: premium-slide 3.2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
        }
        .animate-shimmer-gold {
          animation: shimmer-gold 6s linear infinite;
        }
      `}</style>
    </div>
  );
}