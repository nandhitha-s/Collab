import AssignmentModel from "../models/Assignment.js";
import TeacherModel from "../models/Teacher.js";
import UserModel from "../models/User.js";
import StudentModel from "../models/Student.js";
import upload from "../middleware/upload.js"; 

// Add an Assignment
const addAssignment = async (req, res) => {
  try {
    const { teacherId, courseId, title } = req.body;

    // Find the teacher's user ID
    const user = await UserModel.findOne({ username: teacherId });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const teacher = await TeacherModel.findOne({ userId: user._id });
    if (!teacher) {
      return res.json({ success: false, message: "Teacher does not exist" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    const { filename, contentType, id: fileId } = req.file; // File metadata from GridFS

    // Find existing assignment by courseId and teacherId, and append the new file
    const updatedAssignment = await AssignmentModel.findOneAndUpdate(
      { courseId, teacherId: teacher._id },
      {
        $push: { file: { filename, contentType, fileId } }, // Append new file
      },
      { upsert: true, new: true } // If no record is found, create a new one
    );

    return res.json({ success: true, message: "Assignment added/updated successfully", assignment: updatedAssignment });
  } catch (error) {
    console.error("Error adding assignment:", error);
    return res.json({ success: false, message: "Error adding assignment" });
  }
};

// Submit an Assignment
const submitAssignment = async (req, res) => {
  try {
    const { studentId, assignmentId } = req.body;

    // Find the student using their userId
    const user = await UserModel.findOne({ username: studentId });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const student = await StudentModel.findOne({ userId: user._id });
    if (!student) {
      return res.json({ success: false, message: "Student does not exist" });
    }

    // Check if the assignment exists
    const assignment = await AssignmentModel.findById(assignmentId);
    if (!assignment) {
      return res.json({ success: false, message: "Assignment not found" });
    }

    // If no file uploaded, return an error
    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    const { filename, contentType, id: fileId } = req.file; // File metadata from GridFS

    // Check if the student has already submitted the assignment
    const existingSubmission = assignment.submissions.find(
      (submission) => submission.studentId.toString() === student._id.toString()
    );

    if (existingSubmission) {
      return res.json({ success: false, message: "You have already submitted this assignment" });
    }

    // Create a submission record for the student
    const submission = {
      studentId: student._id,
      submittedFile: { filename, contentType, fileId },
      submittedAt: new Date(),
      status: "completed",  
    };

    assignment.submissions.push(submission);

    const updatedAssignment = await assignment.save();

    return res.json({
      success: true,
      message: "Assignment submitted successfully",
      assignment: updatedAssignment,
    });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    return res.json({ success: false, message: "Error submitting assignment" });
  }
};

// Grade an Assignment
const gradeAssignment = async (req, res) => {
  try {
    const { assignmentId, studentId, grade } = req.body; // grade will be a number from 0 to 100

    // Validate the grade value
    if (grade < 0 || grade > 100) {
      return res.json({ success: false, message: "Grade must be between 0 and 100" });
    }

    // Find the assignment by ID
    const assignment = await AssignmentModel.findById(assignmentId);
    if (!assignment) {
      return res.json({ success: false, message: "Assignment not found" });
    }

    // Find the submission for the student
    const submission = assignment.submissions.find(
      (submission) => submission.studentId.toString() === studentId.toString()
    );

    if (!submission) {
      return res.json({ success: false, message: "Submission not found for this student" });
    }

    // Add the grade to the submission
    submission.grade = grade;
    submission.status = "completed"; // Mark the submission as completed

    await assignment.save();

    return res.json({
      success: true,
      message: "Grade assigned successfully",
      assignment,
    });
  } catch (error) {
    console.error("Error grading assignment:", error);
    return res.json({ success: false, message: "Error grading assignment" });
  }
};

// List Assignments for Teachers (Full Details)
const listAssignmentsForTeacher = async (req, res) => {
  try {
    const { teacherId } = req.body; // Teacher's username

    // Find the teacher using their username
    const user = await UserModel.findOne({ username: teacherId });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const teacher = await TeacherModel.findOne({ userId: user._id });
    if (!teacher) {
      return res.json({ success: false, message: "Teacher does not exist" });
    }
    // Find assignments for the teacher
    const assignments = await AssignmentModel.find({ teacherId: teacher._id }).populate('submissions.studentId', 'username email');
    if (!assignments.length) {
      return res.json({ success: false, message: "No assignments found" });
    }

    return res.json({ success: true, assignments });
  } catch (error) {
    console.error("Error fetching assignments for teacher:", error);
    return res.json({ success: false, message: "Error fetching assignments" });
  }
};

// List Assignments for Students (Full Details)
const listAssignmentsForStudent = async (req, res) => {
  try {
    const { studentId } = req.body; // Student's username

    // Find the student using their username
    const user = await UserModel.findOne({ username: studentId });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const student = await StudentModel.findOne({ userId: user._id });
    if (!student) {
      return res.json({ success: false, message: "Student does not exist" });
    }

    // Find assignments for the student
    const assignments = await AssignmentModel.find({
      "submissions.studentId": student._id,
    }).populate("submissions.studentId", "username email");

    if (!assignments.length) {
      return res.json({ success: false, message: "No assignments found" });
    }

    // Map through assignments to include student submission status and grade if applicable
    const studentAssignments = assignments.map((assignment) => {
      const submission = assignment.submissions.find(
        (sub) => sub.studentId.toString() === student._id.toString()
      );
      return {
        ...assignment.toObject(),
        submissionStatus: submission ? submission.status : "pending",
        grade: submission && submission.grade ? submission.grade : null,
      };
    });

    return res.json({ success: true, assignments: studentAssignments });
  } catch (error) {
    console.error("Error fetching assignments for student:", error);
    return res.json({ success: false, message: "Error fetching assignments" });
  }
};

export default {
  addAssignment: [upload.single("file"), addAssignment], 
  submitAssignment: [upload.single("file"), submitAssignment],
  gradeAssignment,
  listAssignmentsForTeacher,
  listAssignmentsForStudent,
};
