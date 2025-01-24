import CourseModel from "../models/Course";
import jwt from 'jsonwebtoken';
import authMiddleware from "../middleware/auth";

const listCourse = async (req, res) => {
    const {user} = req.body;
    const code = user.slice(0,4).toupperCase();

    try{
        const course = await CourseModel.findAll({
            where:{
                courseCode: code
            }
        });
        if(!course){
            return res.json({success:false,message:"Courses does not exist"})
        }
        return res.json({success:true,course})
    }catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching courses" });
    }

    
    
};