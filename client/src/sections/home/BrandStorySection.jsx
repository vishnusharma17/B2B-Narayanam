"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import API from "../../lib/api";

export default function BestSellerSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const res = await API.get("/products");

      const allProducts = res.data.data || [];

      // Top selling logic
      const bestSellers = allProducts
        .filter((item) => item.stock > 0)
        .sort(
          (a, b) =>
            Number(b.soldCount || 0) -
            Number(a.soldCount || 0)
        )
        .slice(0, 8);

      setProducts(bestSellers);
    } catch (error) {
      console.log(error);
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="py-20 px-4 md:px-10 bg-white">
      <div className="text-center mb-12">
        <p className="text-[#C9A227] tracking-[5px] uppercase text-sm mb-3">
          Most Loved
        </p>

        <h2 className="text-4xl md:text-5xl font-bold">
          Best Sellers
        </h2>

        <p className="text-gray-500 mt-4">
          Our most purchased premium collections
        </p>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
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