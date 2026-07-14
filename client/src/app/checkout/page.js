"use client";

import { CheckCircle, CreditCard, MapPin, Truck } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";

import { Suspense, useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../lib/api";

// =========================
// LOAD RAZORPAY ONLY WHEN NEEDED
// =========================

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // Razorpay already loaded
    if (window.Razorpay) {
      resolve(true);

      return;
    }

    // Prevent duplicate scripts
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.onload = () => {
        resolve(true);
      };

      existingScript.onerror = () => {
        resolve(false);
      };

      return;
    }

    // Create Razorpay script
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

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

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    const user = localStorage.getItem("userData");

    if (!user) {
      router.push("/login");

      return;
    }

    localStorage.removeItem("lastPaymentId");

    // LOCAL STORAGE ADDRESS

    const localAddresses =
      JSON.parse(localStorage.getItem("userAddresses")) || [];

    if (localAddresses.length > 0) {
      setAddresses(localAddresses);

      setSelectedAddress(localAddresses[0]);
    }

    fetchProducts();

    fetchAddresses();
  }, []);

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      const productId = searchParams.get("productId");

      const quantityParam = Number(searchParams.get("quantity")) || 1;

      // CART PRODUCTS

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

      // SINGLE PRODUCT
      else if (productId) {
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

  // =========================
  // FETCH ADDRESSES
  // =========================

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("userToken");

      if (!token) return;

      const res = await API.get("/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedAddresses = res.data.data || [];

      if (fetchedAddresses.length > 0) {
        setAddresses(fetchedAddresses);

        setSelectedAddress(fetchedAddresses[0]);

        localStorage.setItem(
          "userAddresses",

          JSON.stringify(fetchedAddresses)
        );
      }
    } catch (error) {
      console.log("ADDRESS ERROR:", error);
    }
  };

  // =========================
  // TOTAL AMOUNT
  // =========================

  const totalAmount = products.reduce(
    (acc, item) => acc + item.price * item.quantity,

    0
  );

  // =========================
  // PLACE ORDER
  // =========================

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

          color: item.color || "",

          colorImage: item.colorImage || "",
        })),

        totalAmount: Number(totalAmount),

        paymentMethod,
      };

      // =========================
      // COD ORDER
      // =========================

      if (paymentMethod === "COD") {
        await API.post("/orders", payload);

        toast.success("Order placed successfully");

        router.push("/order-success");

        return;
      }

      // =========================
      // ONLINE PAYMENT
      // =========================

      if (paymentMethod === "Online Payment") {
        // Load Razorpay only
        // when payment is required

        const razorpayLoaded = await loadRazorpayScript();

        if (!razorpayLoaded) {
          toast.error("Payment service load nahi ho payi. Please try again.");

          return;
        }

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

              await API.post(
                "/orders",

                finalPayload
              );

              toast.success("Payment successful & order placed");

              router.push("/order-success");
            } catch (error) {
              console.log(error);

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
      console.log("CHECKOUT ERROR:", error);

      console.log("RESPONSE", error.response?.data);

      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-[120px] px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-light mb-10">
          Secure Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}

          <div className="lg:col-span-2 space-y-8">
            {/* ADDRESS */}

            <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-md">
              <h2 className="text-2xl mb-6 flex items-center gap-2">
                <MapPin />
                Select Address
              </h2>

              {addresses.length === 0 ? (
                <button
                  type="button"
                  onClick={() => router.push("/profile/address")}
                  className="bg-black text-white px-6 py-3 rounded-xl"
                >
                  Add Address
                </button>
              ) : (
                <div className="grid gap-4">
                  {addresses.map((address, index) => (
                    <div
                      key={address._id}
                      onClick={() => setSelectedAddress(address)}
                      className={`p-5 rounded-2xl border cursor-pointer transition ${
                        selectedAddress?._id === address._id
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
                        <span className="text-green-600 text-sm flex items-center gap-1 mt-2">
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

            <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-md">
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

          <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-md h-fit">
            <h2 className="text-2xl mb-6">Order Summary</h2>

            {products.map((item) => (
              <div key={item._id} className="flex justify-between mb-4 gap-4">
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

// =========================
// SUSPENSE WRAPPER
// =========================

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
