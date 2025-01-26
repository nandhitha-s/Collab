import mongoose from "mongoose";
import Grid from "gridfs-stream";
import { connectDB } from "../config/db.js"; // Assuming you have a connectDB function

let gfs;

connectDB().then(() => {
  const conn = mongoose.connection;
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads"); // Use your GridFS bucket name here
});

const FileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const FileModel = mongoose.model("File", FileSchema);

export default { FileModel, gfs };
