"use client";

import {
  CheckCircle,
  CreditCard,
  Package,
  RotateCcw,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../lib/api";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userData"));

      if (!user) return;

      const res = await API.get("/orders");

      const myOrders = res.data.data.filter(
        (order) => order.email === user.email,
      );

      setOrders(myOrders);
    } catch (error) {
      console.log(error);
    }
  };

  // RETURN REQUEST
  const requestReturn = async (orderId) => {
    try {
      await API.post(`/orders/${orderId}/return`, {
        reason: "Wrong Size",
      });

      toast.success("Return request submitted");

      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // CANCEL ORDER
  const cancelOrder = async (orderId) => {
    try {
      await API.put(`/orders/${orderId}/status`, {
        status: "cancelled",
      });

      toast.success("Order cancelled successfully");

      fetchOrders();
    } catch (error) {
      toast.error("Unable to cancel order");
    }
  };

  // REORDER
  const reorderItems = (order) => {
    const cartItems = order.products.map((item) => ({
      ...item.productId,
      quantity: item.quantity,
      size: item.size,
      price: item.productId?.price || item.productId?.price_min,
    }));

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    toast.success("Items added to cart");

    window.location.href = "/cart";
  };

  const getStatusColor = (status) => {
    if (status === "delivered") return "bg-green-100 text-green-700";

    if (status === "shipped") return "bg-blue-100 text-blue-700";

    if (status === "cancelled") return "bg-red-100 text-red-700";

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] pt-[120px] px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-10">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center">
            <ShoppingBag size={60} className="mx-auto mb-4 text-gray-400" />

            <h2 className="text-2xl font-semibold">No Orders Yet</h2>

            <p className="text-gray-500 mt-2">
              Start shopping your favorite products
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-8 rounded-3xl shadow-md"
              >
                {/* Header */}
                <div className="flex flex-wrap justify-between gap-4 border-b pb-6">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Order #{order._id.slice(-6)}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-4 py-2 rounded-full text-sm ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>

                    <span className="text-sm text-gray-500">
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="flex flex-wrap gap-6 mt-6 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={18} />
                    Order Placed
                  </div>

                  {order.status !== "pending" && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <Package size={18} />
                      Confirmed
                    </div>
                  )}

                  {order.status === "shipped" && (
                    <div className="flex items-center gap-2 text-purple-600">
                      <Truck size={18} />
                      Shipped
                    </div>
                  )}

                  {order.status === "delivered" && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle size={18} />
                      Delivered
                    </div>
                  )}

                  {order.status === "cancelled" && (
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle size={18} />
                      Cancelled
                    </div>
                  )}
                </div>

                {/* Products */}
                <div className="mt-8 grid gap-5">
                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.productId?.mainImage}
                          alt={item.productId?.name}
                          className="w-20 h-20 object-cover rounded-xl"
                        />

                        <div>
                          <h3 className="font-semibold">
                            {item.productId?.name}
                          </h3>

                          <p className="text-gray-500">Qty: {item.quantity}</p>

                          {item.size && (
                            <p className="text-gray-500">Size: {item.size}</p>
                          )}
                        </div>
                      </div>

                      <p className="font-semibold">
                        ₹{item.productId?.price || item.productId?.price_min}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Shipping + Payment */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="font-semibold mb-3">Shipping Address</h3>

                    <p>{order.customerName}</p>
                    <p>{order.phone}</p>
                    <p>{order.address}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CreditCard size={18} />
                      Payment Details
                    </h3>

                    <p>Total: ₹{order.totalAmount}</p>

                    <p>Payment Method: {order.paymentMethod}</p>
                  </div>
                </div>

                {/* Tracking */}
                {order.trackingId && (
                  <div className="mt-6 bg-gray-50 p-5 rounded-2xl">
                    <h3 className="font-semibold mb-2">Tracking Details</h3>

                    <p>Tracking ID: {order.trackingId}</p>

                    <p>Courier: {order.courierName}</p>

                    {order.trackingLink && (
                      <a
                        href={order.trackingLink}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Track Shipment
                      </a>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-4 mt-8">
                  {order.status === "pending" && (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="bg-red-500 text-white px-6 py-3 rounded-xl"
                    >
                      Cancel Order
                    </button>
                  )}

                  {order.status === "delivered" && !order.returnRequest && (
                    <button
                      onClick={() => requestReturn(order._id)}
                      className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2"
                    >
                      <RotateCcw size={18} />
                      Return Order
                    </button>
                  )}

                  <button
                    onClick={() => reorderItems(order)}
                    className="bg-[#D4AF37] px-6 py-3 rounded-xl"
                  >
                    Reorder
                  </button>

                  <a
                    href={`${BASE_URL}/api/invoice/${order._id}`}
                    target="_blank"
                  >
                    <button className="bg-black text-white px-6 py-3 rounded-xl">
                      Download Invoice
                    </button>
                  </a>
                </div>

                {order.returnRequest && (
                  <p className="mt-4 text-green-600 font-medium">
                    Return Request Submitted
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
