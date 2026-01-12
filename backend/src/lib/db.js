import mongoose from "mongoose";
export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MONGODB connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        console.log("URI:", process.env.MONGODB_URI);

        process.exit(1);
    }
}