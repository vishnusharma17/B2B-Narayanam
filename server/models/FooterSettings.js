import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
  {
    email: String,
    phone: String,
    address: String,
    instagram: String,
    facebook: String,
    whatsapp: String,
    copyrightText: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("FooterSettings", footerSchema);
