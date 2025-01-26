import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
    trim: true,
  },
  messages: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
        required: true,
      },
      msg: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

const AnnouncementModel = mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);

export default AnnouncementModel;
