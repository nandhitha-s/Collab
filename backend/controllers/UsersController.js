import UserModel from "../models/User.js";
import StudentModel from "../models/Student.js";
import TeacherModel from "../models/Teacher.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
    
    const { userName, password } = req.body;
    try {
        
        const user = await UserModel.findOne({ username: userName });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({ success: false, message: "Enter a valid Password" });
        }

    
        const token = createToken(user._id);
        return res.json({ success: true, token , role: user.role});

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error in login" });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
}

const registerUser = async (req, res) => {
    const { userName, name, role, password } = req.body;
    

    try {
        // Check if required fields are missing
        if (!userName || !name || !role || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const exists = await UserModel.findOne({ username: userName });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate password length
        if (password && password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username: userName,
            password: hashedPassword,
            role: role,
        });
        const user = await newUser.save();

        if (role === "student") {
            const student = new StudentModel({
                userId: user._id,
                name: name,
                enrolledCourses: [],
            });
            await student.save();
        } else if (role === "teacher") {
            const teacher = new TeacherModel({
                userId: user._id,
                name: name,
                teachingCourses: [],
            });
            await teacher.save();
        }

        const token = createToken(user._id);
        return res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error in adding user" });
    }
};

export { loginUser, registerUser };
