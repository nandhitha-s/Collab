import express from 'express';
import TeacherController from "../controllers/TeacherController.js";
const { addCourse, listTeacherCourse } = TeacherController;

const teacherRouter = express.Router();

teacherRouter.post("/addCourse",addCourse);
teacherRouter.post("/listTeacherCourse",listTeacherCourse);

export default teacherRouter;