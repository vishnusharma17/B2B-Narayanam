"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function WardrobePickSection() {
  const [picks, setPicks] = useState([]);

  useEffect(() => {
    fetchPicks();
  }, []);

  const fetchPicks = async () => {
    try {
      const res = await API.get("/wardrobe-picks");

      setPicks(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  if (picks.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 px-4 md:px-10 bg-white">
      <div className="text-center mb-10 sm:mb-12">
        <p className="text-[#C9A227] uppercase tracking-[4px] text-xs sm:text-sm mb-3">
          Curated Collection
        </p>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
          Wardrobe Picks
        </h2>

        <p className="text-gray-500 mt-3 text-sm sm:text-base">
          Trending looks you’ll keep coming back to
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {picks.map((pick) => (
          <Link key={pick._id} href={pick.link || "#"}>
            <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer">
              <img
                src={pick.image}
                alt={pick.title}
                className="w-full h-[320px] object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{pick.title}</h3>

                <p className="text-gray-500 text-sm leading-6">
                  {pick.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
