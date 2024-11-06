//@ts-nocheck
import express from "express";
import {
  getGeneralRoomMessage,
  storeGeneralRoomMessage,
} from "../controllers/general.room.controllers";

const router = express.Router();

router.post("/storeGeneralRoomMessage", storeGeneralRoomMessage);
router.get("/getGeneralRoomMessage", getGeneralRoomMessage);

export default router;
