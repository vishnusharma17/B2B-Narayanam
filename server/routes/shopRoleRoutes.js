import express from "express";
import multer from "multer";
import path from "path";

import {
  createShopRole,
  deleteShopRole,
  getShopRoles,
} from "../controllers/shopRoleController.js";

const router = express.Router();

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/roles");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});

// routes
router.get("/", getShopRoles);

router.post("/", upload.single("image"), createShopRole);

router.delete("/:id", deleteShopRole);

export default router;
