import express from "express";

import {
  getFooterSettings,
  updateFooterSettings,
} from "../controllers/footerController.js";

const router = express.Router();

router.get("/", getFooterSettings);
router.put("/", updateFooterSettings);

export default router;
