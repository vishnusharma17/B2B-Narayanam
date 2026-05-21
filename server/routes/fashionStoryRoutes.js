import express from "express";
import multer from "multer";
import path from "path";

import {
  createFashionStory,
  deleteFashionStory,
  getFashionStories,
} from "../controllers/fashionStoryController.js";

const router = express.Router();

// storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/fashion");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});

// routes
router.get("/", getFashionStories);

router.post("/", upload.single("image"), createFashionStory);

router.delete("/:id", deleteFashionStory);

export default router;
