"use client";

import { useEffect, useState } from "react";
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

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F1] px-6 md:px-10 py-14">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-[#D4AF37] uppercase tracking-[6px] text-sm mb-4">
          Saved Collection
        </p>

        <h1 className="text-5xl font-bold">Your Wishlist</h1>
      </div>

      {/* Empty State */}
      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl">
          <h2 className="text-3xl font-bold">Wishlist Empty</h2>

          <p className="text-gray-500 mt-4">
            Save your favorite products here.
          </p>
        </div>
      ) : (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {wishlistItems.map((item) => (
            <div key={item._id} className="relative">
              <ProductCard product={item.productId} />

              <button
                onClick={() => removeWishlist(item._id)}
                className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
