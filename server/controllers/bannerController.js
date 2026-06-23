import cloudinary from "../config/cloudinary.js";
import Banner from "../models/Banner.js";
const BASE_URL = process.env.BASE_URL || "http://localhost:5004";

// CREATE BANNER
export const createBanner = async (req, res) => {
  try {
    console.log("BODY =>", req.body);
    console.log("FILE =>", req.files);

    let desktopImage = "";
    let mobileImage = "";

    if (req.files?.desktopImage?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.desktopImage[0].path,
        {
          folder: "narayanam/banners",
        }
      );

      desktopImage = result.secure_url;
    }

    if (req.files?.mobileImage?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.mobileImage[0].path,
        {
          folder: "narayanam/banners",
        }
      );

      mobileImage = result.secure_url;
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
    console.log("BANNER ERROR =>", error);

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
