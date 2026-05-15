"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "../../../../lib/api";

export default function OrderDetailsPage() {
  const params = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await API.get("/orders");

      const foundOrder = res.data.data.find((item) => item._id === params.id);

      setOrder(foundOrder);
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) {
    return <div className="text-center text-2xl">Loading Order...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F3EC] p-8">
      <h1 className="text-4xl font-light mb-10">Order Details</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Customer Info */}
        <div className="bg-white p-8 rounded-3xl shadow-md">
          <h2 className="text-2xl mb-5">Customer Info</h2>

          <p>
            <strong>Name:</strong> {order.customerName}
          </p>

          <p>
            <strong>Phone:</strong> {order.phone}
          </p>

          <p>
            <strong>Email:</strong> {order.email}
          </p>

          <p>
            <strong>Address:</strong> {order.address}
          </p>
        </div>

        {/* Payment Info */}
        <div className="bg-white p-8 rounded-3xl shadow-md">
          <h2 className="text-2xl mb-5">Payment Info</h2>

          <p>
            <strong>Total:</strong> ₹{order.totalAmount}
          </p>

          <p>
            <strong>Payment Status:</strong> {order.paymentStatus}
          </p>

          <p>
            <strong>Payment ID:</strong> {order.paymentId}
          </p>

          <p>
            <strong>Order Status:</strong> {order.status}
          </p>
        </div>
      </div>

      {/* Tracking Section */}
      <div className="bg-white p-8 rounded-3xl shadow-md mt-10">
        <h2 className="text-2xl mb-5">Tracking Information</h2>

        <p>
          <strong>Tracking ID:</strong> {order.trackingId || "Not Added Yet"}
        </p>

        <p>
          <strong>Courier Name:</strong> {order.courierName || "Not Added Yet"}
        </p>

        <p>
          <strong>Tracking Link:</strong>{" "}
          {order.trackingLink ? (
            <a
              href={order.trackingLink}
              target="_blank"
              className="text-blue-600 underline"
            >
              Track Order
            </a>
          ) : (
            "Not Added Yet"
          )}
        </p>
      </div>

      {/* Ordered Products */}
      <div className="bg-white p-8 rounded-3xl shadow-md mt-10">
        <h2 className="text-2xl mb-6">Ordered Products</h2>

        <div className="grid gap-6">
          {order.products.map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {item.productId?.name}
                </h3>

                <p>Qty: {item.quantity}</p>
              </div>

              <img
                src={item.productId?.images?.[0]}
                alt=""
                className="w-24 h-24 object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
