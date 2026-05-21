import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", upload.array("images", 5), uploadImage);

export default router;
