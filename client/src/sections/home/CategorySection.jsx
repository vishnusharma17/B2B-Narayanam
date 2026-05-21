"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function CategorySection() {
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories =
    async () => {
      try {
        const res =
          await API.get(
            "/categories"
          );

        setCategories(
          res.data.data || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <section className="py-24 px-4 md:px-10 bg-white text-center">
        <h2 className="text-2xl font-semibold">
          Loading Categories...
        </h2>
      </section>
    );
  }

  if (
    categories.length === 0
  ) {
    return null;
  }

  return (
    <section className="py-20 sm:py-24 px-4 md:px-10 bg-white">
      
      {/* Heading */}
      <div className="text-center mb-14">
        
        <p className="uppercase tracking-[4px] sm:tracking-[6px] text-xs sm:text-sm text-gray-500 mb-3">
          Curated Collections
        </p>

        <h2 className="text-3xl sm:text-5xl font-semibold">
          Shop By Category
        </h2>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
        
        {categories.map(
          (
            item,
            index
          ) => (
            <Link
              key={
                item._id ||
                index
              }
              href={`/products?category=${item.name}`}
            >
              <div
                className="
                  relative
                  h-[350px]
                  sm:h-[450px]
                  lg:h-[500px]
                  rounded-3xl
                  overflow-hidden
                  group
                  cursor-pointer
                  bg-[#f5f5f5]
                "
              >
                {/* Image */}
                <img
                  src={
                    item.image
                  }
                  alt={
                    item.name
                  }
                  className="
                    w-full
                    h-full
                    object-cover
                    object-center
                    group-hover:scale-110
                    transition
                    duration-700
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-black/35
                    group-hover:bg-black/50
                    transition
                    duration-500
                  "
                ></div>

                {/* Text */}
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    justify-center
                    items-center
                    text-white
                    p-4
                    text-center
                  "
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                    {item.name}
                  </h3>

                  <button
                    className="
                      border
                      border-white
                      px-6
                      py-2
                      rounded-full
                      hover:bg-white
                      hover:text-black
                      transition
                      duration-300
                    "
                  >
                    Explore
                  </button>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
}