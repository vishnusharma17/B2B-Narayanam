import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const urls = [];

    for (let file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      urls.push(result.secure_url);
    }

    res.json({
      success: true,
      urls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
