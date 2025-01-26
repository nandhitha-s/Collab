import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    }, // References Course
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    }, // References Teacher
    title: {
      type: String,
      required: true,
    }, // Assignment Title
    file: {
      filename: {
        type: String,
        required: true,
      }, // The filename of the PDF
      contentType: {
        type: String,
        required: true,
        enum: ["application/pdf"], // Ensures only PDFs are allowed
      }, // MIME Type
      fileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: true,
      }, // Reference to GridFS file ID
    },
    submissions: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        }, // References Student
        submittedFile: {
          filename: { type: String, required: true }, // The filename of the submitted PDF
          contentType: {
            type: String,
            required: true,
            enum: ["application/pdf"],
          }, // Ensures only PDFs
          fileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File",
            required: true,
          }, // Reference to GridFS file ID
        },
        submittedAt: { type: Date, default: Date.now }, // Submission Date
        status: {
          type: String,
          enum: ["pending", "completed"],
          default: "pending", // Initially, it's 'pending' when no submission
        }, // Status of the submission
        grade: {
          type: Number,
          min: 0,
          max: 100,
          default: null, // Grade will be null until it's graded
        }, // Grade (out of 100)
      },
    ],
  },
  { timestamps: true }
);

const AssignmentModel =
  mongoose.models.Assignment || mongoose.model("Assignment", AssignmentSchema);

export default AssignmentModel;
