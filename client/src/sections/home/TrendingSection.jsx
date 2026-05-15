"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import API from "../../lib/api";

export default function TrendingSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products/trending")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 md:px-10 bg-white text-center">
        <h2 className="text-2xl font-semibold">
          Loading Trending Products...
        </h2>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-24 px-6 md:px-10 bg-white">

      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-[#D4AF37] uppercase tracking-[6px] text-sm mb-3">
          Trending Now
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-black">
          New Arrivals
        </h2>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-8">
          Fresh collections loved by retailers,
          boutiques and premium fashion stores.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}