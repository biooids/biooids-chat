import express from "express";

import { getUsers } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/get-users", getUsers);

export default router;
