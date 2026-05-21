import mongoose from "mongoose";

const shopRoleSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    link: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("ShopRole", shopRoleSchema);
