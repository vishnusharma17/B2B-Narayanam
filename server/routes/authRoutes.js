// routes/authRoutes.js

import express from "express";

import {
  forgotPassword,
  googleLogin,
  login,
  register,
  resetPassword,
  updateProfile,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// =========================
// AUTH
// =========================

router.post("/register", register);

router.post("/login", login);

router.post("/google-login", googleLogin);

// =========================
// PASSWORD
// =========================

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

// =========================
// PROFILE
// =========================

router.put("/update-profile", protect, updateProfile);

export default router;
