import express from "express";

import {
  //   forgotPassword,
  logIn,
  signUp,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/log-in", logIn);

export default router;
