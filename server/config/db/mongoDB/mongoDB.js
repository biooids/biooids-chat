// db.js
import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB Atlas connected");
  } catch (error) {
    console.error("MongoDB Atlas connection failed:", error.message);
    process.exit(1);
  }
};

export default connectMongoDB;
