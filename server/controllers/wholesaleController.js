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

    if (!data) {
      data = await WholesaleSettings.create(req.body);
    } else {
      data = await WholesaleSettings.findByIdAndUpdate(data._id, req.body, {
        new: true,
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
