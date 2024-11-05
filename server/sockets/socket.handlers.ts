import { Server, Socket } from "socket.io";

export const handleSocketConnection = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    socket.on("messageForServer", (data) => {
      console.log("Message received from client:", data);
      socket.emit("messageForClient", {
        messageForClient: `Hello, ${socket.id}`,
        clientName: socket.id,
      });
    });

    socket.on("joinGeneralRoom", (data) => {
      console.log(`${data} is joining the room`);
      socket.join("generalRoom");

      // Emit room status message to everyone in the generalRoom
      io.to("generalRoom").emit("roomStatus", `${data} has joined the room`);
    });

    socket.on("userMessageFromClient", (data) => {
      console.log("Received user message:", data);
      io.to("generalRoom").emit("userMessageFromServer", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
