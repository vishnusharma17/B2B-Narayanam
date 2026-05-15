"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function ProductCard({ product }) {
  const [currentImage, setCurrentImage] =
    useState(0);

  const [hovered, setHovered] =
    useState(false);

  useEffect(() => {
    let interval;

    if (
      hovered &&
      product.images?.length > 1
    ) {
      interval = setInterval(() => {
        setCurrentImage(
          (prev) =>
            (prev + 1) %
            product.images.length
        );
      }, 1500);
    }

    return () =>
      clearInterval(interval);
  }, [hovered, product.images]);

  const handleWishlist =
    async (e) => {
      e.preventDefault(); // stop link redirect
      e.stopPropagation();

      try {
        let sessionId =
          localStorage.getItem(
            "sessionId"
          );

        if (!sessionId) {
          sessionId = Math.random()
            .toString(36)
            .substring(2);

          localStorage.setItem(
            "sessionId",
            sessionId
          );
        }

        await API.post(
          "/wishlist",
          {
            productId:
              product._id,
            sessionId,
          }
        );

        alert(
          "Added to wishlist"
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Link
      href={`/product/${product.slug}`}
    >
      <div
        className="group cursor-pointer bg-white"
        onMouseEnter={() =>
          setHovered(true)
        }
        onMouseLeave={() => {
          setHovered(false);
          setCurrentImage(0);
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={
              product.images?.[
                currentImage
              ]
            }
            alt={product.name}
            className="w-full h-[280px] object-cover transition duration-500"
          />

          {/* Wishlist Button */}
          {hovered && (
            <button
              onClick={
                handleWishlist
              }
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] bg-white py-3 text-center font-semibold shadow-lg rounded-md hover:bg-black hover:text-white transition"
            >
              ♡ WISHLIST
            </button>
          )}

          {/* Image Dots */}
          {product.images?.length >
            1 && (
            <div className="absolute bottom-2 w-full flex justify-center gap-2">
              {product.images.map(
                (
                  _,
                  index
                ) => (
                  <div
                    key={
                      index
                    }
                    className={`w-2 h-2 rounded-full ${
                      currentImage ===
                      index
                        ? "bg-pink-500"
                        : "bg-gray-300"
                    }`}
                  />
                )
              )}
            </div>
          )}

          {/* Discount Badge */}
          {product.discount_percentage && (
            <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded">
              {
                product.discount_percentage
              }
              % OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="pt-3">
          <h3 className="font-bold uppercase text-sm">
            {product.brand ||
              "Narayanam"}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-1">
            {product.name}
          </p>

          {product.sizes
            ?.length > 0 && (
            <p className="text-gray-500 text-sm mt-1">
              Sizes:{" "}
              {product.sizes.join(
                ", "
              )}
            </p>
          )}

          <div className="mt-2 flex flex-wrap gap-2 items-center">
            <span className="font-bold text-lg">
              ₹
              {
                product.price_min
              }
            </span>

            {product.original_price && (
              <span className="line-through text-gray-400 text-sm">
                ₹
                {
                  product.original_price
                }
              </span>
            )}

            {product.discount_percentage && (
              <span className="text-orange-500 text-sm">
                (
                {
                  product.discount_percentage
                }
                % OFF)
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}