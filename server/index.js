import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "../server/routes/auth.routes.js";

import { Server } from "socket.io"; // Import Socket.IO

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

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow connections from your front-end, adjust as necessary
    methods: ["GET", "POST"], // Allowed HTTP methods
    credentials: true, // Allow cookies
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for a custom event from the client
  socket.on("message", (data) => {
    console.log("Message received:", data);
    // Respond back to the client
    socket.emit("serverMessage", `Received this message: ${data}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
