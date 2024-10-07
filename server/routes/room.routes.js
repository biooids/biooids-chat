import express from "express";

import {
  getUsersInGeneralRoom,
  saveUserInGeneralRoom,
} from "../controllers/room.controllers.js";

const router = express.Router();

router.get("/getUsersInGeneralRoom", getUsersInGeneralRoom);
router.post("/saveUserInGeneralRoom", saveUserInGeneralRoom);

export default router;
