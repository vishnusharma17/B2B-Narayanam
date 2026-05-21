"use client";

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
      <section className="py-14 sm:py-20 px-4 md:px-10 bg-white text-center">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Loading Best Sellers...
        </h2>
      </section>
    );
  }

  if (
    products.length === 0
  )
    return null;

  return (
    <section className="py-14 sm:py-20 px-4 md:px-10 bg-white">
      
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-12">
        <p
          className="
            text-[#C9A227]
            tracking-[3px]
            sm:tracking-[5px]
            uppercase
            text-xs
            sm:text-sm
            mb-3
          "
        >
          Most Loved
        </p>

        <h2
          className="
            text-2xl
            sm:text-4xl
            md:text-5xl
            font-bold
          "
        >
          Best Sellers
        </h2>

        <p
          className="
            text-gray-500
            mt-3
            sm:mt-4
            text-sm
            sm:text-base
            px-2
          "
        >
          Our most loved premium
          collections
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
    </section>
  );
}