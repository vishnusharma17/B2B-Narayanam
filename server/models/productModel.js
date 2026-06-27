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

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    price_min: {
      type: Number,
      required: true,
    },

    original_price: {
      type: Number,
      default: 0,
    },

    discount_percentage: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    moq: {
      type: Number,
      default: 1,
    },

    shippingDays: {
      type: Number,
      default: 7,
    },
    sku: {
      type: String,
    },

    description: {
      type: String,
    },

    mainImage: {
      type: String,
      required: true,
    },

    galleryImages: [
      {
        type: String,
      },
    ],
    moreColors: [
      {
        color: {
          type: String,
          required: true,
        },

        thumbnail: {
          type: String,
          default: "",
        },

        mainImage: {
          type: String,
          default: "",
        },

        galleryImages: [
          {
            type: String,
          },
        ],
      },
    ],
    brand: {
      type: String,
      default: "Narayanam",
    },

    sizes: {
      type: [String],
      default: [],
    },
    isTrending: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isLimitedStock: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
