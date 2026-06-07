"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/featured");
      setProducts(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (products.length === 0) {
    return null;
  }
  const optimizeImage = (url) => {
  if (!url) return "";

  return url.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_800/"
  );
};

  return (
    <section className="py-16 sm:py-24 px-3 sm:px-6 md:px-10 bg-[#F9F6F1]">
      
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-16">
        <p className="tracking-[3px] sm:tracking-[6px] text-[10px] sm:text-sm uppercase text-[#7A1E1E] mb-2 font-semibold">
          Premium Collection
        </p>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#111] tracking-tight">
          Featured Collection
        </h2>

        <p className="mt-3 text-gray-600 max-w-2xl mx-auto leading-relaxed text-xs sm:text-base px-2">
          Explore our premium ethnic collections designed for boutiques, wholesalers and fashion retailers.
        </p>
      </div>

      {/* Product Grid - Optimized for Mobile (2 Columns with smaller gap) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-gray-100 group"
          >
            {/* Product Image Container */}
            <div className="relative bg-[#fcfcfc] overflow-hidden aspect-[3/4] w-full">
             <img
  src={optimizeImage(product.mainImage)}
  alt={product.name}
  loading="lazy"
  className="
    w-full
    h-full
    object-cover
    transition-transform
    duration-700
    group-hover:scale-105
  "
/>

              {/* Tag/Badge */}
              {(product.isBestSeller || product.isTrending) && (
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-[#D4AF37] text-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-full text-[9px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">
                  {product.isBestSeller ? "Best Seller" : "Trending"}
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3 sm:p-5 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-sm sm:text-lg font-medium sm:font-semibold text-[#111] line-clamp-1 group-hover:text-[#7A1E1E] transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Price Matrix */}
                <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                  <p className="text-base sm:text-xl font-bold text-black">
                    ₹{product.price_min}
                  </p>
                  {product.original_price && (
                    <p className="text-[11px] sm:text-sm text-gray-400 line-through font-light">
                      ₹{product.original_price}
                    </p>
                  )}
                </div>

                {/* Meta details wrapper for modern neat look */}
                <div className="mt-2 pt-2 border-t border-gray-50 space-y-0.5 text-[11px] sm:text-sm">
                  <p className="text-gray-500 flex justify-between">
                    <span>MOQ:</span>
                    <span className="font-medium text-gray-800">{product.moq} pcs</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Status:</span>
                    {product.stock > 0 ? (
                      <span className="text-green-600 font-medium">In Stock</span>
                    ) : (
                      <span className="text-red-500 font-medium">Out of Stock</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <Link href={`/product/${product.slug}`} className="block mt-4">
                <button className="w-full bg-[#7A1E1E] hover:bg-black text-white py-2.5 sm:py-3 rounded-xl sm:rounded-full transition duration-300 text-xs sm:text-sm font-medium tracking-wide active:scale-[0.98] transform">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-10 sm:mt-14">
        <Link href="/products">
          <button className="border border-black text-black px-8 py-2.5 sm:py-3 rounded-full hover:bg-black hover:text-white transition duration-300 text-sm font-medium tracking-wide">
            View Full Collection
          </button>
        </Link>
      </div>

      {/* Global override stylesheet to style Swiper bullets beautifully on mobile */}
      <style jsx global>{`
        .custom-product-swiper .swiper-pagination-bullet {
          width: 5px;
          height: 5px;
          background: #000;
          opacity: 0.2;
        }
        .custom-product-swiper .swiper-pagination-bullet-active {
          background: #7A1E1E;
          opacity: 1;
          width: 14px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        @media (min-width: 640px) {
          .custom-product-swiper .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
          }
          .custom-product-swiper .swiper-pagination-bullet-active {
            width: 18px;
          }
        }
      `}</style>
    </section>
  );
}