import Banner from "../models/Banner.js";

// CREATE BANNER
export const createBanner = async (req, res) => {
  try {
    let imageUrl = "";

    // Uploaded Image
    if (req.file) {
      imageUrl = `${BASE_URL}/${req.file.path.replace(/\\/g, "/")}`;
    }

    const banner = await Banner.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      link: req.body.link,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL BANNERS
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({
      active: true,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE BANNER
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
