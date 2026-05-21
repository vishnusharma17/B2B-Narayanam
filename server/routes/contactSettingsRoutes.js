import express from "express";

import {
  getContactSettings,
  updateContactSettings,
} from "../controllers/contactSettingsController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getContactSettings);

router.put("/", upload.single("heroImage"), updateContactSettings);

export default router;
