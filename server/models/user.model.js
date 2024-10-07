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
    joinedGeneralRoom: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);
export default User;
