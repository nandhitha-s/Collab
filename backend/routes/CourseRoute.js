import express from 'express';
import {listCourse} from '../controllers/CourseController.js';

const courseRouter = express.Router();

courseRouter.post("/dashboard",listCourse);

export default courseRouter;
