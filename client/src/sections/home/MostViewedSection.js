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

  if (loading) {
    return (
      <section className="py-16 text-center">Loading Most Viewed...</section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 px-4 md:px-10 bg-[#faf7f2]">
      <div className="text-center mb-10 sm:mb-12">
        <p className="text-[#C9A227] uppercase tracking-[4px] text-xs sm:text-sm mb-3">
          Popular Picks
        </p>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
          Our Most Viewed Styles
        </h2>

        <p className="text-gray-500 mt-3 text-sm sm:text-base">
          Trending looks customers keep exploring
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
