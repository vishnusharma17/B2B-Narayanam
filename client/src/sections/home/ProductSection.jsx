"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function ProductSection() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {
      try {
        const res =
          await API.get(
            "/products/featured"
          );

        setProducts(
          res.data.data || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      console.log("Products =>", res.data.data[0]);
    };

  if (loading) {
    return (
      <section className="py-24 px-4 md:px-10 bg-[#F9F6F1] text-center">
        <h2 className="text-2xl font-semibold">
          Loading Products...
        </h2>
      </section>
    );
  }

  if (
    products.length === 0
  ) {
    return null;
  }

  return (
    <section className="py-20 sm:py-24 px-4 md:px-10 bg-[#F9F6F1]">
      
      {/* Heading */}
      <div className="text-center mb-14 sm:mb-16">
        
        <p
          className="
            tracking-[4px]
            sm:tracking-[6px]
            text-xs
            sm:text-sm
            uppercase
            text-[#7A1E1E]
            mb-3
            font-medium
          "
        >
          Premium Collection
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#111]">
          Featured Collection
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-7 sm:leading-8 text-sm sm:text-base">
          Explore our premium
          ethnic collections
          designed for
          boutiques,
          wholesalers and
          fashion retailers.
        </p>
      </div>

      {/* Product Grid */}
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-5
          sm:gap-6
        "
      >
        {products.map(
          (product) => (
            <div
              key={
                product._id
              }
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-md
                hover:shadow-2xl
                transition-all
                duration-500
                hover:-translate-y-2
                group
              "
            >
              {/* Product Image */}
            <div
  className="
    relative
    bg-[#f5f5f5]
    overflow-hidden
    h-[260px]
    sm:h-[320px]
  "
>
  <Swiper
    modules={[Pagination, Autoplay]}
    pagination={{ clickable: true }}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    loop={true}
    className="w-full h-full"
  >
    {[product.mainImage, ...(product.galleryImages || [])]
      .filter(Boolean)
      .map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={product.name}
            className="
              w-full
              h-full
              object-contain
              p-4
              transition-transform
              duration-700
              group-hover:scale-[1.03]
            "
          />
        </SwiperSlide>
      ))}
  </Swiper>

  {(product.isBestSeller || product.isTrending) && (
    <span
      className="
        absolute
        top-3
        left-3
        z-10
        bg-[#D4AF37]
        text-black
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
      "
    >
      {product.isBestSeller ? "Best Seller" : "Trending"}
    </span>
  )}
</div>

              {/* Product Info */}
              <div className="p-4 sm:p-5">
                
                <h3
                  className="
                    text-lg
                    sm:text-xl
                    font-semibold
                    text-[#111]
                    line-clamp-1
                  "
                >
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  
                  <p className="text-lg font-semibold text-black">
                    ₹
                    {
                      product.price_min
                    }
                  </p>

                  {product.original_price && (
                    <p className="text-sm text-gray-400 line-through">
                      ₹
                      {
                        product.original_price
                      }
                    </p>
                  )}
                </div>

                {/* MOQ */}
                <p className="mt-2 text-sm text-gray-500">
                  MOQ:{" "}
                  {
                    product.moq
                  }{" "}
                  pieces
                </p>

                {/* Stock */}
                <p className="mt-1 text-sm">
                  {product.stock >
                  0 ? (
                    <span className="text-green-600">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-500">
                      Out of Stock
                    </span>
                  )}
                </p>

                {/* Button */}
                <Link
                  href={`/product/${product.slug}`}
                >
                  <button
                    className="
                      mt-5
                      w-full
                      bg-[#7A1E1E]
                      text-white
                      py-3
                      rounded-full
                      hover:bg-black
                      transition
                      duration-300
                      text-sm
                      sm:text-base
                    "
                  >
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          )
        )}
      </div>

      {/* View All */}
      <div className="text-center mt-12 sm:mt-14">
        
        <Link href="/products">
          <button
            className="
              border
              border-black
              px-8
              py-3
              rounded-full
              hover:bg-black
              hover:text-white
              transition
              duration-300
            "
          >
            View Full
            Collection
          </button>
        </Link>
      </div>
    </section>
  );
}