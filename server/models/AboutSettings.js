import mongoose from "mongoose";

const statSchema = new mongoose.Schema(
  {
    value: String,
    title: String,
  },
  { _id: false },
);

const aboutSettingsSchema = new mongoose.Schema(
  {
    heroTitle: String,

    heroSubtitle: String,

    storyTitle: String,

    storyDescription: String,

    missionTitle: String,

    missionDescription: String,

    founderMessage: String,

    stats: [statSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("AboutSettings", aboutSettingsSchema);
