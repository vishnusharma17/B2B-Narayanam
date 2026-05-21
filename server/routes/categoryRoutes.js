import express from "express";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// GET ALL
router.get("/", getCategories);

// CREATE CATEGORY
router.post("/", upload.single("image"), createCategory);

// UPDATE CATEGORY
router.put("/:id", upload.single("image"), updateCategory);

// DELETE CATEGORY
router.delete("/:id", deleteCategory);

export default router;
