import express from 'express';
import {listCourse,listAllCourse} from '../controllers/CourseController.js';

const courseRouter = express.Router();

courseRouter.post("/dashboard",listCourse);
courseRouter.post("/allCourse",listAllCourse);

export default courseRouter;
