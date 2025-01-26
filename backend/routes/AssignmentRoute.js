import express from "express";
import AssignmentController from "../controllers/AssignmentController.js";
import upload from "../middleware/upload.js";

// Destructure the required functions from the controller
const { addAssignment, submitAssignment, gradeAssignment, listAssignmentsForTeacher, listAssignmentsForStudent } = AssignmentController;

// Initialize the router
const assignmentRouter = express.Router();

// Define the routes
assignmentRouter.post("/addAssignment", upload.single("file"), addAssignment);
assignmentRouter.post("/submitAssignment", upload.single("file"), submitAssignment);
assignmentRouter.post("/gradeAssignment", gradeAssignment);
assignmentRouter.post("/listAssignmentsForTeacher", listAssignmentsForTeacher);
assignmentRouter.post("/listAssignmentsForStudent", listAssignmentsForStudent);

export default assignmentRouter;
