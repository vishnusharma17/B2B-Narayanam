"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import API from "../../lib/api";

export default function LimitedStockSection() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchLimitedStockProducts();
  }, []);

  const fetchLimitedStockProducts =
    async () => {
      try {
        const res =
          await API.get(
            "/products/limited-stock"
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

  // LOADING
  if (loading) {
    return (
      <section
        className="
          py-12
          sm:py-16
          bg-[#111]
          text-white
          min-h-[750px]
          sm:min-h-[900px]
          lg:min-h-[1050px]
        "
      >

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="text-lg sm:text-2xl font-semibold mt-5">
            Loading Limited Stock...
          </h2>

        </div>
      </section>
    );
  }

  // NO PRODUCTS
  if (products.length === 0)
    return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#111] text-white overflow-hidden">

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <div className="text-center mb-8 sm:mb-12">

          <p className="text-red-400 tracking-[3px] sm:tracking-[5px] uppercase text-[10px] sm:text-xs mb-2">
            Hurry Up
          </p>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Limited Stock
          </h2>

          <p className="text-gray-400 mt-3 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base leading-6 sm:leading-7 px-2">
            Premium fast-selling collections with limited availability.
            Grab them before they're gone.
          </p>

        </div>

        {/* PRODUCTS */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-4
            sm:gap-6
          "
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="
                relative
                bg-[#1a1a1a]
                rounded-2xl
                p-2
                sm:p-3
                border
                border-white/10
                hover:border-red-500/40
                transition-all
                duration-300
              "
            >

              {/* STOCK BADGE */}
              <div
                className="
                  absolute
                  top-4
                  left-4
                  z-20
                  inline-flex
                  items-center
                  bg-red-500
                  text-white
                  px-2.5
                  sm:px-3
                  py-1
                  rounded-full
                  text-[10px]
                  sm:text-xs
                  font-semibold
                  shadow-lg
                "
              >
                Only {product.stock} left
              </div>

              {/* PRODUCT */}
              <div className="overflow-hidden rounded-xl">
                <ProductCard
                  product={product}
                />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

