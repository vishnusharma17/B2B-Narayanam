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
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-10 bg-[#111] text-white overflow-hidden">
        
        <div className="text-center">
          
          <div className="w-14 h-14 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="text-2xl sm:text-3xl font-semibold mt-6">
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
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-10 bg-[#111] text-white overflow-hidden">
      
      {/* HEADING */}
      <div className="text-center mb-12 sm:mb-14">
        
        <p className="text-red-400 tracking-[4px] sm:tracking-[5px] uppercase text-xs sm:text-sm mb-3">
          Hurry Up
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Limited Stock
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-7 px-2">
          Premium fast-selling collections with limited availability.
          Grab them before they're gone.
        </p>
      </div>

      {/* PRODUCTS */}
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
        {products.map((product) => (
          <div key={product._id}>
            
            {/* STOCK BADGE */}
            <div
              className="
                mb-3
                inline-flex
                items-center
                bg-red-500/10
                border
                border-red-500/30
                text-red-400
                px-4
                py-2
                rounded-full
                text-xs
                sm:text-sm
                font-semibold
              "
            >
              Only {product.stock} left
            </div>

            <ProductCard
              product={product}
            />
          </div>
        ))}
      </div>
    </section>
  );
}