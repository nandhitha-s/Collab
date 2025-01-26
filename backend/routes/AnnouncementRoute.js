import express from "express";
import AnnouncementController from "../controllers/AnnouncementController.js";

const {addAnnouncement , listAnnouncement , listCourseAnnouncement} = AnnouncementController;

const announcementRouter = express.Router();

announcementRouter.post("/addAnnouncement",addAnnouncement);
announcementRouter.post("/listAnnouncement",listAnnouncement);
announcementRouter.post("/listCourseAnnouncement",listCourseAnnouncement);

export default announcementRouter;

