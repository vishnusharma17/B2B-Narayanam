import AboutSettings from "../models/AboutSettings.js";

export const getAboutSettings = async (req, res) => {
  try {
    const data = await AboutSettings.findOne();

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
