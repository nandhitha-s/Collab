import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://user1:user4022@cluster0.oqr6k.mongodb.net/collab?retryWrites=true&w=majority").then(()=>{
        console.log("Database connected")
    })
}
