import express from "express";
import {
  createBanner,
  deleteBanner,
  getBanners,
} from "../controllers/bannerController.js";

const router = express.Router();

router.post("/", createBanner);
router.get("/", getBanners);
router.delete("/:id", deleteBanner);

export default router;
