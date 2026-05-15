import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
    review: String,
    image: String,
    rating: Number,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Testimonial", testimonialSchema);
