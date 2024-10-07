import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  { timeStamp: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
