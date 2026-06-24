"use client";

import { Heart, ShoppingBag } from "lucide-react";

import { useEffect, useState } from "react";

import Link from "next/link";

import ProductCard from "../../components/product/ProductCard";

import API from "../../lib/api";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");

      if (!sessionId) {
        setLoading(false);

        return;
      }

      const res = await API.get(`/wishlist/${sessionId}`);

      setWishlistItems(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (id) => {
    try {
      await API.delete(`/wishlist/${id}`);

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div
        className="
          h-screen
          flex
          flex-col
          items-center
          justify-center
          bg-[#F9F6F1]
        "
      >
        <div
          className="
            w-14
            h-14
            border-4
            border-[#D4AF37]
            border-t-transparent
            rounded-full
            animate-spin
          "
        />

        <p className="mt-5 text-lg sm:text-2xl font-medium">
          Loading Wishlist...
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#F9F6F1]
        pt-24
        sm:pt-28
        pb-16
      "
    >
      {/* HEADER */}
      <section className="px-4 sm:px-6 md:px-10">
        <div
          className="
            max-w-7xl
            mx-auto
            text-center
            mb-10
            sm:mb-14
          "
        >
          <div className="flex justify-center mb-5">
            <div
              className="
                w-14
                h-14
                sm:w-16
                sm:h-16
                rounded-full
                bg-[#fff5db]
                flex
                items-center
                justify-center
                shadow-sm
              "
            >
              <Heart className="text-[#D4AF37]" size={28} fill="#D4AF37" />
            </div>
          </div>

          <p
            className="
              text-[#D4AF37]
              uppercase
              tracking-[4px]
              sm:tracking-[6px]
              text-[11px]
              sm:text-sm
              mb-3
            "
          >
            Saved Collection
          </p>

          <h1
            className="
              text-3xl
              sm:text-5xl
              lg:text-6xl
              font-light
              leading-tight
            "
          >
            Your Wishlist
          </h1>

          <p
            className="
              text-gray-500
              mt-4
              text-sm
              sm:text-base
              max-w-2xl
              mx-auto
              leading-7
            "
          >
            Save your favorite styles and discover premium ethnic collections
            anytime.
          </p>
        </div>

        {/* EMPTY STATE */}
        {wishlistItems.length === 0 ? (
          <div
            className="
              max-w-3xl
              mx-auto
              bg-white
              rounded-[30px]
              sm:rounded-[40px]
              px-6
              sm:px-10
              py-14
              sm:py-20
              text-center
              shadow-sm
            "
          >
            <div
              className="
                w-20
                h-20
                sm:w-24
                sm:h-24
                rounded-full
                bg-[#fff5db]
                flex
                items-center
                justify-center
                mx-auto
                mb-6
              "
            >
              <ShoppingBag size={40} className="text-[#D4AF37]" />
            </div>

            <h2
              className="
                text-2xl
                sm:text-4xl
                font-light
              "
            >
              Wishlist Empty
            </h2>

            <p
              className="
                text-gray-500
                mt-4
                text-sm
                sm:text-base
                leading-7
                max-w-md
                mx-auto
              "
            >
              Save your favorite products here and build your perfect
              collection.
            </p>

            <Link href="/products">
              <button
                className="
                  mt-8
                  bg-black
                  text-white
                  px-8
                  sm:px-10
                  py-3.5
                  sm:py-4
                  rounded-full
                  hover:opacity-90
                  transition
                  text-sm
                  sm:text-base
                  w-full
                  sm:w-auto
                "
              >
                Explore Products
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* COUNT */}
            <div
              className="
                max-w-7xl
                mx-auto
                mb-6
                sm:mb-8
                flex
                justify-between
                items-center
                gap-4
                flex-wrap
              "
            >
              <p
                className="
                  text-sm
                  sm:text-base
                  text-gray-600
                "
              >
                {wishlistItems.length} Saved Products
              </p>

              <Link href="/products">
                <button
                  className="
                    border
                    border-black
                    px-5
                    sm:px-6
                    py-2.5
                    rounded-full
                    hover:bg-black
                    hover:text-white
                    transition
                    text-sm
                  "
                >
                  Continue Shopping
                </button>
              </Link>
            </div>

            {/* GRID */}
            <div
              className="
                max-w-7xl
                mx-auto
                grid
                grid-cols-2
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                gap-4
                sm:gap-6
              "
            >
              {wishlistItems
                .filter((item) => item?.productId)
                .map((item) => (
                  <div key={item._id} className="relative group">
                    <ProductCard product={item.productId} />

                    <button
                      onClick={() => removeWishlist(item._id)}
                      className="
    absolute
    top-3
    right-3
    z-50
    w-9
    h-9
    rounded-full
    bg-red-500
    hover:bg-black-600
    text-white
    flex
    items-center
    justify-center
    shadow-lg
    transition-all
  "
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
