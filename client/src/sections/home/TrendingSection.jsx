"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import API from "../../lib/api";

export default function TrendingSection() {
  const [products, setProducts] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchTrendingProducts =
      async () => {
        try {
          const res =
            await API.get(
              "/products/trending"
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

    fetchTrendingProducts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-10 bg-white text-center">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Loading Trending Products...
        </h2>
      </section>
    );
  }

  // No products
  if (
    products.length === 0
  ) {
    return null;
  }

  return (
    <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-10 bg-white">
      
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-14">
        <p
          className="
            text-[#D4AF37]
            uppercase
            tracking-[3px]
            sm:tracking-[6px]
            text-xs
            sm:text-sm
            mb-3
          "
        >
          Trending Now
        </p>

        <h2
          className="
            text-2xl
            sm:text-4xl
            md:text-5xl
            font-bold
            text-black
          "
        >
          New Arrivals
        </h2>

        <p
          className="
            text-sm
            sm:text-base
            text-gray-600
            mt-3
            sm:mt-4
            max-w-2xl
            mx-auto
            leading-6
            sm:leading-8
            px-2
          "
        >
          Fresh collections loved by retailers,
          boutiques and premium fashion stores.
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
          2xl:grid-cols-5
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
    </section>
  );
}