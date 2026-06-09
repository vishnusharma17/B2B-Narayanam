"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

const optimizeImage = (url, width = 800) => {
  if (!url) return "";

  if (!url.includes("/upload/")) {
    return url;
  }

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,dpr_auto,w_${width}/`
  );
};

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      setCategories(res.data.data || [].slice(0, 6));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-white text-center">
        <h2 className="text-lg sm:text-2xl font-semibold">
          Loading Categories...
        </h2>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="uppercase tracking-[3px] sm:tracking-[5px] text-[10px] sm:text-xs text-gray-500 mb-2">
            Curated Collections
          </p>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            Shop By Category
          </h2>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {categories.map((item, index) => (
            <Link
              key={item._id || index}
              href={`/products?category=${item.name}`}
            >
              <div
                className="
                  relative
                  h-[180px]
                  sm:h-[280px]
                  lg:h-[360px]
                  rounded-2xl
                  overflow-hidden
                  group
                  cursor-pointer
                  bg-[#f5f5f5]
                "
              >

                {/* Image */}
                {item.image ? (
                 <img
  src={optimizeImage(item.image, 800)}
  alt={item.name}
  loading="lazy"
  decoding="async"
  fetchPriority="low"
  className="
    w-full
    h-full
    object-cover
    object-center
    transform-gpu
    group-hover:scale-105
    transition
    duration-300
  "
/>
                ) : (
                  <div className="w-full h-full bg-gray-200"></div>
                )}

                {/* Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-black/35
                    group-hover:bg-black/45
                    transition
                    duration-300
                  "
                ></div>

                {/* Text */}
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    justify-end
                    items-center
                    text-white
                    p-4
                    sm:p-6
                    text-center
                  "
                >
                  <h3 className="text-sm sm:text-2xl font-semibold mb-2 sm:mb-4">
                    {item.name}
                  </h3>

                  <button
                    className="
                      border
                      border-white
                      px-3
                      sm:px-5
                      py-1.5
                      sm:py-2
                      rounded-full
                      hover:bg-white
                      hover:text-black
                      transition
                      duration-300
                      text-xs
                      sm:text-sm
                    "
                  >
                    Explore
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}