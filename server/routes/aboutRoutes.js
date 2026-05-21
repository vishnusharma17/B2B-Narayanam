import express from "express";

import {
  getAboutSettings,
  updateAboutSettings,
} from "../controllers/aboutController.js";

const router = express.Router();

// GET
router.get("/", getAboutSettings);

// UPDATE
router.put("/", updateAboutSettings);

export default router;
