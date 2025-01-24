import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // References User
    name: { type: String, required: true },
    teachingCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // References Courses
  },
  { timestamps: true }
);

const TeacherModel = mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);

export default TeacherModel;
