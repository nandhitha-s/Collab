import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';  // Correct import for ES module

// Configure the storage
const storage = new GridFsStorage({
  url: process.env.MONGO_URL, // MongoDB URL from environment
  file: (req, file) => {
    return {
      bucketName: 'uploads',  // Specify bucket name
      filename: `${Date.now()}-${file.originalname}`,  // Custom file naming
    };
  },
});

const upload = multer({ storage });  // Using the configured storage

export default upload;
