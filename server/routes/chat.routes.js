import express from "express";
import { verifyUserUtil } from "../config/utils/verifyUserUtil.js";
import {
  accessChat,
  addToGroup,
  createGroup,
  fetchChats,
  renameGroup,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/access-chat", verifyUserUtil, accessChat);
router.post("/fetch-chats", verifyUserUtil, fetchChats);
router.post("/create-group", verifyUserUtil, createGroup);
router.put("/rename-group", verifyUserUtil, renameGroup);
router.put("/add-into-group", verifyUserUtil, addToGroup);
router.put("/remove-from-group", verifyUserUtil);

export default router;
