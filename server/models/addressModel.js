import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: String,
    phone: String,
    pincode: String,
    house: String,
    landmark: String,
    city: String,
    state: String,
    type: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Address", addressSchema);
