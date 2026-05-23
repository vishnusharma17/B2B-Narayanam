"use client";

import { Heart, ShoppingBag } from "lucide-react";

import Link from "next/link";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../lib/api";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const [currentImage, setCurrentImage] = useState(0);

  const displayPrice =
    product.price_min > 0
      ? product.price_min
      : product.price_max > 0
      ? product.price_max
      : null;

  // ALL IMAGES
  const images = [
    product.mainImage,
    ...(product.galleryImages || []),
  ].filter(Boolean);

  // AUTO SLIDER
  useEffect(() => {
    if (!hovered) {
      setCurrentImage(0);
      return;
    }

    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === images.length - 1 ? 0 : prev + 1,
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [hovered, images.length]);

  // WISHLIST
  const handleWishlist = async (e) => {
    e.preventDefault();

    e.stopPropagation();

    try {
      let sessionId = localStorage.getItem("sessionId");

      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2);

        localStorage.setItem("sessionId", sessionId);
      }

      await API.post("/wishlist", {
        productId: product._id,
        sessionId,
      });

      toast.success("Added to wishlist");
    } catch (error) {
      console.log(error);

      toast.error("Wishlist failed");
    }
  };

  // ADD TO CART
  const handleAddToCart = async (e) => {
    e.preventDefault();

    e.stopPropagation();

    try {
      let sessionId = localStorage.getItem("sessionId");

      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2);

        localStorage.setItem("sessionId", sessionId);
      }

      await API.post("/cart", {
        productId: product._id,
        quantity: 1,
        sessionId,
      });

      toast.success("Added to cart");
    } catch (error) {
      console.log(error);

      toast.error("Cart failed");
    }
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div
        className="
          group
          bg-white
          rounded-3xl
          overflow-hidden
          transition-all
          duration-500
          hover:shadow-2xl
          hover:-translate-y-1
          h-full
          flex
          flex-col
          border
          border-[#f1ece4]
        "
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* IMAGE SECTION */}
        <div className="relative bg-[#faf7f2] overflow-hidden">
          {/* IMAGE SLIDER */}
          <div
            className="
              relative
              w-full
              h-[260px]
              sm:h-[320px]
              md:h-[360px]
              lg:h-[400px]
              xl:h-[430px]
              overflow-hidden
            "
          >
            <div
              className="
                flex
                h-full
                transition-transform
                duration-700
                ease-in-out
              "
              style={{
                width: `${images.length * 100}%`,
                transform: `translateX(-${
                  currentImage * (100 / images.length)
                }%)`,
              }}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className="h-full flex-shrink-0"
                  style={{
                    width: `${100 / images.length}%`,
                  }}
                >
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
                </div>
              ))}
            </div>
          </div>

          {/* DISCOUNT */}
          {product.discount_percentage > 0 && (
            <div
              className="
                absolute
                top-4
                left-4
                bg-black
                text-white
                text-[11px]
                px-3
                py-1.5
                rounded-full
                font-medium
                z-20
              "
            >
              {product.discount_percentage}% OFF
            </div>
          )}

          {/* SLIDER DOTS */}
          {images.length > 1 && (
            <div
              className="
                absolute
                bottom-4
                left-1/2
                -translate-x-1/2
                flex
                gap-2
                z-20
              "
            >
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentImage === index
                      ? "w-6 bg-black"
                      : "w-2 bg-black/30"
                  }`}
                />
              ))}
            </div>
          )}

          {/* HOVER BUTTONS */}
          <div
            className={`
              absolute
              top-20
              right-6
              flex
              flex-col
              gap-3
              z-30
              transition-all
              duration-500
              ${
                hovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }
            `}
          >
            {/* WISHLIST */}
            <button
              onClick={handleWishlist}
              className="
                bg-white
                text-black
                border
                border-gray-200
                w-11
                h-11
                rounded-full
                flex
                items-center
                justify-center
                shadow-xl
                hover:bg-black
                hover:text-white
                transition-all
                duration-300
              "
            >
              <Heart size={18} />
            </button>

            {/* CART */}
            <button
              onClick={handleAddToCart}
              className="
                bg-black
                text-white
                border
                border-black
                w-11
                h-11
                rounded-full
                flex
                items-center
                justify-center
                shadow-xl
                hover:bg-white
                hover:text-black
                transition-all
                duration-300
              "
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div
          className="
            p-4
            sm:p-5
            flex-1
            flex
            flex-col
            justify-between
          "
        >
          {/* BRAND */}
          <p
            className="
              text-[10px]
              sm:text-xs
              tracking-[3px]
              text-[#b68d40]
              uppercase
              mb-2
              font-medium
            "
          >
            Narayanam
          </p>

          {/* TITLE */}
          <h3
            className="
              text-sm
              sm:text-base
              font-medium
              text-black
              line-clamp-2
              min-h-[48px]
              leading-6
            "
          >
            {product.name}
          </h3>

          {/* PRICE */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {displayPrice ? (
              <>
                <span
                  className="
                    text-lg
                    sm:text-xl
                    font-semibold
                    text-black
                  "
                >
                  ₹{displayPrice}
                </span>

                {product.original_price > displayPrice && (
                  <span
                    className="
                      text-sm
                      text-gray-400
                      line-through
                    "
                  >
                    ₹{product.original_price}
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