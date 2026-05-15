import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/", addToWishlist);
router.get("/:sessionId", getWishlist);
router.delete("/:id", removeWishlist);

export default router;
