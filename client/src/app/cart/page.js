"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../lib/api";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");

      if (!sessionId) {
        setLoading(false);
        return;
      }

      const res = await API.get(`/cart/${sessionId}`);

      setCartItems(res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartId, currentQty, type) => {
    try {
      const newQty =
        type === "inc" ? currentQty + 1 : currentQty > 1 ? currentQty - 1 : 1;

      await API.put(`/cart/${cartId}`, {
        quantity: newQty,
      });

      fetchCartItems();
    } catch (error) {
      toast.error("Quantity update failed");
    }
  };

  const removeItem = async (cartId) => {
    try {
      await API.delete(`/cart/${cartId}`);

      toast.success("Item removed");

      fetchCartItems();
    } catch (error) {
      toast.error("Remove failed");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.product?.price_min || 0);

    return acc + price * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl sm:text-2xl">
        Loading Cart...
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl sm:text-3xl text-center px-4">
        Your Cart is Empty
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-[90px] sm:pt-[120px] px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 sm:mb-10">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-10">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="
                    bg-white
                    p-4
                    sm:p-6
                    rounded-3xl
                    shadow-sm
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                    sm:gap-6
                  "
              >
                {/* Product Image */}
                <img
                  src={item.product?.mainImage || "/placeholder-product.jpg"}
                  className="
                      w-full
                      sm:w-32
                      h-[220px]
                      sm:h-32
                      object-contain
                      bg-white
                      rounded-2xl
                      p-2
                    "
                  alt={item.product?.name}
                />

                {/* Product Info */}
                <div className="flex-1">
                  <h2 className="text-lg sm:text-2xl font-medium">
                    {item.product?.name}
                  </h2>

                  <p className="text-lg sm:text-xl font-semibold mt-2">
                    ₹{item.product?.price_min}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 sm:gap-4 mt-4">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity, "dec")
                      }
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex justify-center items-center"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-medium">{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity, "inc")
                      }
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex justify-center items-center"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="self-start sm:self-center"
                >
                  <Trash2 className="text-red-500" />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div
            className="
              bg-white
              p-6
              sm:p-8
              rounded-3xl
              shadow-md
              h-fit
              lg:sticky
              lg:top-28
            "
          >
            <h2 className="text-2xl sm:text-3xl mb-6">Order Summary</h2>

            <div className="flex justify-between mb-4 text-sm sm:text-base">
              <span>Subtotal</span>

              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-4 text-sm sm:text-base">
              <span>Shipping</span>

              <span>Free</span>
            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-xl sm:text-2xl font-bold">
              <span>Total</span>

              <span>₹{subtotal}</span>
            </div>

            <Link href="/checkout?type=cart">
              <button className="w-full mt-6 sm:mt-8 bg-black text-white py-3 sm:py-4 rounded-full hover:opacity-90 transition">
                Proceed To Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
