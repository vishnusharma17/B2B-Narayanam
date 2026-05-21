"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function HeroSection() {
  const [slides, setSlides] =
    useState([]);

  const [current, setCurrent] =
    useState(0);

  // Fetch banners
  useEffect(() => {
    const fetchBanners =
      async () => {
        try {
          const res =
            await API.get(
              "/banners"
            );

          setSlides(
            res.data.data || []
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchBanners();
  }, []);

  // Auto Slider
  useEffect(() => {
    if (!slides.length) return;

    const interval =
      setInterval(() => {
        setCurrent(
          (prev) =>
            (prev + 1) %
            slides.length
        );
      }, 5000);

    return () =>
      clearInterval(
        interval
      );
  }, [slides]);

  if (slides.length === 0) {
    return (
      <div className="h-[70vh] sm:h-screen flex items-center justify-center bg-white text-black text-lg sm:text-xl">
        Loading banners...
      </div>
    );
  }

  return (
    <section
     className="
  relative
  mt-[80px]
  h-[calc(70vh-80px)]
  sm:h-[calc(85vh-80px)]
  md:h-[calc(100vh-80px)]
  overflow-hidden
  bg-[#f5f5f5]
"
    >
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden bg-[#f5f5f5]">
        {slides.map(
          (
            slide,
            index
          ) => (
            <div
              key={
                index
              }
              className={`
                absolute
                inset-0
                transition-all
                duration-1000
                flex
                items-center
                justify-center
                ${
                  current ===
                  index
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }
              `}
            >
              <img
                src={
                  slide.image
                }
                alt="banner"
                className="
                  w-full
                  h-full
                  object-contain
                  object-center
                "
              />
            </div>
          )
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center z-10">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 text-white w-full">
          
          <p
            className="
              text-[#D4AF37]
              uppercase
              tracking-[3px]
              sm:tracking-[6px]
              text-xs
              sm:text-sm
              mb-3
              sm:mb-4
            "
          >
            Exclusive Collection
          </p>

          <h1
            className="
              text-3xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-bold
              leading-tight
              max-w-3xl
              mb-4
              sm:mb-5
            "
          >
            {
              slides[current]
                ?.title
            }
          </h1>

          <p
            className="
              text-sm
              sm:text-lg
              md:text-xl
              text-gray-200
              max-w-xl
              leading-6
              sm:leading-8
              mb-6
              sm:mb-8
            "
          >
            {
              slides[current]
                ?.subtitle
            }
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            
            <Link
              href={
                slides[current]
                  ?.link ||
                "/products"
              }
            >
              <button
                className="
                  w-full
                  sm:w-auto
                  bg-[#D4AF37]
                  text-black
                  px-6
                  sm:px-8
                  py-3
                  sm:py-4
                  rounded-full
                  font-medium
                  hover:bg-white
                  transition
                "
              >
                Shop Collection
              </button>
            </Link>

            <Link href="/contact">
              <button
                className="
                  w-full
                  sm:w-auto
                  border
                  border-white
                  px-6
                  sm:px-8
                  py-3
                  sm:py-4
                  rounded-full
                  hover:bg-white
                  hover:text-black
                  transition
                "
              >
                Bulk Inquiry
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 sm:bottom-8 w-full flex justify-center gap-2 sm:gap-3 z-10">
        
        {slides.map(
          (
            _,
            index
          ) => (
            <button
              key={
                index
              }
              onClick={() =>
                setCurrent(
                  index
                )
              }
              className={`
                transition-all
                duration-300
                ${
                  current ===
                  index
                    ? "w-6 sm:w-8 h-2 sm:h-3 rounded-full bg-[#D4AF37]"
                    : "w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-white/70"
                }
              `}
            />
          )
        )}
      </div>
    </section>
  );
}