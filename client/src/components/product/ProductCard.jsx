"use client";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import toast from "react-hot-toast";

import API from "../../lib/api";
 const optimizeImage = (url, width = 700) => {
  if (!url) return "";

  if (!url.includes("/upload/")) {
    return url;
  }

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width}/`
  );
};
function ProductCard({ product }) {
  
const image = optimizeImage(product.mainImage, 700);

  const displayPrice =
    product.price_min > 0
      ? product.price_min
      : product.price_max > 0
      ? product.price_max
      : null;




  // ALL IMAGES

  // AUTO SLIDER


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
  <img
  src={image}
  alt={product.name}
  loading="lazy"
  decoding="async"
  fetchPriority="low"
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

          {/* HOVER BUTTONS */}
          <div
  className="
    absolute
    top-20
    right-6
    flex
    flex-col
    gap-3
    z-30
    opacity-0
    translate-x-4
    group-hover:opacity-100
    group-hover:translate-x-0
    transition-all
    duration-500
  "
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
export default memo(ProductCard);