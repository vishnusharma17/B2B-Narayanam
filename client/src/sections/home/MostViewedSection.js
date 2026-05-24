"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import API from "../../lib/api";

export default function MostViewedSection() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMostViewed();
  }, []);

  const fetchMostViewed = async () => {
    try {
      const res = await API.get("/products/most-viewed");

      setProducts(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-[#faf7f2] text-center">
        <div className="w-12 h-12 border-4 border-[#C9A227] border-t-transparent rounded-full animate-spin mx-auto"></div>

        <h2 className="text-lg sm:text-2xl font-semibold mt-5">
          Loading Most Viewed...
        </h2>
      </section>
    );
  }

  // NO PRODUCTS
  if (products.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#faf7f2] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADING */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[#C9A227] uppercase tracking-[3px] sm:tracking-[5px] text-[10px] sm:text-xs mb-2">
            Popular Picks
          </p>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Our Most Viewed Styles
          </h2>

          <p className="text-gray-500 mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base leading-6 sm:leading-7 max-w-2xl mx-auto px-2">
            Trending looks customers keep exploring
          </p>
        </div>

        {/* PRODUCTS */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-3
            sm:gap-5
            lg:gap-6
          "
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="
                  bg-white
                  rounded-2xl
                  p-2
                  sm:p-3
                  shadow-sm
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
            >
              <div className="overflow-hidden rounded-xl">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
