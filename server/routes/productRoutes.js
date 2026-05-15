import express from "express";
import {
  createProduct,
  deleteProduct,
  getFeaturedProducts,
  getProduct,
  getProducts,
  getRelatedProducts,
  getTrendingProducts,
  updateProduct,
} from "../controllers/productController.js";

import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Special routes FIRST
router.get("/featured", getFeaturedProducts);
router.get("/trending", getTrendingProducts);
router.get("/related/:category", getRelatedProducts);

// Normal routes
router.get("/", getProducts);

// Dynamic route ALWAYS LAST
router.get("/:slug", getProduct);

// Admin routes
router.post("/", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
