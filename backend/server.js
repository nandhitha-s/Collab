import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/UserRoute.js";
import courseRouter from "./routes/CourseRoute.js";
import authMiddleware from "./middleware/auth.js";
import teacherRouter from "./routes/TeacherRoute.js";
import mongoose from "mongoose";

dotenv.config(); 

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(
  cors({
    origin: ["https://collab-frontend-putq.onrender.com"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Connected");
});

connectDB();

app.use("/api/auth/user", userRouter);
app.use("/api/auth/course", courseRouter);
app.use("/api/auth/teacher", teacherRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
