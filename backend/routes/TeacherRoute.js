import express from 'express';
import {addCourse,listTeacherCourse} from '../controllers/TeacherController.js';

const teacherRouter = express.Router();

teacherRouter.post("/addCourse",addCourse);
teacherRouter.post("/listTeacherCourse",listTeacherCourse);

export default teacherRouter;