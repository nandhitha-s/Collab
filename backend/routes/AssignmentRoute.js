import express from "express";
import AssignmentController from "../controllers/AssignmentController.js";


// Destructure the required functions from the controller
const { addAssignment, 
        submitAssignment,
        gradeAssignment,
        listAssignmentsForTeacher,
        listAssignmentsForStudent } = AssignmentController;


const assignmentRouter = express.Router();

assignmentRouter.post("/addAssignment", addAssignment);
assignmentRouter.post("/submitAssignment",submitAssignment);
assignmentRouter.post("/gradeAssignment", gradeAssignment);
assignmentRouter.post("/listAssignmentsForTeacher", listAssignmentsForTeacher);
assignmentRouter.post("/listAssignmentsForStudent", listAssignmentsForStudent);

export default assignmentRouter;
