"use client";

import { CheckCircle, CreditCard, MapPin, Truck } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import API from "../../lib/api";

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const type = searchParams.get("type");

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    fetchProducts();
    fetchAddresses();

    localStorage.removeItem("lastPaymentId");
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const productId = searchParams.get("productId");

      const quantityParam = Number(searchParams.get("quantity")) || 1;

      // CART FLOW
      if (type === "cart") {
        const sessionId = localStorage.getItem("sessionId");

        if (!sessionId) return;

        const res = await API.get(`/cart/${sessionId}`);

        const formattedProducts = (res.data.data || []).map((item) => ({
          _id: item.product?._id,
          name: item.product?.name,
          price: item.product?.price_min || 0,
          quantity: item.quantity,
          size: item.size || "",
        }));

        setProducts(formattedProducts);
      }

      // DIRECT BUY NOW FLOW
      else if (productId) {
        const res = await API.get("/products");

        const product = (res.data.data || []).find(
          (item) => item._id === productId,
        );

        if (product) {
          setProducts([
            {
              _id: product._id,
              name: product.name,
              price: product.price_min,
              quantity: quantityParam,
              size: "",
            },
          ]);
        }
      }

      // OLD BUY NOW FLOW
      else if (type === "buyNow") {
        const buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct"));

        if (buyNowProduct) {
          setProducts([
            {
              ...buyNowProduct,
              price: Number(buyNowProduct.price),
            },
          ]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH ADDRESSES
  const fetchAddresses = () => {
    const savedAddresses =
      JSON.parse(localStorage.getItem("userAddresses")) || [];

    setAddresses(savedAddresses);

    if (savedAddresses.length > 0) {
      setSelectedAddress(savedAddresses[0]);
    }
  };

  // TOTAL
  const totalAmount = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // PLACE ORDER
  const placeOrder = async () => {
    if (!selectedAddress) {
      return toast.error("Please select address");
    }

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("userData"));

      const payload = {
        customerName: user.name,
        email: user.email,
        phone: selectedAddress.phone,

        address: `
${selectedAddress.house},
${selectedAddress.landmark},
${selectedAddress.city},
${selectedAddress.state},
${selectedAddress.pincode}
            `,

        products: products.map((item) => ({
          productId: item._id,
          quantity: Number(item.quantity) || 1,
          size: item.size || "",
        })),

        totalAmount: Number(totalAmount),

        paymentMethod,
      };

      // COD
      if (paymentMethod === "COD") {
        await API.post("/orders", payload);

        toast.success("Order placed successfully");

        router.push("/my-orders");

        return;
      }

      // ONLINE PAYMENT
      if (paymentMethod === "Online Payment") {
        const res = await API.post("/payment/create-order", {
          amount: totalAmount,
        });

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,

          amount: res.data.data.amount,

          currency: res.data.data.currency,

          name: "Narayanam",

          description: "Order Payment",

          order_id: res.data.data.id,

          handler: async function (response) {
            try {
              const finalPayload = {
                ...payload,
                paymentStatus: "paid",
                paymentId: response.razorpay_payment_id,
              };

              await API.post("/orders", finalPayload);

              toast.success("Payment successful & order placed");

              router.push("/my-orders");
            } catch (error) {
              toast.error("Order save failed");
            }
          },

          prefill: {
            name: user.name,
            email: user.email,
            contact: selectedAddress.phone,
          },

          theme: {
            color: "#000000",
          },
        };

        const razorpay = new window.Razorpay(options);

        razorpay.open();
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-[120px] px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-light mb-10">Secure Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* ADDRESS */}
            <div className="bg-white p-8 rounded-3xl shadow-md">
              <h2 className="text-2xl mb-6 flex items-center gap-2">
                <MapPin />
                Select Address
              </h2>

              {addresses.length === 0 ? (
                <button
                  onClick={() => router.push("/profile/address")}
                  className="bg-black text-white px-6 py-3 rounded-xl"
                >
                  Add Address
                </button>
              ) : (
                <div className="grid gap-4">
                  {addresses.map((address, index) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddress(address)}
                      className={`p-5 rounded-2xl border cursor-pointer ${
                        selectedAddress?.id === address.id
                          ? "border-black bg-[#F8F3EC]"
                          : "border-gray-200"
                      }`}
                    >
                      <h3 className="font-semibold">{address.fullName}</h3>

                      <p className="text-gray-600 mt-2">
                        {address.house}, {address.city}
                      </p>

                      <p>{address.phone}</p>

                      {index === 0 && (
                        <span className="text-green-600 text-sm flex items-center gap-1">
                          <CheckCircle size={16} />
                          Default
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PAYMENT */}
            <div className="bg-white p-8 rounded-3xl shadow-md">
              <h2 className="text-2xl mb-6 flex items-center gap-2">
                <CreditCard />
                Payment Method
              </h2>

              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border p-4 rounded-xl"
              >
                <option value="COD">Cash On Delivery</option>
                <option value="Online Payment">Online Payment</option>
              </select>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-8 rounded-3xl shadow-md h-fit">
            <h2 className="text-2xl mb-6">Order Summary</h2>

            {products.map((item) => (
              <div key={item._id} className="flex justify-between mb-4">
                <span>
                  {item.name} x {item.quantity}
                </span>

                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <hr className="my-5" />

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
              <Truck size={16} />
              Delivery in 3-5 Days
            </div>

            <button
              onClick={placeOrder}
              disabled={loading}
              className="w-full mt-8 bg-black text-white py-4 rounded-full"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
