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
      <section className="py-12 sm:py-16 lg:py-20 bg-white">

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADING SKELETON */}
          <div className="text-center mb-8 sm:mb-12">

            <div
              className="
                w-28
                h-3
                bg-gray-200
                rounded-full
                animate-pulse
                mx-auto
                mb-4
              "
            ></div>

            <div
              className="
                w-48
                sm:w-64
                h-8
                sm:h-12
                bg-gray-200
                rounded-lg
                animate-pulse
                mx-auto
              "
            ></div>

            <div
              className="
                w-full
                max-w-md
                h-4
                bg-gray-200
                rounded-full
                animate-pulse
                mx-auto
                mt-5
              "
            ></div>

          </div>

          {/* PRODUCT CARD SKELETON */}
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
              gap-3
              sm:gap-5
              lg:gap-6
            "
          >

            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="
                    bg-[#faf7f2]
                    rounded-3xl
                    overflow-hidden
                    border
                    border-[#f1ece4]
                    animate-pulse
                  "
                >

                  <div
                    className="
                      w-full
                      h-[260px]
                      sm:h-[320px]
                      md:h-[360px]
                      lg:h-[400px]
                      xl:h-[430px]
                      bg-gray-200
                    "
                  ></div>

                  <div className="p-4 sm:p-5">

                    <div className="w-20 h-3 bg-gray-200 rounded-full mb-4"></div>

                    <div className="w-full h-4 bg-gray-200 rounded-full mb-2"></div>

                    <div className="w-3/4 h-4 bg-gray-200 rounded-full"></div>

                    <div className="w-24 h-6 bg-gray-200 rounded-full mt-6"></div>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

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
    <section className="py-12 sm:py-16 lg:py-20 bg-white">

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">

          <p
            className="
              text-[#D4AF37]
              uppercase
              tracking-[3px]
              sm:tracking-[5px]
              text-[10px]
              sm:text-xs
              mb-2
            "
          >
            Trending Now
          </p>

          <h2
            className="
              text-2xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              text-black
              leading-tight
            "
          >
            New Arrivals
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              lg:text-base
              text-gray-600
              mt-3
              max-w-2xl
              mx-auto
              leading-6
              sm:leading-7
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
            grid-cols-2
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-5
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

      </div>
    </section>
  );
}

