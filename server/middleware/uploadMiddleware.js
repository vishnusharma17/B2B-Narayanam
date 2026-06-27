import fs from "fs";
import multer from "multer";
import path from "path";

// On platforms like Render, using the '/tmp' directory is often safer for temporary files,
// but if you prefer a local folder, this works perfectly as long as you clean it up (which your controllers do now!).
const uploadPath = "./uploads/products";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    // Generate a unique filename
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 100000)}${path.extname(file.originalname)}`,
    );
  },
});

// 1. Add a File Filter to accept ONLY images
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    // Reject file with a custom error message
    cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Invalid file type. Only JPG, PNG, and WEBP are allowed.",
      ),
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  // 2. Add limits to prevent memory bloat and Render timeouts
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max per file
    files: 25, // Maximum total files per request (adjust based on your max gallery + colors)
  },
});

export default upload;
