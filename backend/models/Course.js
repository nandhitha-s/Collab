import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: [
    { 
      courseCode: { type: String, required: true },
      courseName: { type: String, required: true },
    },
  ],
});

const CourseModel = mongoose.models.CourseModel || mongoose.model("Course", CourseSchema);

export default CourseModel;
