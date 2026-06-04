import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import Category from "../models/CategoryModel.js";
const BASE_URL = process.env.BASE_URL || "http://localhost:5004";

// GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({
      name,
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "narayanam/categories",
      });

      imageUrl = result.secure_url;

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    const category = await Category.create({
      name,
      slug,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.log("CATEGORY CREATE ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    let updatedData = {};

    if (name) {
      updatedData.name = name;

      updatedData.slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "narayanam/categories",
      });

      updatedData.image = result.secure_url;

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      },
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
