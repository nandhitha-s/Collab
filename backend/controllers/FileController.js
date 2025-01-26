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

// Upload file to GridFS
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const { filename, contentType, id: fileId } = req.file;
    const newFile = new FileModel({ filename, contentType, fileId });

    await newFile.save();  // Save the file information in the database
    res.json({ success: true, file: newFile });  // Respond with the file info
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ success: false, message: "Error uploading file", error: error.message });
  }
};

// Retrieve a file by its filename
const getFile = async (req, res) => {
  try {
    const fileName = req.params.filename;

    // Find file by filename in GridFS
    const file = await gfs.files.findOne({ filename: fileName });

    if (!file) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    const readStream = gfs.createReadStream(file.filename);
    res.set("Content-Type", file.contentType);
    readStream.pipe(res);  // Stream the file back to the client
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).json({ success: false, message: "Error retrieving file", error: error.message });
  }
};

export { upload, uploadFile, getFile };
