import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "dotenv/config"
import userRouter from "./routes/UserRoute.js";
import courseRouter from "./routes/CourseRoute.js";
import authMiddleware from "./middleware/auth.js";

const app = express()
const port = process.env.PORT

app.use(express.json()) 
app.use(cors()) 

app.get("/",(req,res)=>{
    res.send("Connected")
}) 

connectDB();

app.use("/api/auth/user",userRouter)
app.use("api/auth/course",authMiddleware,courseRouter)

app.listen(port,()=>{
    console.log(`running on port ${port}`)
})

