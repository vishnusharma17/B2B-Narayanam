import fs from "fs";
import multer from "multer";
import path from "path";

const uploadPath = "./uploads/products";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 100000)}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({ storage });

export default upload;
