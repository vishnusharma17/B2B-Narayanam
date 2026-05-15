import ContactSettings from "../models/ContactSettings.js";

// Get contact settings
export const getContactSettings = async (req, res) => {
  try {
    const settings = await ContactSettings.findOne();

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update contact settings
export const updateContactSettings = async (req, res) => {
  try {
    let settings = await ContactSettings.findOne();

    if (!settings) {
      settings = await ContactSettings.create(req.body);
    } else {
      settings = await ContactSettings.findByIdAndUpdate(
        settings._id,
        req.body,
        {
          new: true,
        },
      );
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
