import WardrobePick from "../models/WardrobePick.js";

// GET ALL PICKS
export const getWardrobePicks = async (req, res) => {
  try {
    const picks = await WardrobePick.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: picks,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE PICK
export const createWardrobePick = async (req, res) => {
  try {
    const { title, subtitle, link } = req.body;

    const image = req.file
      ? `${BASE_URL}/uploads/wardrobe/${req.file.filename}`
      : "";

    const pick = await WardrobePick.create({
      title,
      subtitle,
      link,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Wardrobe pick created successfully",
      data: pick,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PICK
export const deleteWardrobePick = async (req, res) => {
  try {
    const pick = await WardrobePick.findByIdAndDelete(req.params.id);

    if (!pick) {
      return res.status(404).json({
        success: false,
        message: "Pick not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
