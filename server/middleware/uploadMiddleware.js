import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "narayanam",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: Date.now().toString(),
  }),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
