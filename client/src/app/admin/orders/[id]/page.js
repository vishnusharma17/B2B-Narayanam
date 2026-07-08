"use client";

import {
  BadgeIndianRupee,
  CreditCard,
  ExternalLink,
  Mail,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
} from "lucide-react";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

import API from "../../../../lib/api";

export default function OrderDetailsPage() {
  const params = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  // =========================
  // FETCH ORDER
  // =========================

  const fetchOrder = async () => {
    try {
      const res = await API.get("/orders");

      const foundOrder = res.data.data.find((item) => item._id === params.id);

      setOrder(foundOrder);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          justify-center
          items-center
          bg-[#F8F3EC]
        "
      >
        <div className="text-center">
          <div
            className="
              w-14
              h-14
              border-4
              border-[#7A1E1E]
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
              mb-5
            "
          />

          <h2
            className="
              text-xl
              sm:text-2xl
              font-medium
            "
          >
            Loading Order...
          </h2>
        </div>
      </div>
    );
  }

  // =========================
  // NO ORDER
  // =========================

  if (!order) {
    return (
      <div
        className="
          min-h-screen
          flex
          justify-center
          items-center
          bg-[#F8F3EC]
          px-4
          text-center
        "
      >
        <h2
          className="
            text-xl
            sm:text-2xl
            font-medium
            text-red-500
          "
        >
          Order Not Found
        </h2>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#F8F3EC]
        p-4
        sm:p-6
        lg:p-8
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="mb-8 sm:mb-10">
          <p
            className="
              uppercase
              tracking-[4px]
              text-[#C9A227]
              text-[11px]
              sm:text-xs
              mb-2
            "
          >
            Order Overview
          </p>

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-light
              leading-tight
              break-words
            "
          >
            Order #{order._id.slice(-6)}
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              text-sm
              sm:text-base
            "
          >
            Complete order information and tracking details
          </p>
        </div>

        {/* TOP GRID */}
        <div
          className="
            grid
            lg:grid-cols-2
            gap-6
            sm:gap-8
          "
        >
          {/* CUSTOMER INFO */}
          <div
            className="
              bg-white
              p-5
              sm:p-8
              rounded-[28px]
              sm:rounded-[36px]
              shadow-sm
            "
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[#F8F3EC]
                  flex
                  items-center
                  justify-center
                  text-[#7A1E1E]
                "
              >
                <User size={22} />
              </div>

              <div>
                <p
                  className="
                    uppercase
                    tracking-[3px]
                    text-[#C9A227]
                    text-[10px]
                  "
                >
                  Customer Details
                </p>

                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  Customer Info
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              <div
                className="
                  bg-[#F8F3EC]
                  p-4
                  rounded-2xl
                "
              >
                <p className="text-gray-500 text-sm mb-1">Full Name</p>

                <h3 className="font-semibold text-lg break-words">
                  {order.customerName}
                </h3>
              </div>

              <div
                className="
                  bg-[#F8F3EC]
                  p-4
                  rounded-2xl
                  flex
                  items-start
                  gap-3
                "
              >
                <Phone size={18} className="mt-1 text-[#7A1E1E]" />

                <div>
                  <p className="text-gray-500 text-sm mb-1">Phone</p>

                  <h3 className="font-medium break-words">{order.phone}</h3>
                </div>
              </div>

              <div
                className="
                  bg-[#F8F3EC]
                  p-4
                  rounded-2xl
                  flex
                  items-start
                  gap-3
                "
              >
                <Mail size={18} className="mt-1 text-[#7A1E1E]" />

                <div>
                  <p className="text-gray-500 text-sm mb-1">Email</p>

                  <h3 className="font-medium break-all">{order.email}</h3>
                </div>
              </div>

              <div
                className="
                  bg-[#F8F3EC]
                  p-4
                  rounded-2xl
                  flex
                  items-start
                  gap-3
                "
              >
                <MapPin size={18} className="mt-1 text-[#7A1E1E]" />

                <div>
                  <p className="text-gray-500 text-sm mb-1">Address</p>

                  <h3 className="font-medium break-words leading-7">
                    {order.address}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT INFO */}
          <div
            className="
              bg-white
              p-5
              sm:p-8
              rounded-[28px]
              sm:rounded-[36px]
              shadow-sm
            "
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[#F8F3EC]
                  flex
                  items-center
                  justify-center
                  text-[#7A1E1E]
                "
              >
                <CreditCard size={22} />
              </div>

              <div>
                <p
                  className="
                    uppercase
                    tracking-[3px]
                    text-[#C9A227]
                    text-[10px]
                  "
                >
                  Transaction
                </p>

                <h2
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  Payment Info
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              <div
                className="
                  bg-[#7A1E1E]
                  text-white
                  p-5
                  rounded-3xl
                "
              >
                <p className="text-sm opacity-80 mb-2">Total Amount</p>

                <h2
                  className="
                    text-3xl
                    sm:text-4xl
                    font-bold
                  "
                >
                  ₹{order.totalAmount}
                </h2>
              </div>

              <div
                className="
                  grid
                  sm:grid-cols-2
                  gap-4
                "
              >
                <div
                  className="
                    bg-[#F8F3EC]
                    p-4
                    rounded-2xl
                  "
                >
                  <p className="text-gray-500 text-sm mb-1">Payment Status</p>

                  <h3 className="font-semibold capitalize">
                    {order.paymentStatus}
                  </h3>
                </div>

                <div
                  className="
                    bg-[#F8F3EC]
                    p-4
                    rounded-2xl
                  "
                >
                  <p className="text-gray-500 text-sm mb-1">Order Status</p>

                  <h3 className="font-semibold capitalize">{order.status}</h3>
                </div>
              </div>

              <div
                className="
                  bg-[#F8F3EC]
                  p-4
                  rounded-2xl
                "
              >
                <p className="text-gray-500 text-sm mb-1">Payment ID</p>

                <h3 className="font-medium break-all">
                  {order.paymentId || "N/A"}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* TRACKING */}
        <div
          className="
            bg-white
            p-5
            sm:p-8
            rounded-[28px]
            sm:rounded-[36px]
            shadow-sm
            mt-6
            sm:mt-8
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-[#F8F3EC]
                flex
                items-center
                justify-center
                text-[#7A1E1E]
              "
            >
              <Truck size={22} />
            </div>

            <div>
              <p
                className="
                  uppercase
                  tracking-[3px]
                  text-[#C9A227]
                  text-[10px]
                "
              >
                Shipment
              </p>

              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >
                Tracking Information
              </h2>
            </div>
          </div>

          <div
            className="
              grid
              md:grid-cols-3
              gap-4
            "
          >
            <div
              className="
                bg-[#F8F3EC]
                p-5
                rounded-2xl
              "
            >
              <p className="text-gray-500 text-sm mb-2">Tracking ID</p>

              <h3 className="font-semibold break-all">
                {order.trackingId || "Not Added Yet"}
              </h3>
            </div>

            <div
              className="
                bg-[#F8F3EC]
                p-5
                rounded-2xl
              "
            >
              <p className="text-gray-500 text-sm mb-2">Courier Name</p>

              <h3 className="font-semibold break-words">
                {order.courierName || "Not Added Yet"}
              </h3>
            </div>

            <div
              className="
                bg-[#F8F3EC]
                p-5
                rounded-2xl
              "
            >
              <p className="text-gray-500 text-sm mb-2">Tracking Link</p>

              {order.trackingLink ? (
                <a
                  href={order.trackingLink}
                  target="_blank"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-blue-600
                    hover:underline
                    break-all
                  "
                >
                  Track Order
                  <ExternalLink size={16} />
                </a>
              ) : (
                <span className="font-medium">Not Added Yet</span>
              )}
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div
          className="
            bg-white
            p-5
            sm:p-8
            rounded-[28px]
            sm:rounded-[36px]
            shadow-sm
            mt-6
            sm:mt-8
          "
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-[#F8F3EC]
                flex
                items-center
                justify-center
                text-[#7A1E1E]
              "
            >
              <Package size={22} />
            </div>

            <div>
              <p
                className="
                  uppercase
                  tracking-[3px]
                  text-[#C9A227]
                  text-[10px]
                "
              >
                Order Items
              </p>

              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >
                Ordered Products
              </h2>
            </div>
          </div>

          <div className="space-y-5">
            {order.products.map((item, index) => (
              <div
                key={index}
                className="
                    flex
                    flex-col
                    sm:flex-row
                    justify-between
                    items-start
                    sm:items-center
                    gap-5
                    border
                    border-gray-100
                    rounded-3xl
                    p-4
                    sm:p-5
                  "
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.colorImage ||
                      item.selectedColorImage ||
                      item.productId?.mainImage ||
                      "/placeholder-product.jpg"
                    }
                    alt={item.productId?.name}
                    className="
    w-20
    h-20
    sm:w-24
    sm:h-24
    object-cover
    rounded-2xl
    bg-[#f5f5f5]
    shrink-0
  "
                  />

                  <div>
                    <h3
                      className="
                          text-base
                          sm:text-xl
                          font-semibold
                          leading-snug
                        "
                    >
                      {item.productId?.name}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Quantity: {item.quantity}
                    </p>

                    {item.size && (
                      <p className="text-gray-500">
                        Size: <strong>{item.size}</strong>
                      </p>
                    )}

                    {(item.color || item.selectedColor) && (
                      <p className="text-gray-500">
                        Color:{" "}
                        <strong>{item.color || item.selectedColor}</strong>
                      </p>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="
                      bg-[#F8F3EC]
                      px-5
                      py-3
                      rounded-2xl
                      flex
                      items-center
                      gap-2
                    "
                >
                  <BadgeIndianRupee size={18} />

                  <span className="font-semibold">
                    {item.price || item.productId?.price || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
