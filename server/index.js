import express from "express";
import connectMongoDB from "./config/db/mongoDB/mongoDB.js";
import { errorMiddleWare } from "./config/middleware/errorMiddleWare.js";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { Server } from "socket.io";
import { joinTestingRoom } from "./config/socket/socket.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
connectMongoDB();

// routes end points
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

//error middle ware
app.use(errorMiddleWare);

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server is running at http://${host}:${port}`);
});

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  joinTestingRoom(socket, io);
  // sendMessage(socket, io);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
