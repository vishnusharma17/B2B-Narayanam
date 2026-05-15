"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function WholesalePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/wholesale-settings")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F1]">
      {/* Hero */}
      <section
        className="relative h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${data.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center text-white px-6">
          <p className="text-[#D4AF37] uppercase tracking-[6px] mb-4">
            Business Growth
          </p>

          <h1 className="text-5xl md:text-7xl font-bold">{data.heroTitle}</h1>

          <p className="mt-6 text-gray-200">{data.heroSubtitle}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-8">
          {data.benefits.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{item.title}</h2>

              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white text-center px-6">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {data.processSteps.map((step, index) => (
            <div key={index} className="bg-[#F9F6F1] p-8 rounded-2xl">
              <h3 className="text-xl font-bold">{index + 1}</h3>

              <p className="mt-4">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">{data.ctaTitle}</h2>

        <Link href="/contact">
          <button className="bg-[#7A1E1E] text-white px-10 py-4 rounded-full hover:bg-black transition">
            {data.ctaButtonText}
          </button>
        </Link>
      </section>
    </div>
  );
}
