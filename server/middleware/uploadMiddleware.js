import fs from "fs";
import multer from "multer";
import path from "path";

// CREATE FOLDER IF NOT EXISTS
const uploadPath = "./uploads/products";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("UPLOAD PATH =>", uploadPath);
    console.log("FILE NAME =>", file.originalname);

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);

    console.log("SAVING FILE =>", uniqueName);

    cb(null, uniqueName);
  },
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
