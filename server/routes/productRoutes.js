import express from "express";

import {
  createProduct,
  deleteProduct,
  getBestSellerProducts,
  getLimitedStockProducts,
  getMostViewedProducts,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
  getTrendingProducts,
  searchProducts,
  updateProduct,
  updateProductViews,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ==========================
// GET ROUTES
// ==========================

// ALL PRODUCTS
router.get("/", getProducts);

// SEARCH PRODUCTS
router.get("/search", searchProducts);

// BEST SELLERS
router.get("/best-sellers", getBestSellerProducts);

// TRENDING PRODUCTS
router.get("/trending", getTrendingProducts);

// LIMITED STOCK PRODUCTS
router.get("/limited-stock", getLimitedStockProducts);

// MOST VIEWED PRODUCTS
router.get("/most-viewed", getMostViewedProducts);

// PRODUCT BY SLUG
router.get("/slug/:slug", getProductBySlug);

// RELATED PRODUCTS
router.get("/related/:categoryId", getRelatedProducts);

// UPDATE PRODUCT VIEWS
router.put("/views/:id", updateProductViews);

// ==========================
// CREATE PRODUCT
// ==========================
router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "mainImage",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 3,
    },
  ]),
  createProduct,
);

// ==========================
// UPDATE PRODUCT
// ==========================
router.put(
  "/:id",
  protect,
  upload.fields([
    {
      name: "mainImage",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 3,
    },
  ]),
  updateProduct,
);

// ==========================
// DELETE PRODUCT
// ==========================
router.delete("/:id", protect, deleteProduct);

export default router;
