import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    category: String,

    price_min: Number,
    price_max: Number,

    original_price: Number,
    discount_percentage: Number,

    moq: Number,

    images: [String],

    description: String,

    location: {
      type: String,
      default: "Jaipur",
    },

    brand: String,

    sizes: [String],

    colors: [String],
    stock: {
      type: Number,
      default: 0,
    },

    sku: {
      type: String,
      unique: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },

    trending: {
      type: Boolean,
      default: false,
    },

    newArrival: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
