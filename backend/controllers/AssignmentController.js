import AssignmentModel from "../models/Assignment.js";
import TeacherModel from "../models/Teacher.js";
import StudentModel from "../models/Student.js";
import UserModel from "../models/User.js";


const addAssignment = async (req, res) => {
  try {
    const { teacherId, courseId, title, file } = req.body;

    // Validate request body
    if (!teacherId || !courseId || !title || !file) {
      return res.status(400).json({ success: false, message: "Invalid input data" });
    }

    // Check if teacher exists
    const user = await UserModel.findOne({ username: teacherId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const teacher = await TeacherModel.findOne({ userId: user._id });
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher does not exist" });
    }

    // Check if an assignment already exists for the given course and teacher
    let assignment = await AssignmentModel.findOne({ courseId, teacherId: teacher._id });

    if (!assignment) {
      // If not, create a new assignment
      assignment = new AssignmentModel({
        courseId,
        teacherId: teacher._id,
        title,
        file: { filename: file },
      });
    } else {
      // Update the existing assignment
      assignment.title = title;
      assignment.file = { filename: file };
    }

    // Save the assignment
    const updatedAssignment = await assignment.save();
    return res.json({
      success: true,
      message: "Assignment added/updated successfully",
      assignment: updatedAssignment,
    });
  } catch (error) {
    console.error("Error adding assignment:", error);
    return res.status(500).json({ success: false, message: "Error adding assignment" });
  }
};



//Submit an Assignment
const submitAssignment = async (req, res) => {
  try {
    const { studentId, courseId, title, file } = req.body;

    // Validate input
    if (!studentId || !courseId || !title || !file) {
      return res.status(400).json({ success: false, message: "Invalid input data" });
    }

    // Check if student exists
    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Check if assignment exists for the course and title
    const assignment = await AssignmentModel.findOne({ courseId, title });
    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    // Add submission to the assignment
    const updatedAssignment = await AssignmentModel.findByIdAndUpdate(
      assignment._id,
      {
        $push: {
          submissions: {
            studentId,
            submittedFile: { filename: file.filename },
            submittedAt: new Date(),
            status: "completed",
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Assignment submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    return res.status(500).json({ success: false, message: "Error submitting assignment" });
  }
};

// Grade an Assignment
const gradeAssignment = async (req, res) => {
  try {
    const { courseId, studentId, grade } = req.body;
    const user = await UserModel.findOne({username:studentId});
    // Check if assignment exists
    const assignment = await AssignmentModel.findOne({courseId:courseId});
    if (!assignment) {
      return res.json({ success: false, message: "Assignment not found" });
    }

    // Find the specific submission for the student
    const submission = assignment.submissions.find(sub => sub.studentId == user._id);
    if (!submission) {
      return res.json({ success: false, message: "Submission not found" });
    }

    // Update grade and status
    submission.grade = grade;
    // Save the updated assignment
    const updatedAssignment = await assignment.save();

    return res.json({ success: true, message: "Assignment graded successfully", assignment: updatedAssignment });
  } catch (error) {
    console.error("Error grading assignment:", error);
    return res.json({ success: false, message: "Error grading assignment" });
  }
};

// List Assignments for Teacher
const listAssignmentsForTeacher = async (req, res) => {
  try {
    const { teacherId ,courseId } = req.body;

    // Check if teacher exists
    const teacher = await TeacherModel.findOne({ userId: teacherId });
    if (!teacher) {
      return res.json({ success: false, message: "Teacher not found" });
    }

    // Find assignments for the teacher
    const assignments = await AssignmentModel.find({ courseId : courseId,
      teacherId: teacher._id ,});

    return res.json({ success: true, assignments });
  } catch (error) {
    console.error("Error listing assignments for teacher:", error);
    return res.json({ success: false, message: "Error listing assignments for teacher" });
  }
};

// List Assignments for Student
const listAssignmentsForStudent = async (req, res) => {
  try {
    const { studentId , courseId } = req.body;

    // Check if student exists
    const user = await UserModel.findOne({username:studentId});
      if (!user) {
      return res.json({ success: false, message: "Student not found" });
    }
    // Find assignments for the student (submissions)
    const assignments = await AssignmentModel.find({courseId:courseId});
    return res.json({ success: true, assignments });
  } catch (error) {
    console.error("Error listing assignments for student:", error);
    return res.json({ success: false, message: "Error listing assignments for student" });
  }
};

export default{ addAssignment,
                submitAssignment, 
                gradeAssignment, 
                listAssignmentsForTeacher,
                listAssignmentsForStudent
              };

