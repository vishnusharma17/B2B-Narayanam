import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // 👈 IMPORTANT

console.log("CLOUD NAME:", process.env.CLOUD_NAME);
console.log("API KEY:", process.env.CLOUD_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export default cloudinary;
