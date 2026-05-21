"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import API from "../../lib/api";

export default function LimitedStockSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  const fetchLowStockProducts = async () => {
    try {
      const res = await API.get("/products");

      const allProducts = res.data.data || [];

      const lowStockProducts = allProducts
        .filter(
          (item) =>
            Number(item.stock) > 0 &&
            Number(item.stock) <= 10
        )
        .slice(0, 4);

      setProducts(lowStockProducts);
    } catch (error) {
      console.log(error);
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="py-20 px-4 md:px-10 bg-[#111] text-white">
      <div className="text-center mb-12">
        <p className="text-red-400 tracking-[5px] uppercase text-sm mb-3">
          Hurry Up
        </p>

        <h2 className="text-4xl md:text-5xl font-bold">
          Limited Stock
        </h2>

        <p className="text-gray-400 mt-4">
          Fast selling products — grab before they're gone
        </p>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {products.map((product) => (
          <div key={product._id}>
            <div className="mb-3 text-red-400 font-semibold">
              Only {product.stock} left
            </div>

            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}