import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/soft-biooid.appspot.com/o/xi-biooid.jpg?alt=media&token=cc88392f-090c-4361-a8a5-d5dab8d7d846",
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);
export default User;
