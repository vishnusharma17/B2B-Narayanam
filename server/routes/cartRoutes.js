import express from "express";

import {
  addToCart,
  getCartItems,
  removeCartItem,
  updateCartQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

// Add product to cart
router.post("/", addToCart);

// Get cart items by sessionId
router.get("/:sessionId", getCartItems);

// Update quantity
router.put("/:id", updateCartQuantity);

// Remove item
router.delete("/:id", removeCartItem);

export default router;
