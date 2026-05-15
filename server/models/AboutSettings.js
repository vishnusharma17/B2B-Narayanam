import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    heroTitle: String,
    heroSubtitle: String,
    storyTitle: String,
    storyDescription: String,
    missionTitle: String,
    missionDescription: String,
    founderMessage: String,
    factoryImage: String,

    stats: [
      {
        title: String,
        value: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("AboutSettings", aboutSchema);
