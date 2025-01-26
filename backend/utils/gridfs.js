import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

// Initialize GridFS Stream
let gfs;

const connectGridFS = () => {
  // Check if connection is already established
  if (!gfs) {
    const conn = mongoose.connection;
    
    // Create a GridFS stream connection
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); // Name of the GridFS bucket
  }
  return gfs;
};

// Create a read stream from GridFS
const getFileStream = (filename) => {
  try {
    const gfs = connectGridFS();
    return gfs.createReadStream({ filename });
  } catch (error) {
    console.error("Error getting file stream:", error);
    throw new Error("Error retrieving file from GridFS");
  }
};

// Create a write stream to GridFS
const uploadFileToGridFS = (file) => {
  try {
    const gfs = connectGridFS();
    const writestream = gfs.createWriteStream({
      filename: file.filename,
      content_type: file.mimetype,
    });
    file.stream.pipe(writestream); // Pipe the file stream to GridFS
  } catch (error) {
    console.error("Error uploading file to GridFS:", error);
    throw new Error("Error uploading file to GridFS");
  }
};

export { connectGridFS, getFileStream, uploadFileToGridFS, gfs };
