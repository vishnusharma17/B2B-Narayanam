"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products/featured")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="py-24 px-6 md:px-10 bg-[#F9F6F1]">

      {/* Heading */}
      <div className="text-center mb-16">
        <p className="tracking-[6px] text-sm uppercase text-[#7A1E1E] mb-3 font-medium">
          Premium Collection
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold text-[#111]">
          Featured Collection
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-8">
          Explore our premium ethnic collections designed
          for boutiques, wholesalers and fashion retailers.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-500 hover:-translate-y-1"
          >
            {/* Product Image */}
            <div className="overflow-hidden relative">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-[280px] md:h-[320px] lg:h-[340px] object-cover hover:scale-105 transition duration-700"
              />

              {/* Badge */}
              <span className="absolute top-3 left-3 bg-[#D4AF37] text-black px-3 py-1 rounded-full text-xs font-semibold">
                Best Seller
              </span>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg md:text-xl font-semibold text-[#111] line-clamp-1">
                {product.name}
              </h3>

              <p className="mt-2 text-gray-600">
                ₹{product.price_min} - ₹{product.price_max}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                MOQ: {product.moq} pieces
              </p>

              <Link href={`/product/${product.slug}`}>
                <button className="mt-4 w-full bg-[#7A1E1E] text-white py-2 rounded-full hover:bg-black transition duration-300 text-sm">
                  View Product
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      <div className="text-center mt-14">
        <Link href="/products">
          <button className="border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition duration-300">
            View Full Collection
          </button>
        </Link>
      </div>
    </section>
  );
}