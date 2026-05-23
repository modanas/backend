import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

let storage;

// Check if Cloudinary credentials are configured and are not the placeholder 'food-del'
const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "food_images",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      },
    });
    console.log("Multer Engine: Using Cloudinary Cloud Storage.");
  } catch (err) {
    console.error("Failed to initialize Cloudinary storage, falling back to local:", err);
  }
}

if (!storage) {
  // Ensure the uploads directory exists locally
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }

  storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${file.originalname}`);
    },
  });
  console.log("Multer Engine: Using local disk storage fallback (uploads/).");
}

const upload = multer({ storage });
export default upload;
