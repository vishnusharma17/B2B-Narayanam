import mongoose from "mongoose";

const contactSettingsSchema = new mongoose.Schema(
  {
    phone: String,
    email: String,
    location: String,
    whatsapp: String,
    heroImage: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("ContactSettings", contactSettingsSchema);
