import TeacherModel from "../models/Teacher.js";
import CourseModel from "../models/Course.js";

const addCourse = async (req, res) => {
    const {teacherId , courseId} = req.body;
    try {
        const teacher = await TeacherModel.findByone(teacherId);
        if(!teacher){
            return res.json({success:false,message:"Teacher does not exist"});
        }
        const course = await CourseModel.findByone(courseId);
        if(!course){
            return res.json({success:false,message:"Course does not exist"});
        }
        teacher.teachingCourses.push(courseId);
        await teacher.save();
        return res.json({success:true,message:"Course added successfully"});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding course" });
    }

};

const listTeacherCourse = async (req, res) => {
  const { teacherId } = req.body;

  try {

    const teacher = await TeacherModel.findone(teacherId);
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

export default {addCourse,listTeacherCourse}; 

