import WholesaleSettings from "../models/WholesaleSettings.js";

export const getWholesaleSettings = async (req, res) => {
  try {
    const data = await WholesaleSettings.findOne();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateWholesaleSettings = async (req, res) => {
  try {
    let data = await WholesaleSettings.findOne();

    // DEFAULT STATS
    const defaultStats = [
      {
        value: "500+",
        label: "Premium Designs",
      },
      {
        value: "1200+",
        label: "Retail Partners",
      },
      {
        value: "PAN India",
        label: "Fast Delivery",
      },
      {
        value: "Low MOQ",
        label: "Business Friendly",
      },
    ];

    // AGAR STATS NAHI AAYE
    if (!req.body.stats) {
      req.body.stats = defaultStats;
    }

    // CREATE
    if (!data) {
      data = await WholesaleSettings.create(req.body);
    }

    // UPDATE
    else {
      data = await WholesaleSettings.findByIdAndUpdate(data._id, req.body, {
        returnDocument: "after",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
