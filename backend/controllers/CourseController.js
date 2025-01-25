import CourseModel from "../models/Course.js";

const listCourse = async (req, res) => {
    const {userName} = req.body;    
    const code = userName.slice(0,4).toUpperCase();
    
    try {
        // Query MongoDB for courses matching the given code
        const courses = await CourseModel.find({ name: code });
    
        // Check if courses exist
        if (!courses || courses.length === 0) {
          return res.json({ success: false, message: "Courses do not exist" });
        }
    
        // Extract courseCodes and courseNames from the description array
        const courseCodes = courses.flatMap((item) =>
          item.description.map((desc) => desc.courseCode)
        );
        const courseNames = courses.flatMap((item) =>
          item.description.map((desc) => desc.courseName)
        );
    
        // Send response
        return res.json({ success: true, courseCodes, courseNames });
      }catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching courses" });
    }
    
};

const listAllCourse = async (req, res) => {
  try { 
    const courses = await CourseModel.find();

    
    if (!courses || courses.length === 0) {
      return res.json({ success: false, message: "No courses found" });
    }

    const courseCodes = courses.flatMap((item) =>
      item.description.map((desc) => desc.courseCode)
    );
    const courseNames = courses.flatMap((item) =>
      item.description.map((desc) => desc.courseName)
    );

    
    return res.json({ success: true, courseCodes, courseNames });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error fetching courses" });
  }
};


export { listCourse, listAllCourse };