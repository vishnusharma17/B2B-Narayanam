import mongoose from "mongoose";

const wardrobePickSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    image: String,
    link: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("WardrobePick", wardrobePickSchema);
