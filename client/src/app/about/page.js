"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import API from "../../lib/api";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const res = await API.get("/about-settings");

      setAboutData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!aboutData) {
    return (
      <div className="h-screen flex justify-center items-center text-xl sm:text-2xl bg-[#F9F6F1]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F1] overflow-hidden">
      {/* HERO */}
      <section
        className="
          relative
          bg-black
          text-white
          py-24
          sm:py-32
          px-4
          sm:px-6
          md:px-10
          text-center
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[500px]
            h-[500px]
            bg-[#D4AF37]/10
            blur-[140px]
            rounded-full
          "
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <p
            className="
              text-[#D4AF37]
              uppercase
              tracking-[4px]
              sm:tracking-[6px]
              text-xs
              sm:text-sm
              mb-5
            "
          >
            Luxury Fashion Brand
          </p>

          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-bold
              leading-tight
            "
          >
            {aboutData.heroTitle}
          </h1>

          <p
            className="
              mt-6
              text-gray-300
              max-w-3xl
              mx-auto
              text-sm
              sm:text-base
              leading-7
            "
          >
            {aboutData.heroSubtitle}
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div
            className="
              bg-white
              rounded-[40px]
              p-6
              sm:p-10
              lg:p-16
              shadow-sm
              border
              relative
              overflow-hidden
            "
          >
            {/* GLOW */}
            <div
              className="
                absolute
                top-0
                right-0
                w-[300px]
                h-[300px]
                bg-[#D4AF37]/10
                blur-[100px]
                rounded-full
              "
            />

            <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
              {/* LEFT */}
              <div>
                <p
                  className="
                    text-[#D4AF37]
                    uppercase
                    tracking-[4px]
                    sm:tracking-[6px]
                    text-xs
                    sm:text-sm
                    mb-5
                  "
                >
                  Our Journey
                </p>

                <h2
                  className="
                    text-3xl
                    sm:text-4xl
                    lg:text-5xl
                    font-bold
                    leading-tight
                    mb-8
                  "
                >
                  {aboutData.storyTitle}
                </h2>

                <p
                  className="
                    text-gray-600
                    leading-8
                    text-sm
                    sm:text-base
                    lg:text-lg
                  "
                >
                  {aboutData.storyDescription}
                </p>
              </div>

              {/* RIGHT PREMIUM STATS */}
              <div className="grid grid-cols-2 gap-5">
                {aboutData.stats?.map((item, index) => (
                  <div
                    key={index}
                    className={`
                      rounded-3xl
                      p-6
                      sm:p-8
                      flex
                      flex-col
                      justify-center
                      min-h-[180px]
                      transition
                      duration-300
                      hover:scale-[1.03]
                      ${
                        index % 2 === 0
                          ? "bg-black text-white"
                          : "bg-[#faf7f2] border"
                      }
                    `}
                  >
                    <h3
                      className="
                        text-3xl
                        sm:text-4xl
                        font-bold
                        text-[#D4AF37]
                      "
                    >
                      {item.value}
                    </h3>

                    <p
                      className={`
                        mt-3
                        text-sm
                        sm:text-base
                        ${index % 2 === 0 ? "text-gray-300" : "text-gray-600"}
                      `}
                    >
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <p
            className="
              text-[#D4AF37]
              uppercase
              tracking-[4px]
              sm:tracking-[6px]
              text-xs
              sm:text-sm
              mb-4
            "
          >
            Our Vision
          </p>

          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              leading-tight
              mb-6
            "
          >
            {aboutData.missionTitle}
          </h2>

          <p
            className="
              text-gray-600
              leading-8
              text-sm
              sm:text-base
              lg:text-lg
              max-w-4xl
              mx-auto
            "
          >
            {aboutData.missionDescription}
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="
                text-[#D4AF37]
                uppercase
                tracking-[4px]
                sm:tracking-[6px]
                text-xs
                sm:text-sm
                mb-4
              "
            >
              Brand Growth
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold">Our Achievements</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {aboutData.stats?.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white
                  p-6
                  sm:p-8
                  rounded-3xl
                  shadow-sm
                  text-center
                  hover:shadow-xl
                  transition
                "
              >
                <h2
                  className="
                    text-3xl
                    sm:text-5xl
                    font-bold
                    text-[#D4AF37]
                  "
                >
                  {item.value}
                </h2>

                <p
                  className="
                    mt-3
                    text-gray-600
                    text-sm
                    sm:text-base
                  "
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER MESSAGE */}
      <section
        className="
          relative
          bg-black
          text-white
          py-20
          sm:py-28
          px-4
          sm:px-6
          md:px-10
          text-center
          overflow-hidden
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[450px]
            h-[450px]
            bg-[#D4AF37]/10
            blur-[120px]
            rounded-full
          "
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <p
            className="
              text-[#D4AF37]
              uppercase
              tracking-[4px]
              sm:tracking-[6px]
              text-xs
              sm:text-sm
              mb-5
            "
          >
            Founder Message
          </p>

          <h2
            className="
              text-2xl
              sm:text-4xl
              lg:text-5xl
              font-light
              leading-relaxed
            "
          >
            "{aboutData.founderMessage}"
          </h2>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <p
            className="
              text-[#D4AF37]
              uppercase
              tracking-[4px]
              sm:tracking-[6px]
              text-xs
              sm:text-sm
              mb-4
            "
          >
            Partnership
          </p>

          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              leading-tight
            "
          >
            Want To Partner With Us?
          </h2>

          <p
            className="
              text-gray-600
              mt-5
              text-sm
              sm:text-base
              leading-7
            "
          >
            Join hundreds of retailers and boutiques working with our premium
            ethnic collections across India.
          </p>

          <Link href="/contact">
            <button
              className="
                mt-10
                bg-[#D4AF37]
                hover:bg-[#c79f28]
                transition
                duration-300
                text-black
                px-8
                sm:px-10
                py-4
                rounded-full
                font-semibold
                shadow-lg
                hover:scale-105
              "
            >
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
