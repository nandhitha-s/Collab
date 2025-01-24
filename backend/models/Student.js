import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // References User
    name: { type: String, required: true },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // References Courses
  },
  { timestamps: true }
);

const StudentModel = mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default StudentModel;
