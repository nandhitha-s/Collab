const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // References Course
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // References Student
  title: { type: String, required: true },
  file: { 
    filename: { type: String, required: true }, // The filename of the PDF
    contentType: { type: String, required: true }, // The MIME type (application/pdf)
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: "File", required: true } // Reference to GridFS file ID
  },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Assignment", AssignmentSchema);
