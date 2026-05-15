import express from "express";
import {
  getAboutSettings,
  updateAboutSettings,
} from "../controllers/aboutController.js";

const router = express.Router();

router.get("/", getAboutSettings);
router.put("/", updateAboutSettings);

export default router;
