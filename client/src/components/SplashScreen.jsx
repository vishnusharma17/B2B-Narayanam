"use client";

import { useEffect, useRef, useState } from "react";

export default function SplashScreen({ onComplete }) {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // 1. Inject pure dynamic css directly inside this file so no tailwind config is needed
    const styleId = "luxury-splash-styles";
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

    // 2. Trigger animation entrance
    setMounted(true);

    // Desktop Mouse follow framework
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setMousePos({ x: (clientX / width) * 100, y: (clientY / height) * 100 });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 3. Exact 3 Seconds: Start cinematic exit slide
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 3000);

    // 4. Exact 4 Seconds: Fully exit and unmount from visual tree
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
        backgroundColor: "#F9F6F1", // Custom brand cream directly injected
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.05)" : "scale(1)",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* ROYAL STRUCTURAL GRID OVERLAY */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.03] px-8 sm:px-20">
        <div className="w-[1px] h-full" style={{ backgroundColor: "#7A1E1E" }} />
        <div className="w-[1px] h-full hidden md:block" style={{ backgroundColor: "#7A1E1E" }} />
        <div className="w-[1px] h-full hidden md:block" style={{ backgroundColor: "#7A1E1E" }} />
        <div className="w-[1px] h-full" style={{ backgroundColor: "#7A1E1E" }} />
      </div>
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.03] py-12 sm:py-24">
        <div className="h-[1px] w-full" style={{ backgroundColor: "#7A1E1E" }} />
        <div className="h-[1px] w-full" style={{ backgroundColor: "#7A1E1E" }} />
      </div>

      {/* INTELLIGENT CURSOR AMBIENT LIGHT (Desktop Only) */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none blur-[160px] transition-all duration-[1500ms] ease-out hidden md:block"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(212, 175, 55, 0.05)",
        }}
      />
      
      {/* Mobile Ambient Lights */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] blur-[130px] rounded-full pointer-events-none md:hidden animate-pulse" style={{ backgroundColor: "rgba(122, 30, 30, 0.02)" }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] blur-[130px] rounded-full pointer-events-none md:hidden animate-pulse" style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }} />

      {/* ROYAL HERITAGE BACKGROUND VECTOR MASK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.025] mix-blend-multiply scale-110 sm:scale-100">
        <svg className="w-[650px] h-[650px] animate-[spin_140s_linear_infinite]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
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

      {/* CORE GRAPHICAL BLOCK */}
      <div className="text-center z-10 px-8 relative">
        
        {/* CONCENTRIC ROYAL EMBLEM FILIGREE */}
        <div className="mb-14 flex justify-center">
          <div className="relative w-24 h-24 flex items-center justify-center scale-90 sm:scale-100">
            <div className="absolute inset-0 border-[0.5px] rounded-full animate-[spin_40s_linear_infinite]" style={{ borderColor: "rgba(212, 175, 55, 0.3)" }} />
            <div className="absolute inset-2 border-[0.5px] rotate-45 animate-[spin_24s_linear_infinite]" style={{ borderColor: "rgba(122, 30, 30, 0.1)" }} />
            <div className="absolute inset-4 border-[0.5px] -rotate-45 animate-[spin_12s_linear_infinite]" style={{ borderColor: "rgba(212, 175, 55, 0.2)" }} />
            <div 
              className="w-1.5 h-1.5 rounded-full animate-pulse" 
              style={{ 
                background: "linear-gradient(to top right, #D4AF37, #F6E0A4, #B68D40)",
                boxShadow: "0 0 15px rgba(212, 175, 55, 0.6)"
              }} 
            />
          </div>
        </div>

        {/* STAGGERED REVEAL DIGITAL TYPOGRAPHY */}
        <div className="overflow-hidden py-2">
          <h1 className="text-4xl sm:text-6xl font-light tracking-[0.55em] uppercase flex justify-center items-center pl-[0.55em]">
            {brandName.split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(to bottom, #7A1E1E, rgba(122, 30, 30, 0.95), rgba(122, 30, 30, 0.8))",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                  filter: mounted ? "blur(0)" : "blur(10px)",
                  transition: "all 1500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${index * 45}ms`,
                  fontFamily: "var(--font-serif, serif)",
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* BRIGHT METALLIC SHIMMER SUBTITLE */}
        <div className="overflow-hidden mt-6">
          <p 
            className="tracking-[0.45em] uppercase text-[9px] sm:text-xs font-medium text-transparent bg-clip-text luxury-anim-shimmer"
            style={{
              backgroundImage: "linear-gradient(to right, #B68D40, #F4D068, #B68D40)",
              backgroundSize: "200% auto",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(100%)",
              transition: "all 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "700ms"
            }}
          >
            Premium Ethnic Collection
          </p>
        </div>

        {/* ELEGANT LINE PROGRESS LOOM */}
        <div className="mt-20 w-36 mx-auto relative">
          <div className="h-[1px] w-full relative overflow-hidden rounded-full" style={{ backgroundColor: "rgba(122, 30, 30, 0.1)" }}>
            <div 
              className="absolute top-0 left-0 h-full w-1/2 luxury-anim-slide" 
              style={{ background: "linear-gradient(to right, transparent, #D4AF37, transparent)" }}
            />
          </div>
        </div>

        {/* DIGITAL ATELIER EMBROIDERY STATUS */}
        <p className="mt-6 text-[8px] sm:text-[9px] tracking-[0.45em] uppercase font-light font-sans" style={{ color: "rgba(122, 30, 30, 0.25)" }}>
          Curation In Progress
        </p>
      </div>
    </div>
  );
}