import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  deleteAddress,
  getAddresses,
  getSingleAddress,
  saveAddress,
  updateAddress,
} from "../controllers/addressController.js";

const router = express.Router();

router.post("/", protect, saveAddress);

router.get("/", protect, getAddresses);

router.get("/:id", protect, getSingleAddress);

router.put("/:id", protect, updateAddress);

router.delete("/:id", protect, deleteAddress);

export default router;
