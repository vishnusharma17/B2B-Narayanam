import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: String,
    phone: String,
    email: String,
    companyName: String,

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: Number,
      },
    ],

    totalAmount: Number,

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    returnRequest: {
      type: Boolean,
      default: false,
    },

    returnReason: {
      type: String,
      default: "",
    },

    returnStatus: {
      type: String,
      default: "none",
    },

    deliveredAt: {
      type: Date,
    },
    trackingId: {
      type: String,
      default: "",
    },

    courierName: {
      type: String,
      default: "",
    },

    trackingLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
