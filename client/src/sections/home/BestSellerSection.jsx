"use client";

import Link from "next/link";

import { Flame } from "lucide-react";

import { useEffect, useState } from "react";

import ProductCard from "../../components/product/ProductCard";
import API from "../../lib/api";

export default function BestSellerSection() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers =
    async () => {
      try {
        const res =
          await API.get(
            "/products/best-sellers"
          );

        setProducts(
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
      <section className="py-20 sm:py-28 bg-[#f8f3ec]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">

          <div className="text-center mb-14">
            <div className="w-16 h-16 rounded-full border-4 border-[#d6b36a] border-t-transparent animate-spin mx-auto"></div>

            <h2 className="text-2xl sm:text-4xl font-light mt-8">
              Loading Best Sellers...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  if (
    products.length === 0
  )
    return null;

  return (
    <section className="py-20 sm:py-28 bg-[#f8f3ec] overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-14 sm:mb-16">

          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-[#fff7e8] flex items-center justify-center shadow-sm">
              <Flame
                size={30}
                className="text-[#d6a733]"
              />
            </div>
          </div>

          <p
            className="
              uppercase
              tracking-[4px]
              text-[#b68d40]
              text-xs
              sm:text-sm
              mb-4
            "
          >
            Most Loved Collection
          </p>

          <h2
            className="
              text-3xl
              sm:text-5xl
              font-light
              leading-tight
            "
          >
            Best Sellers
          </h2>

          <p
            className="
              text-gray-600
              mt-5
              max-w-2xl
              mx-auto
              leading-8
              text-sm
              sm:text-base
            "
          >
            Explore our most demanded ethnic collections trusted by
            boutiques, fashion retailers and wholesale buyers across India.
          </p>
        </div>

        {/* Product Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
            sm:gap-6
          "
        >
          {products.map(
            (product) => (
              <ProductCard
                key={
                  product._id
                }
                product={
                  product
                }
              />
            )
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">

          <Link href="/products">
            <button
              className="
                px-8
                py-4
                rounded-full
                border
                border-black
                hover:bg-black
                hover:text-white
                transition
                duration-300
                text-sm
                sm:text-base
              "
            >
              Explore Full Collection
            </button>
          </Link>

        </div>
      </div>
    </section>
  );
}