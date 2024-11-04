import mongoose from "mongoose";

const generalRoomSchema = new mongoose.Schema(
  {
    generalRoomMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const GeneralRoom = mongoose.model("GeneralRoom", generalRoomSchema);

export default GeneralRoom;
