import express from "express";
import {
  getWholesaleSettings,
  updateWholesaleSettings,
} from "../controllers/wholesaleController.js";

const router = express.Router();

router.get("/", getWholesaleSettings);
router.put("/", updateWholesaleSettings);

export default router;
