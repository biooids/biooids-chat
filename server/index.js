import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "../server/routes/auth.routes.js";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB Atlas connected");
  })
  .catch((error) => {
    console.log(
      "MongoDB Atlas failed to connect due to error :",
      error.message || error
    );
  });

app.use("/api/auth", authRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message =
    `action failed due to : ${error.message}` ||
    "action failed due to : internal server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server is running at http://${host}:${port}`);
});
