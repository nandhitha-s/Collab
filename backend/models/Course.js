const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true }, // References Teacher
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // References Students
  resources: [
    {
      resourceId: { type: String, required: true },
      title: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  messages: [
    {
      messageId: { type: String, required: true },
      content: { type: String, required: true },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }, // References Teacher
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);
