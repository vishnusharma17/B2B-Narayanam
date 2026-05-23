import FooterSettings from "../models/FooterSettings.js";

export const getFooterSettings = async (req, res) => {
  try {
    const data = await FooterSettings.findOne();

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

export const updateFooterSettings = async (req, res) => {
  try {
    let data = await FooterSettings.findOne();

    if (!data) {
      data = await FooterSettings.create(req.body);
    } else {
      data = await FooterSettings.findByIdAndUpdate(data._id, req.body, {
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
