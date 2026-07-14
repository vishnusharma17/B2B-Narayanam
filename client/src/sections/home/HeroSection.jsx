"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import API from "../../lib/api";

// =========================
// OPTIMIZE CLOUDINARY IMAGE
// =========================

const optimizeImage = (
  url,
  width = 1600
) => {
  if (!url) return "";

  if (
    !url.includes(
      "/upload/"
    )
  ) {
    return url;
  }

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto:eco,w_${width}/`
  );
};

export default function HeroSection() {
  const [slides, setSlides] =
    useState([]);

  const [current, setCurrent] =
    useState(0);

  // =========================
  // FETCH DYNAMIC BANNERS
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
          console.log(
            "BANNER FETCH ERROR:",
            error
          );
        }
      };

    fetchBanners();
  }, []);

  // =========================
  // AUTO SLIDER
  // =========================

  useEffect(() => {
    if (
      slides.length <= 1
    ) {
      return;
    }

    const interval =
      setInterval(() => {
        setCurrent(
          (prev) =>
            (prev + 1) %
            slides.length
        );
      }, 5000);

    return () => {
      clearInterval(
        interval
      );
    };
  }, [slides.length]);

  // =========================
  // LOADING PLACEHOLDER
  // =========================

  if (
    slides.length === 0
  ) {
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
        aria-label="Loading banner"
      />
    );
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
      aria-label="Featured collections"
    >

      {/* =====================
          DYNAMIC SLIDES
      ====================== */}

      <div
        className="
          absolute
          inset-0
        "
      >

        {slides.map(
          (
            slide,
            index
          ) => {
            const mobileImage =
              optimizeImage(
                slide.mobileImage ||
                  slide.desktopImage,
                600
              );

            const desktopImage =
              optimizeImage(
                slide.desktopImage ||
                  slide.mobileImage,
                1600
              );

            return (
              <div
                key={
                  slide._id ||
                  index
                }
                aria-hidden={
                  current !==
                  index
                }
                className={`
                  absolute
                  inset-0
                  transition-opacity
                  duration-700
                  ${
                    current ===
                    index
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0 pointer-events-none"
                  }
                `}
              >

                {/* =====================
                    RESPONSIVE IMAGE
                ====================== */}

                <picture>

                  <source
                    media="(max-width: 767px)"
                    srcSet={
                      mobileImage
                    }
                  />

                  <img
                    src={
                      desktopImage
                    }
                    alt={
                      slide.title ||
                      "Narayanam collection banner"
                    }
                    width="1600"
                    height="900"
                    loading={
                      index === 0
                        ? "eager"
                        : "lazy"
                    }
                    fetchPriority={
                      index === 0
                        ? "high"
                        : "low"
                    }
                    decoding={
                      index === 0
                        ? "sync"
                        : "async"
                    }
                    className="
                      absolute
                      inset-0
                      w-full
                      h-full
                      object-cover
                      object-center
                    "
                  />

                </picture>

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
            );
          }
        )}

      </div>

      {/* =====================
          DYNAMIC CONTENT
      ====================== */}

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
                gap-3
                items-start
              "
            >

              {/* PRIMARY */}

              <Link
                href={
                  slides[current]
                    ?.link ||
                  "/products"
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  w-auto
                  bg-[#D4AF37]
                  hover:bg-white
                  transition-all
                  duration-300
                  text-black
                  px-5
                  sm:px-8
                  py-2.5
                  sm:py-4
                  rounded-full
                  font-semibold
                  text-sm
                  sm:text-base
                "
              >
                Shop Collection
              </Link>

              {/* SECONDARY */}

              <Link
                href="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  w-auto
                  border
                  border-white/20
                  bg-white/10
                  backdrop-blur-md
                  hover:bg-white
                  hover:text-black
                  transition-all
                  duration-300
                  px-5
                  sm:px-8
                  py-2.5
                  sm:py-4
                  rounded-full
                  font-medium
                  text-sm
                  sm:text-base
                "
              >
                Bulk Inquiry
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* =====================
          SLIDER DOTS
      ====================== */}

      {slides.length > 1 && (
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
              slide,
              index
            ) => (
              <button
                type="button"
                key={
                  slide._id ||
                  index
                }
                onClick={() =>
                  setCurrent(
                    index
                  )
                }
                aria-label={
                  `Show banner ${
                    index + 1
                  }`
                }
                aria-current={
                  current ===
                  index
                    ? "true"
                    : undefined
                }
                className={`
                  transition-all
                  duration-300
                  ${
                    current ===
                    index
                      ? "w-8 h-[3px] rounded-full bg-[#D4AF37]"
                      : "w-2.5 h-2.5 rounded-full bg-white/70"
                  }
                `}
              />
            )
          )}

        </div>
      )}

    </section>
  );
}

