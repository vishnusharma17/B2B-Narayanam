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
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      {/* Hero */}
      <section className="bg-black text-white py-28 text-center px-6">
        <p className="text-[#D4AF37] uppercase tracking-[6px] text-sm mb-4">
          Luxury Brand
        </p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-[4px]">
          {aboutData.heroTitle}
        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
          {aboutData.heroSubtitle}
        </p>
      </section>

      {/* Story */}
      <section className="py-24 px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <img
            src={aboutData.factoryImage}
            alt="factory"
            className="rounded-3xl h-[550px] w-full object-cover shadow-lg"
          />

          <div>
            <p className="text-[#D4AF37] uppercase tracking-[6px] text-sm mb-4">
              Our Journey
            </p>

            <h2 className="text-5xl font-bold mb-6">{aboutData.storyTitle}</h2>

            <p className="text-gray-600 leading-8 text-lg">
              {aboutData.storyDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#D4AF37] uppercase tracking-[6px] text-sm mb-4">
            Our Vision
          </p>

          <h2 className="text-5xl font-bold mb-6">{aboutData.missionTitle}</h2>

          <p className="text-gray-600 leading-8 text-lg">
            {aboutData.missionDescription}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {aboutData.stats.map((item) => (
            <div key={item._id} className="bg-white p-10 rounded-3xl shadow-md">
              <h2 className="text-5xl font-bold text-[#7A1E1E]">
                {item.value}
              </h2>

              <p className="mt-4 text-gray-600 text-lg">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Message */}
      <section className="bg-black text-white py-24 px-6 md:px-10 text-center">
        <p className="text-[#D4AF37] uppercase tracking-[6px] text-sm mb-4">
          Founder Message
        </p>

        <h2 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto leading-relaxed">
          "{aboutData.founderMessage}"
        </h2>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          Want To Partner With Us?
        </h2>

        <p className="text-gray-600 mt-5">
          Join hundreds of retailers working with us.
        </p>

        <Link href="/contact">
          <button className="mt-8 bg-[#7A1E1E] text-white px-10 py-4 rounded-full hover:bg-black transition">
            Contact Us
          </button>
        </Link>
      </section>
    </div>
  );
}
