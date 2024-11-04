import { NextFunction, Request, Response } from "express";
import GeneralRoom from "../models/general.room.model";

export const storeGeneralRoomMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("data from body", req.body);
  const { generalRoomMessage } = req.body;

  try {
    const updateGeneralRoom = new GeneralRoom({
      generalRoomMessage,
    });
    const updatedGeneralRoom = await updateGeneralRoom.save();
    res.status(201).json({
      success: true,
      message: "updated general room",
      updatedGeneralRoom,
    });
  } catch (error) {
    next(error);
  }
};

export const getGeneralRoomMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const generalRoomMessages = await GeneralRoom.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Fetched general room messages",
      generalRoomMessages,
    });
  } catch (error) {
    next(error);
  }
};
