import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { connectDB } from "../config/db.js"; 
import "dotenv/config";

connectDB();

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`, 
      bucketName: "uploads", 
    };
  },
});

const upload = multer({ storage });

export default upload;
