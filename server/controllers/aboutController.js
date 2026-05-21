import AboutSettings from "../models/AboutSettings.js";

// GET
export const getAboutSettings = async (req, res) => {
  try {
    let data = await AboutSettings.findOne();

    if (!data) {
      data = await AboutSettings.create({
        heroTitle: "About Narayanam",

        heroSubtitle:
          "Luxury ethnic fashion crafted for boutiques and retailers.",

        storyTitle: "Crafting Elegance Since Years",

        storyDescription:
          "Narayanam blends tradition with modern craftsmanship to create premium ethnic collections trusted by retailers across India.",

        missionTitle: "Our Mission",

        missionDescription:
          "To empower fashion retailers with premium quality ethnic collections and scalable wholesale solutions.",

        founderMessage:
          "We believe fashion is not just clothing, it is identity and confidence.",

        stats: [
          {
            value: "500+",
            title: "Premium Designs",
          },
          {
            value: "1000+",
            title: "Retail Partners",
          },
          {
            value: "PAN India",
            title: "Fast Delivery",
          },
          {
            value: "Low MOQ",
            title: "Business Friendly",
          },
        ],
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const updateAboutSettings = async (req, res) => {
  try {
    let data = await AboutSettings.findOne();

    if (!data) {
      data = await AboutSettings.create(req.body);
    } else {
      data = await AboutSettings.findByIdAndUpdate(data._id, req.body, {
        new: true,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
