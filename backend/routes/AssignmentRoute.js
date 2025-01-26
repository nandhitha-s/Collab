import express from "express";
import AssignmentController from "../controllers/AssignmentController.js";


// Destructure the required functions from the controller
const { addAssignment } = AssignmentController;

// Initialize the router
const assignmentRouter = express.Router();

// Define the routes
assignmentRouter.post("/addAssignment", addAssignment);
// assignmentRouter.post("/submitAssignment", upload.single("file"), submitAssignment);
// assignmentRouter.post("/gradeAssignment", gradeAssignment);
// assignmentRouter.post("/listAssignmentsForTeacher", listAssignmentsForTeacher);
// assignmentRouter.post("/listAssignmentsForStudent", listAssignmentsForStudent);

export default assignmentRouter;
