import CourseModel from "../models/Course.js";

const listCourse = async (req, res) => {
    const {user} = req.body;
    const code = user.slice(0,4).toUpperCase();

    try{
        const course = await CourseModel.findAll({
            where:{
                name: code
            }
        });
        if(!course){
            return res.json({success:false,message:"Courses does not exist"})
        }
        const courseCodes = course.map((course) => course.description.map((desc) => desc.courseCode));
        const courseNames = course.map((course) => course.description.map((desc) => desc.courseName));

        return res.json({success:true,courseCodes,courseNames});
    }catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching courses" });
    }
    
};

export { listCourse };