import express from "express";
import multer from "multer";
import path from "path";

import {
  createWardrobePick,
  deleteWardrobePick,
  getWardrobePicks,
} from "../controllers/wardrobePickController.js";

const router = express.Router();

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/wardrobe");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});

// routes
router.get("/", getWardrobePicks);

router.post("/", upload.single("image"), createWardrobePick);

router.delete("/:id", deleteWardrobePick);

export default router;
