import mongoose from "mongoose";

const contactSettingsSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
      default: "Contact Narayanam",
    },

    heroSubtitle: {
      type: String,
      default: "Connect with us for premium wholesale ethnic collections.",
    },

    heroImage: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("ContactSettings", contactSettingsSchema);
