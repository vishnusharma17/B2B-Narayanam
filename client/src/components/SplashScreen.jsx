"use client";

import { useEffect, useRef, useState } from "react";

export default function SplashScreen({ onComplete }) {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Inject styling directly for drop-in setup
    const styleId = "luxury-splash-styles-responsive";
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement("style");
      styleEl.id = styleId;
      styleEl.innerHTML = `
        @keyframes premium-slide-core {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }
        @keyframes shimmer-gold-core {
          0% { bg-position: 0% center; }
          100% { bg-position: 200% center; }
        }
        .luxury-anim-slide {
          animation: premium-slide-core 2.5s cubic-bezier(0.76, 0, 0.24, 1) infinite !important;
        }
        .luxury-anim-shimmer {
          animation: shimmer-gold-core 5s linear infinite !important;
        }
      `;
      document.head.appendChild(styleEl);
    }

    setMounted(true);

   

    // Exact 3 Seconds exit trigger
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 3000);

    // Exact 4 Seconds unmount handoff
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const brandName = "NARAYANAM";

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden select-none transition-all duration-[1000ms] cubic-bezier(0.76, 0, 0.24, 1)"
      style={{
        backgroundColor: "#F9F6F1",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.03)" : "scale(1)",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* 1. SEAMLESS RESPONSIVE ROYAL STRUCTURAL GRID */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.03] px-4 sm:px-12 md:px-20">
        <div className="w-[1px] h-full" style={{ backgroundColor: "#7A1E1E" }} />
        <div className="w-[1px] h-full hidden sm:block" style={{ backgroundColor: "#7A1E1E" }} />
        <div className="w-[1px] h-full hidden md:block" style={{ backgroundColor: "#7A1E1E" }} />
        <div className="w-[1px] h-full" style={{ backgroundColor: "#7A1E1E" }} />
      </div>
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.03] py-8 sm:py-16 md:py-24">
        <div className="h-[1px] w-full" style={{ backgroundColor: "#7A1E1E" }} />
        <div className="h-[1px] w-full" style={{ backgroundColor: "#7A1E1E" }} />
      </div>

      {/* 2. DYNAMIC MOUSE LIGHTING (Desktop) & STANDALONE LIGHTING (Mobile) */}
      <div
  className="
    absolute
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-[700px]
    h-[700px]
    rounded-full
    blur-[180px]
    animate-pulse
  "
  style={{
    background:
      "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
  }}
/>
      
      {/* Adaptive Mobile Lighting Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] blur-[90px] rounded-full pointer-events-none md:hidden opacity-60" style={{ backgroundColor: "rgba(122, 30, 30, 0.03)" }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] blur-[100px] rounded-full pointer-events-none md:hidden opacity-75" style={{ backgroundColor: "rgba(212, 175, 55, 0.08)" }} />

      {/* 3. FLUID BACKGROUND KINETIC VECTOR MASK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] mix-blend-multiply transition-all duration-500">
        <svg className="w-[85vw] h-[85vw] max-w-[650px] max-h-[650px] animate-[spin_160s_linear_infinite]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <circle cx="100" cy="100" r="85" strokeWidth="0.15" strokeDasharray="3,3" style={{ color: "#7A1E1E" }}/>
          <circle cx="100" cy="100" r="65" strokeWidth="0.1" style={{ color: "#D4AF37" }}/>
          <path d="M100 0 L100 200 M0 100 L200 100" strokeWidth="0.08" style={{ color: "#7A1E1E" }}/>
          {Array.from({ length: 12 }).map((_, i) => (
            <polygon 
              key={i} 
              points="100,35 138,100 100,165 62,100" 
              strokeWidth="0.08" 
              style={{ color: "#7A1E1E" }}
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
        </svg>
      </div>

      {/* 4. MAX CONTROL CORE CORE LAYOUT */}
      <div className="text-center z-10 px-4 sm:px-8 relative w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        
        {/* RESPONSIVE ATELIER EMBLEM FILIGREE */}
        <div className="mb-8 md:mb-14 flex justify-center">
          <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center transition-all duration-300">
            <div className="absolute inset-0 border-[0.5px] rounded-full animate-[spin_40s_linear_infinite]" style={{ borderColor: "rgba(212, 175, 55, 0.3)" }} />
            <div className="absolute inset-2 border-[0.5px] rotate-45 animate-[spin_24s_linear_infinite]" style={{ borderColor: "rgba(122, 30, 30, 0.1)" }} />
            <div className="absolute inset-4 border-[0.5px] -rotate-45 animate-[spin_12s_linear_infinite]" style={{ borderColor: "rgba(212, 175, 55, 0.2)" }} />
            <div 
              className="w-1.5 h-1.5 rounded-full" 
              style={{ 
                background: "linear-gradient(to top right, #D4AF37, #F6E0A4, #B68D40)",
                boxShadow: "0 0 12px rgba(212, 175, 55, 0.6)"
              }} 
            />
          </div>
        </div>

        {/* ANTI-WRAP STAGGERED REVEAL TYPOGRAPHY */}
        <div className="overflow-hidden py-2 w-full flex justify-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.35em] sm:tracking-[0.45em] md:tracking-[0.55em] uppercase flex justify-center items-center whitespace-nowrap translate-x-[0.2em]">
            {brandName.split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(to bottom, #7A1E1E, rgba(122, 30, 30, 0.95), rgba(122, 30, 30, 0.85))",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                  filter: mounted ? "blur(0)" : "blur(8px)",
                  transition: "all 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${index * 40}ms`,
                  fontFamily: "var(--font-serif, serif)",
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* LIQUID SHIMMER METALLIC SUBTITLE */}
        <div className="overflow-hidden mt-4 md:mt-6 w-full px-2">
          <p 
            className="tracking-[0.25em] sm:tracking-[0.4em] md:tracking-[0.45em] uppercase text-[8px] sm:text-[10px] md:text-xs font-medium text-transparent bg-clip-text luxury-anim-shimmer whitespace-nowrap"
            style={{
              backgroundImage: "linear-gradient(to right, #B68D40, #F4D068, #B68D40)",
              backgroundSize: "200% auto",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(100%)",
              transition: "all 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "650ms"
            }}
          >
            Premium Ethnic Collection
          </p>
        </div>

        {/* FLUID HAIRLINE PROGRESS PROGRESSION */}
        <div className="mt-16 md:mt-24 w-28 sm:w-36 mx-auto relative">
          <div className="h-[1px] w-full relative overflow-hidden rounded-full" style={{ backgroundColor: "rgba(122, 30, 30, 0.1)" }}>
            <div 
              className="absolute top-0 left-0 h-full w-1/2 luxury-anim-slide" 
              style={{ background: "linear-gradient(to right, transparent, #D4AF37, transparent)" }}
            />
          </div>
        </div>

        {/* ATELIER STATUS LEGEND FOOTER */}
        <p className="mt-5 md:mt-6 text-[7px] sm:text-[9px] tracking-[0.35em] sm:tracking-[0.45em] uppercase font-light font-sans" style={{ color: "rgba(122, 30, 30, 0.2)" }}>
          Curation In Progress
        </p>
      </div>
    </div>
  );
}