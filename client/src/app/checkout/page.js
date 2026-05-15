"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "../../lib/api";

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const productId = searchParams.get("productId");

  const quantity = Number(searchParams.get("quantity")) || 1;

  const [product, setProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get("/products");

      const foundProduct = res.data.data.find((item) => item._id === productId);

      setProduct(foundProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = product ? product.price_min * quantity : 0;

  const handlePayment = async () => {
    try {
      if (
        !formData.name ||
        !formData.phone ||
        !formData.email ||
        !formData.address
      ) {
        alert("Please fill all details");
        return;
      }

      const res = await API.post("/payment/create-order", {
        amount: totalPrice,
      });

      const order = res.data.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,

        amount: order.amount,

        currency: order.currency,

        name: "Narayanam",

        description: "Luxury Order Payment",

        order_id: order.id,

        handler: async function (response) {
          try {
            // Save Order
            await API.post("/orders", {
              customerName: formData.name,
              phone: formData.phone,
              email: formData.email,
              address: formData.address,

              products: [
                {
                  productId: product._id,
                  quantity: quantity,
                },
              ],

              totalAmount: totalPrice,

              paymentId: response.razorpay_payment_id,

              paymentStatus: "paid",
            });

            router.push("/order-success");
          } catch (error) {
            console.log(error);
          }
        },

        theme: {
          color: "#7A1E1E",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading Checkout...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-[120px] px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* Left */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-light mb-8">Shipping Details</h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-4 rounded-xl"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border p-4 rounded-xl"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border p-4 rounded-xl"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            <textarea
              rows="4"
              placeholder="Delivery Address"
              className="w-full border p-4 rounded-xl"
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Right */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-light mb-8">Order Summary</h2>

          <img
            src={product.images[0]}
            className="w-full h-[350px] object-cover rounded-2xl"
          />

          <h3 className="text-2xl font-semibold mt-6">{product.name}</h3>

          <p className="text-gray-600 mt-3">Quantity: {quantity}</p>

          <p className="text-gray-600 mt-2">
            Price Per Item: ₹{product.price_min}
          </p>

          <div className="border-t mt-6 pt-6">
            <p className="text-3xl font-bold text-[#7A1E1E]">
              Total: ₹{totalPrice}
            </p>
          </div>

          <button
            onClick={handlePayment}
            className="w-full mt-8 bg-black hover:bg-[#7A1E1E] text-white py-4 rounded-full text-lg tracking-[2px] uppercase transition"
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
}
