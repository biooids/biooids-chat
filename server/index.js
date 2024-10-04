import express from "express";
import connectMongoDB from "./config/db/mongoDB/mongoDB.js";
import { errorMiddleWare } from "./config/middleware/errorMiddleWare.js";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Server } from "socket.io";

import authRoutes from "../server/routes/auth.routes.js";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
connectMongoDB();

app.use("/api/auth", authRoutes);

app.use(errorMiddleWare);

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
  io.emit("userConnected", {
    name: "X",
    content: "User connected",
  });

  // Listen for a custom event from the client
  socket.on("message", (data) => {
    // Respond back to the client
    io.emit("serverMessage", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
