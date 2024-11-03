import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

io.on("connection", (socket) => {
  console.log("a user connected");
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
