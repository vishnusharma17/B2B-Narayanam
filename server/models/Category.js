import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  image: String,
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Category", categorySchema);
