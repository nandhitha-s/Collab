import TeacherModel from "../models/Teacher.js";
import CourseModel from "../models/Course.js";
import AssignmentModel from "../models/Assignment.js";
import UserModel from "../models/User.js";


const addCourse = async (req, res) => {
  const { teacherId, courseId } = req.body;
  try {
    // Validate teacherId as a string
    if (typeof teacherId !== "string" || teacherId.trim() === "") {
        return res.json({ success: false, message: "Invalid teacherId format" });
    }
    const user = await UserModel.findOne({username:teacherId});
    const id = user._id;

    // Find teacher by userId
    const teacher = await TeacherModel.findOne({ userId: id });
    if (!teacher) {
        return res.json({ success: false, message: "Teacher does not exist" });
    }
console.log(teacher);
    // Find courses by
   const courses = await CourseModel.find({
       "description.courseCode": { $in: courseId },
   });
   
  if (!courses || courses.length === 0) {
      return res.json({ success: false, message: "No matching courses found" });
   }

  // Extract course codes and add to teacher's teachingCourses
   const courseCodes = courses.flatMap((course) =>
       course.description
           .filter((desc) => courseId.includes(desc.courseCode))
           .map((desc) => desc.courseCode)
   );
   console.log(courseCodes);
   const updatedCourses = [...new Set([...teacher.teachingCourses, ...courseId])];
   teacher.teachingCourses = updatedCourses;
   const updatedTeacher = await teacher.save();

  return res.json({ success: true, message: "Courses added successfully",updatedCourses });
} catch (error) {
  console.error(error);
  return res.status(500).json({ success: false, message: "Error adding course" });
}
};
const listTeacherCourse = async (req, res) => {
  const { teacherId } = req.body;

  try {
    const user = await UserModel.findOne({username:teacherId});
    const id = user._id;
    const teacher = await TeacherModel.findOne({userId:id});
    if (!teacher) {
      return res.json({ success: false, message: "Teacher does not exist" });
    }
    
    const courses = await CourseModel.find({
      "description.courseCode": { $in: teacher.teachingCourses }, 
    });

    return res.json({ success: true, courses });
  } catch (error) {
    console.log("Error fetching courses:", error);
    return res.json({ success: false, message: "Error fetching courses" });
  }
};

const addAssignment = async (req, res) => {
  const {teacherId , courseId , title , file} = req.body;
  try {
      const teacher = await TeacherModel.findByone(teacherId);
      if(!teacher){
          return res.json({success:false,message:"Teacher does not exist"});
      }
      const course = await CourseModel.findByone(courseId);
      if(!course){
          return res.json({success:false,message:"Course does not exist"});
      }
      const assignment = new AssignmentModel({
        courseId,
        teacherId,
        title: title,
        file: file,
      });
      await assignment.save();
      return res.json({success:true,message:"Assignment added successfully"});
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error adding assignment" });
  }
};//route


export default {addCourse,listTeacherCourse,addAssignment}; 

