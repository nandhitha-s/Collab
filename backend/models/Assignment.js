import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    courseId: { 
      type: String, 
      required: true 
    }, // References Course
    teacherId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Teacher", 
      required: true 
    }, // References Teacher
    title: { 
      type: String, 
      required: true 
    }, // Assignment Title
    file: { 
      filename: { 
        type: String, 
        required: true 
      }, // The filename of the PDF
      contentType: { 
        type: String, 
        required: true, 
        enum: ["application/pdf"] // Ensures only PDFs are allowed
      }, // MIME Type
      fileId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "File", 
        required: true 
      } // Reference to GridFS file ID
    },
    submissions: [
      {
        studentId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Student", 
          required: true 
        }, // References Student
        submittedFile: {
          filename: { type: String, required: true }, // The filename of the submitted PDF
          contentType: { 
            type: String, 
            required: true, 
            enum: ["application/pdf"] 
          }, // Ensures only PDFs
          fileId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "File", 
            required: true 
          } // Reference to GridFS file ID
        },
        submittedAt: { type: Date, default: Date.now }, // Submission Date
      },
    ],
  },
  { timestamps: true }
);

const AssignmentModel = mongoose.models.Assignment || mongoose.model("Assignment", AssignmentSchema);

export default AssignmentModel;
