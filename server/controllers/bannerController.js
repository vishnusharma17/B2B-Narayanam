import Banner from "../models/Banner.js";

export const createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);

    res.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ active: true });

    res.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
