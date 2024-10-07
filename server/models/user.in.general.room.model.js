import mongoose from "mongoose";
const { Schema } = mongoose;

const userInGeneralRoomSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    content: {
      type: Array,
      default: [],
    },
  },
  { timeStamp: true }
);

const UserInGeneralRoom = mongoose.model(
  "UserInGeneralRoom",
  userInGeneralRoomSchema
);
export default UserInGeneralRoom;
