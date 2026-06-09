"use client";

import { Flame } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import ProductCard from "../../components/product/ProductCard";
import API from "../../lib/api";

export default function BestSellerSection() {
  const [products, setProducts] =
    useState(() => []);

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
      <section className="py-12 sm:py-16 bg-[#f8f3ec]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[#d6b36a] border-t-transparent animate-spin mx-auto"></div>

            <h2 className="text-lg sm:text-3xl font-light mt-5 sm:mt-8">
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
    <section className="py-12 sm:py-16 lg:py-20 bg-[#f8f3ec] overflow-hidden">

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">

          <div className="flex justify-center mb-3 sm:mb-5">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#fff7e8] flex items-center justify-center shadow-sm">
              <Flame
                size={24}
                className="text-[#d6a733]"
              />
            </div>
          </div>

          <p
            className="
              uppercase
              tracking-[3px]
              sm:tracking-[5px]
              text-[#b68d40]
              text-[10px]
              sm:text-xs
              mb-2
            "
          >
            Most Loved Collection
          </p>

          <h2
            className="
              text-2xl
              sm:text-4xl
              lg:text-5xl
              font-light
              leading-tight
            "
          >
            Best Sellers
          </h2>

          <p
            className="
              text-gray-600
              mt-3
              sm:mt-5
              max-w-2xl
              mx-auto
              leading-6
              sm:leading-8
              text-xs
              sm:text-sm
              lg:text-base
              px-2
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
            grid-cols-2
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-3
            sm:gap-5
            lg:gap-6
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
        <div className="text-center mt-8 sm:mt-12">

          <Link href="/products">
            <button
              className="
                w-full
                sm:w-auto
                px-6
                sm:px-8
                py-3
                sm:py-4
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