"use client";

import { CreditCard, Edit, MapPin, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../lib/api";

// =========================
// LOAD RAZORPAY ONLY WHEN NEEDED
// =========================

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existingScript) {
      existingScript.onload = () => resolve(true);
      existingScript.onerror = () => resolve(false);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// =========================
// MAIN CONTENT
// =========================

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (!user) {
      router.push("/login");
      return;
    }
    localStorage.removeItem("lastPaymentId");
    const localAddresses =
      JSON.parse(localStorage.getItem("userAddresses")) || [];
    if (localAddresses.length > 0) {
      setAddresses(localAddresses);
      setSelectedAddress(localAddresses[0]);
    }
    fetchProducts();
    fetchAddresses();
  }, []);

  const fetchProducts = async () => {
    try {
      const productId = searchParams.get("productId");
      const quantityParam = Number(searchParams.get("quantity")) || 1;

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
      } else if (productId) {
        const res = await API.get("/products");
        const product = (res.data.data || []).find(
          (item) => item._id === productId
        );
        if (product) {
          setProducts([
            {
              _id: product._id,
              name: product.name,
              price: product.price_min,
              quantity: quantityParam,
              size: searchParams.get("size") || "",
              color: searchParams.get("color") || "",
              colorImage: decodeURIComponent(
                searchParams.get("colorImage") || product.mainImage
              ),
            },
          ]);
        }
      }
    } catch (error) {
      console.log("PRODUCT ERROR:", error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) return;
      const res = await API.get("/address", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedAddresses = res.data.data || [];
      if (fetchedAddresses.length > 0) {
        setAddresses(fetchedAddresses);
        setSelectedAddress(fetchedAddresses[0]);
        localStorage.setItem("userAddresses", JSON.stringify(fetchedAddresses));
      }
    } catch (error) {
      console.log("ADDRESS ERROR:", error);
    }
  };

  const totalAmount = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!selectedAddress) return toast.error("Please select address");
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("userData"));
      const payload = {
        customerName: user.name,
        email: user.email,
        phone: selectedAddress.phone,
        address: `${selectedAddress.house}, ${selectedAddress.landmark}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.pincode}`,
        products: products.map((item) => ({
          productId: item._id,
          quantity: Number(item.quantity) || 1,
          size: item.size || "",
          color: item.color || "",
          colorImage: item.colorImage || "",
        })),
        totalAmount: Number(totalAmount),
        paymentMethod,
      };

      if (paymentMethod === "COD") {
        await API.post("/orders", payload);
        toast.success("Order placed successfully");
        router.push("/order-success");
        return;
      }

      if (paymentMethod === "Online Payment") {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded)
          return toast.error("Payment service load nahi ho payi.");

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
              await API.post("/orders", {
                ...payload,
                paymentStatus: "paid",
                paymentId: response.razorpay_payment_id,
              });
              toast.success("Payment successful & order placed");
              router.push("/order-success");
            } catch (error) {
              toast.error("Order save failed");
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: selectedAddress.phone,
          },
          theme: { color: "#000000" },
        };
        new window.Razorpay(options).open();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-[120px] px-4 sm:px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-light mb-10">
          Secure Checkout
        </h1>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Address & Payment */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl flex items-center gap-2">
                  <MapPin className="text-black" /> Select Address
                </h2>
                <button
                  onClick={() => router.push("/profile/address")}
                  className="text-sm bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition flex items-center gap-1"
                >
                  <Plus size={16} /> Add New
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed rounded-2xl">
                  <p className="mb-4 text-gray-500">No address found.</p>
                  <button
                    onClick={() => router.push("/profile/address")}
                    className="bg-black text-white px-6 py-2 rounded-xl"
                  >
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {addresses.map((address) => (
                    <div
                      key={address._id}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition relative ${
                        selectedAddress?._id === address._id
                          ? "border-black bg-[#FDFBF9]"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {address.fullName}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {address.house}, {address.city}, {address.pincode}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/profile/address/edit/${
                                address._id
                              }?return=/checkout?${searchParams.toString()}`
                            );
                          }}
                          className="text-gray-400 hover:text-black"
                        >
                          <Edit size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl mb-6 flex items-center gap-2">
                <CreditCard /> Payment Method
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

          {/* RIGHT: Summary */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-28">
            <h2 className="text-2xl mb-6">Order Summary</h2>
            {products.map((item) => (
              <div
                key={item._id}
                className="flex justify-between mb-4 gap-4 text-sm"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
            <button
              type="button"
              onClick={placeOrder}
              disabled={loading || !selectedAddress}
              className={`w-full mt-8 py-4 rounded-full transition ${
                loading || !selectedAddress
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black text-white"
              }`}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-xl">
          Loading Checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
