import { Server, Socket } from "socket.io";

export const handleSocketConnection = (io: Server) => {
  io.on("connection", (socket: Socket) => {
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
};
