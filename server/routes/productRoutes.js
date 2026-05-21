import express from "express";

import {
  createProduct,
  deleteProduct,
  getBestSellerProducts,
  getMostViewedProducts,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
  getTrendingProducts,
  updateProduct,
  updateProductViews,
  searchProducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/slug/:slug", getProductBySlug);
router.get("/related/:categoryId", getRelatedProducts);
router.get("/best-sellers", getBestSellerProducts);
// CREATE PRODUCT
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

// UPDATE PRODUCT
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

router.delete("/:id", protect, deleteProduct);
router.get("/trending", getTrendingProducts);
router.put("/views/:id", updateProductViews);

router.get("/most-viewed", getMostViewedProducts);
export default router;
