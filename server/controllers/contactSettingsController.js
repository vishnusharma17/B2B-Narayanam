import ContactSettings from "../models/ContactSettings.js";

// GET
export const getContactSettings = async (req, res) => {
  try {
    let data = await ContactSettings.findOne();

    if (!data) {
      data = await ContactSettings.create({});
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
export const updateContactSettings = async (req, res) => {
  try {
    let data = await ContactSettings.findOne();

    let heroImage = req.body.existingHeroImage || "";

    // IMAGE UPLOAD
    if (req.file) {
      heroImage = `http://localhost:5004/uploads/${req.file.filename}`;
    }

    const payload = {
      heroTitle: req.body.heroTitle,

      heroSubtitle: req.body.heroSubtitle,

      heroImage,

      phone: req.body.phone,

      email: req.body.email,

      location: req.body.location,

      whatsapp: req.body.whatsapp,
    };

    if (!data) {
      data = await ContactSettings.create(payload);
    } else {
      data = await ContactSettings.findByIdAndUpdate(data._id, payload, {
        returnDocument: "after",
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
