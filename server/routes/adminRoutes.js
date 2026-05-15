import express from "express";
import { getDashboardStats } from "../controllers/adminController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, isAdmin, getDashboardStats);

export default router;
