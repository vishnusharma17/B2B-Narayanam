import mongoose from "mongoose";

const wholesaleSchema = new mongoose.Schema(
  {
    heroTitle: String,
    heroSubtitle: String,
    heroImage: String,

    benefits: [
      {
        title: String,
        description: String,
      },
    ],
    stats: [
      {
        value: String,
        label: String,
      },
    ],

    processSteps: [String],

    ctaTitle: String,
    ctaButtonText: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("WholesaleSettings", wholesaleSchema);
