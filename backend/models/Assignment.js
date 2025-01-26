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
      }

    },
    submissions: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        }, // References Student
        submittedFile: {
          filename: { type: String, required: true }, 
        },
        submittedAt: { type: Date, default: Date.now }, 
        status: {
          type: String,
          enum: ["pending", "completed"],
          default: "pending", 
        },
        grade: {
          type: Number,
          min: 0,
          max: 100,
          default: null, 
        }, 
      },
    ],
  },
  { timestamps: true }
);

const AssignmentModel =
  mongoose.models.Assignment || mongoose.model("Assignment", AssignmentSchema);

export default AssignmentModel;
