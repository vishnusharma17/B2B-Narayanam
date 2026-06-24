import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,

    companyName: String,

    city: String,

    inquiryType: String,

    budget: String,

    preferredContact: String,
    product_id: String,
    quantity: Number,
    message: String,

    status: {
      type: String,
      enum: ["new", "contacted", "converted"],
      default: "new",
    },

    // 🔥 NEW FIELDS (yaha add kar)
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    notes: String,

    assignedTo: String,
  },
  { timestamps: true },
);

export default mongoose.model("Enquiry", enquirySchema);
