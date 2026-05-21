"use client";

import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../lib/api";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const displayPrice =
    product.price_min > 0
      ? product.price_min
      : product.price_max > 0
      ? product.price_max
      : null;

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      let sessionId =
        localStorage.getItem("sessionId");

      if (!sessionId) {
        sessionId = Math.random()
          .toString(36)
          .substring(2);

        localStorage.setItem(
          "sessionId",
          sessionId
        );
      }

      await API.post("/wishlist", {
        productId: product._id,
        sessionId,
      });

      toast.success(
        "Added to wishlist"
      );
    } catch (error) {
      console.log(error);
      toast.error(
        "Wishlist failed"
      );
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      let sessionId =
        localStorage.getItem("sessionId");

      if (!sessionId) {
        sessionId = Math.random()
          .toString(36)
          .substring(2);

        localStorage.setItem(
          "sessionId",
          sessionId
        );
      }

      await API.post("/cart", {
        productId: product._id,
        quantity: 1,
        sessionId,
      });

      toast.success(
        "Added to cart"
      );
    } catch (error) {
      console.log(error);
      toast.error(
        "Cart failed"
      );
    }
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div
        className="
          group 
          bg-white 
          rounded-xl 
          overflow-hidden 
          transition-all 
          duration-300 
          hover:shadow-xl
          h-full
          flex
          flex-col
        "
        onMouseEnter={() =>
          setHovered(true)
        }
        onMouseLeave={() =>
          setHovered(false)
        }
      >
        {/* Product Image */}
        <div className="relative overflow-hidden bg-white">
          <img
            src={
              product.mainImage ||
              "/placeholder-product.jpg"
            }
            alt={product.name}
            className="
              w-full
              h-[220px]
              sm:h-[280px]
              md:h-[320px]
              lg:h-[360px]
              xl:h-[420px]
              object-contain
              p-2
              group-hover:scale-105
              transition
              duration-500
            "
          />

          {/* Discount Badge */}
          {product.discount_percentage >
            0 && (
            <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full font-medium z-10">
              {
                product.discount_percentage
              }
              % OFF
            </div>
          )}

          {/* Hover Buttons */}
          <div
            className={`
              absolute bottom-4 left-1/2 -translate-x-1/2 
              flex gap-3 transition-all duration-300
              
              md:${
                hovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }

              opacity-100 md:opacity-${
                hovered
                  ? "100"
                  : "0"
              }
            `}
          >
            <button
              onClick={
                handleWishlist
              }
              className="
                bg-white 
                w-10 h-10 
                sm:w-11 sm:h-11
                rounded-full 
                flex 
                items-center 
                justify-center 
                shadow-md 
                hover:bg-black 
                hover:text-white 
                transition
              "
            >
              <Heart size={18} />
            </button>

            <button
              onClick={
                handleAddToCart
              }
              className="
                bg-black 
                text-white 
                w-10 h-10 
                sm:w-11 sm:h-11
                rounded-full 
                flex 
                items-center 
                justify-center 
                shadow-md 
                hover:bg-white 
                hover:text-black 
                transition
              "
            >
              <ShoppingBag
                size={18}
              />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
          <p className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-gray-500 uppercase mb-2">
            Narayanam
          </p>

          <h3
            className="
              text-sm
              sm:text-base
              font-medium
              text-black
              line-clamp-2
              min-h-[44px]
              sm:min-h-[48px]
              leading-5
              sm:leading-6
            "
          >
            {product.name}
          </h3>

          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {displayPrice ? (
              <>
                <span className="text-base sm:text-lg font-semibold text-black">
                  ₹
                  {
                    displayPrice
                  }
                </span>

                {product.original_price >
                  displayPrice && (
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    ₹
                    {
                      product.original_price
                    }
                  </span>
                )}
              </>
            ) : (
              <span className="text-gray-400 text-sm">
                Price on request
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}