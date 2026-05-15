"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function HeroSection() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  // Fetch banners
  useEffect(() => {
    API.get("/banners")
      .then((res) => {
        setSlides(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Auto slide
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading banners...
      </div>
    );
  }

  return (
    <section className="relative h-[90vh] md:h-screen overflow-hidden">
      
      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt="banner"
            className={`absolute w-full h-full object-cover transition-all duration-1000 ${
              current === index
                ? "opacity-100 scale-105"
                : "opacity-0 scale-100"
            }`}
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-white w-full">

          <p className="text-[#D4AF37] uppercase tracking-[6px] text-sm mb-4">
            Exclusive Collection
          </p>

          <h1 className="text-4xl md:text-7xl font-bold leading-tight max-w-3xl mb-5">
            {slides[current].title}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl leading-8 mb-8">
            {slides[current].subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={slides[current].link}>
              <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-medium hover:bg-white transition duration-300">
                Shop Collection
              </button>
            </Link>

            <Link href="/contact">
              <button className="border border-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition duration-300">
                Bulk Inquiry
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 ${
              current === index
                ? "w-8 h-3 rounded-full bg-[#D4AF37]"
                : "w-3 h-3 rounded-full bg-white/70"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}