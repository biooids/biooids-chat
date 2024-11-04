import express, { NextFunction, Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import generalRoomRoutes from "./routes/general.room.routes";

dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = 3000;

if (!process.env.MONGO) {
  throw new Error("MONGO environment variable is missing.");
}
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

app.use(express.json());
app.use(cookieParser());

app.use("/api/generalRoom", generalRoomRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || 500;
  const message =
    `action failed due to : ${error.message}` ||
    "action failed due to : internal server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace this with the URL where Vite is running
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("messageForServer", (data) => {
    console.log(data);
    socket.emit("messageForClient", {
      messageForClient: `hello, ${socket.id}`,
      clientName: socket.id,
    });
  });

  socket.on("joinGeneralRoom", (data) => {
    console.log(data);
    socket.join("generalRoom");

    io.to("generalRoom").emit("roomStatus", `${data} has joined the room`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  const addressInfo = server.address();

  if (addressInfo && typeof addressInfo !== "string") {
    const { address, port } = addressInfo;
    console.log(`Server is listening at http://${address}:${port}`);
  } else {
    console.log("Unable to retrieve server address information.");
  }
});
