import mongoose from "mongoose";

const fashionStorySchema = new mongoose.Schema(
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

export default mongoose.model("FashionStory", fashionStorySchema);
