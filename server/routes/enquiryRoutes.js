import express from "express";
import {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
} from "../controllers/enquiryController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", createEnquiry);
router.get("/", getEnquiries);
router.put("/:id", protect, isAdmin, updateEnquiry);
export default router;
