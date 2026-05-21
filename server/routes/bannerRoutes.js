import express from "express";

import {
  createBanner,
  deleteBanner,
  getBanners,
} from "../controllers/bannerController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// CREATE BANNER
router.post("/", upload.single("image"), createBanner);

// GET BANNERS
router.get("/", getBanners);

// DELETE BANNER
router.delete("/:id", deleteBanner);

export default router;
