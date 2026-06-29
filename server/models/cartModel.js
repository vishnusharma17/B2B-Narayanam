import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    selectedColor: {
      type: String,
      default: "",
    },

    selectedColorImage: {
      type: String,
      default: "",
    },

    selectedSize: {
      type: String,
      default: "",
    },

    sessionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Cart", cartSchema);
