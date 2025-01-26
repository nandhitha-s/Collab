import exp from "constants";
import AnnouncementModel from "../models/Annoucements.js";
import TeacherModel from "../models/Teacher.js";
import UserModel from "../models/User.js";

const addAnnouncement = async (req, res) => {
  const { teacherId, courseCode, message } = req.body;

  try {
    // Find the teacher's user ID
    const user = await UserModel.findOne({ username: teacherId });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const id = user._id;
    const teacher = await TeacherModel.findOne({ userId: id });
    if (!teacher) {
      return res.json({ success: false, message: "Teacher does not exist" });
    }

    // Add or update the announcement
    const updatedAnnouncement = await AnnouncementModel.findOneAndUpdate(
      { userId: id, courseCode }, 
      {
        $push: { messages: { msg: message, timestamp: new Date() } }, // Add new message to messages array
      },
      { upsert: true, new: true } // Create a new announcement if not found, and return the updated document
    );

    return res.json({ success: true, announcement: updatedAnnouncement });
  } catch (error) {
    console.error("Error adding announcement:", error);
    return res.json({ success: false, message: "Error adding announcement" });
  }
};

const listAnnouncement = async (req, res) => {
  const { teacherId } = req.body;

  try {
    const user = await UserModel.findOne({ username: teacherId });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const id = user._id;
    const teacher = await TeacherModel.findOne({ userId: id });
    if (!teacher) {
      return res.json({ success: false, message: "Teacher does not exist" });
    }

    const announcements = await AnnouncementModel.find({ userId: id }, "messages");
    const messages = announcements.flatMap((announcement) => announcement.messages);

    return res.json({ success: true, messages });
  } catch (error) {
    console.log("Error fetching announcements:", error);
    return res.json({ success: false, message: "Error fetching announcements" });
  }
};

const listCourseAnnouncement = async (req, res) => {
  const { courseCode } = req.body;

  try {
    const announcements = await AnnouncementModel.find({ courseCode: courseCode });
    return res.json({ success: true, announcements });
  } catch (error) {
    console.log("Error fetching announcements:", error);
    return res.json({ success: false, message: "Error fetching announcements" });
  }
};

export default { addAnnouncement, listAnnouncement, listCourseAnnouncement };
