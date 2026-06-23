"use client";
import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import API from "../../lib/api";

export default function HeroSection() {
  const [slides, setSlides] =
    useState([]);

  const [current, setCurrent] =
    useState(0);



    const optimizeImage = (url, width = 1920) => {
  if (!url) return "";

  if (!url.includes("/upload/")) {
    return url;
  }

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width}/`
  );
};

  // =========================
  // FETCH BANNERS
  // =========================

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

  // =========================
  // AUTO SLIDER
  // =========================

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

  // =========================
  // NEXT
  // =========================

  const nextSlide = () => {
    setCurrent(
      (prev) =>
        (prev + 1) %
        slides.length
    );
  };

  // =========================
  // PREV
  // =========================

  const prevSlide = () => {
    setCurrent(
      (prev) =>
        prev === 0
          ? slides.length - 1
          : prev - 1
    );
  };

  // =========================
  // LOADING
  // =========================

  if (slides.length === 0) {
    return null;
  }

  return (
    <section
      className="
        relative
        mt-[80px]
        h-[70vh]
        sm:h-[85vh]
        lg:h-[92vh]
        overflow-hidden
        bg-black
      "
    >
      {/* SLIDES */}
      <div className="absolute inset-0">

        {slides.map(
          (
            slide,
            index
          ) => (
            <div
              key={index}
              className={`
                absolute
                inset-0
                transition-opacity
                duration-1000
                ${
                  current ===
                  index
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }
              `}
            >

              {/* IMAGE */}
<img
  src={optimizeImage(slide.image, 1920)}
  alt={slide.title || "Banner"}
  loading={index === 0 ? "eager" : "lazy"}
  fetchPriority={index === 0 ? "high" : "low"}
  className="w-full h-full object-cover object-top"
/>

              {/* OVERLAY */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-black/70
                  via-black/30
                  to-black/10
                "
              />

              {/* BOTTOM FADE */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-40
                  bg-gradient-to-t
                  from-black/80
                  to-transparent
                "
              />
            </div>
          )
        )}
      </div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-20
          h-full
          flex
          items-center
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            w-full
            px-4
            sm:px-6
            lg:px-10
          "
        >
          <div
            className="
              max-w-2xl
              text-white
            "
          >

            

            {/* TITLE */}
            <h1
              className="
                text-3xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                font-bold
                leading-tight
                mb-5
              "
            >
              {
                slides[current]
                  ?.title
              }
            </h1>

            {/* SUBTITLE */}
            <p
              className="
                text-sm
                sm:text-lg
                md:text-xl
                text-gray-200
                leading-7
                sm:leading-8
                mb-8
              "
            >
              {
                slides[current]
                  ?.subtitle
              }
            </p>

            {/* BUTTONS */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-4
              "
            >

              {/* PRIMARY */}
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
                    hover:bg-white
                    transition-all
                    duration-300
                    text-black
                    px-8
                    py-4
                    rounded-full
                    font-semibold
                    hover:scale-105
                  "
                >
                  Shop Collection
                </button>
              </Link>

              {/* SECONDARY */}
              <Link href="/contact">
                <button
                  className="
                    w-full
                    sm:w-auto
                    border
                    border-white/20
                    bg-white/10
                    backdrop-blur-md
                    hover:bg-white
                    hover:text-black
                    transition-all
                    duration-300
                    px-8
                    py-4
                    rounded-full
                    font-medium
                  "
                >
                  Bulk Inquiry
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* LEFT ARROW */}
      {/* <button
        onClick={prevSlide}
        className="
          absolute
          left-3
          sm:left-5
          top-1/2
          -translate-y-1/2
          z-30
          w-10
          h-10
          sm:w-12
          sm:h-12
          rounded-full
          bg-black/40
          backdrop-blur-md
          border
          border-white/10
          text-white
          flex
          items-center
          justify-center
          hover:bg-white
          hover:text-black
          transition
        "
      >
        <ChevronLeft
          size={22}
        />
      </button> */}

      {/* RIGHT ARROW */}
      {/* <button
        onClick={nextSlide}
        className="
          absolute
          right-3
          sm:right-5
          top-1/2
          -translate-y-1/2
          z-30
          w-10
          h-10
          sm:w-12
          sm:h-12
          rounded-full
          bg-black/40
          backdrop-blur-md
          border
          border-white/10
          text-white
          flex
          items-center
          justify-center
          hover:bg-white
          hover:text-black
          transition
        "
      >
        <ChevronRight
          size={22}
        />
      </button> */}

      {/* DOTS */}
      <div
        className="
          absolute
          bottom-5
          sm:bottom-7
          left-1/2
          -translate-x-1/2
          z-30
          flex
          items-center
          gap-3
        "
      >

        {slides.map(
          (
            _,
            index
          ) => (
            <button
              key={index}
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
                    ? "w-8 h-[3px] rounded-full bg-[#D4AF37]"
                    : "w-2.5 h-2.5 rounded-full bg-white/50"
                }
              `}
            />
          )
        )}
      </div>
    </section>
  );
}