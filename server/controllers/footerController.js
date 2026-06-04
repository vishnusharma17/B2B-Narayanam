import FooterSettings from "../models/FooterSettings.js";

export const getFooterSettings = async (req, res) => {
  try {
    let data = await FooterSettings.findOne();

    if (!data) {
      data = await FooterSettings.create({
        address: "",
        phone: "",
        email: "",
        copyrightText: "©️ Narayanam",
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
