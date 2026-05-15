import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    sessionId: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Wishlist", wishlistSchema);
