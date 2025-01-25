import TeacherModel from "../models/Teacher";
import CourseModel from "../models/Course";

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

const listTeacherCourse

export default {addCourse};