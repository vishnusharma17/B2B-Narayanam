import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  deleteAddress,
  getAddresses,
  saveAddress,
} from "../controllers/addressController.js";

const router = express.Router();

router.post("/", protect, saveAddress);

router.get("/", protect, getAddresses);

router.delete("/:id", protect, deleteAddress);

export default router;
