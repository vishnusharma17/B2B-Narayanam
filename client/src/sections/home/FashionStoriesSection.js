"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function FashionStoriesSection() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await API.get("/fashion-stories");

      setStories(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  if (stories.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 px-4 md:px-10 bg-white">
      <div className="text-center mb-10 sm:mb-12">
        <p className="text-[#C9A227] uppercase tracking-[4px] text-xs sm:text-sm mb-3">
          Editorial
        </p>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
          Fashion Stories
        </h2>

        <p className="text-gray-500 mt-3 text-sm sm:text-base">
          Discover trends, styling inspiration and fashion insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Link key={story._id} href={story.link || "#"}>
            <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300 cursor-pointer">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-[300px] object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{story.title}</h3>

                <p className="text-gray-500 text-sm leading-6">
                  {story.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
