import UserInGeneralRoom from "../models/user.in.general.room.model.js";
import User from "../models/user.model.js";

export const saveUserInGeneralRoom = async (req, res, next) => {
  const { userName } = req.body;
  try {
    // Check if user already exists in the general room
    const validUser = await User.findOne({ userName });
    if (!validUser) {
      next(errorHandler(404, "User not found Sign Up"));
      return;
    }
    const user = await UserInGeneralRoom.findOne({ userName });
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User already in general room",
        user: validUser,
      });
    }

    // Save user in the general room
    validUser.joinedGeneralRoom = true;
    const updatedUser = await validUser.save();

    const newUserInGeneralRoom = new UserInGeneralRoom({ userName });
    const savedUserInGeneralRoom = await newUserInGeneralRoom.save();

    res.status(201).json({
      success: true,
      message: "User saved successfully",
      savedUserInGeneralRoom,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsersInGeneralRoom = async (req, res, next) => {
  const usersInGeneralRoom = await UserInGeneralRoom.find();

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    usersInGeneralRoom,
  });
};
