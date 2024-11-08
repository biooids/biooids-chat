import { Server, Socket } from "socket.io";

export const handleSocketConnection = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    // Initialize `hasJoined` for this socket connection
    socket.data.hasJoined = false;

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
      socket.data.hasJoined = true; // Set `hasJoined` to true for this socket

      // Emit room status message to everyone in the generalRoom
      io.to("generalRoom").emit("joinedGeneralRoom", data);
    });

    socket.on("userMessageFromClient", (data) => {
      console.log("Received user message:", data);
      io.to("generalRoom").emit("userMessageFromServer", data);
    });

    socket.on("leaveGeneralRoom", () => {
      if (socket.data.hasJoined) {
        const username = socket.data.username || "A user";
        console.log(`${username} is leaving the room`);

        // Emit a message to the room that the user has left
        io.to("generalRoom").emit(
          "leftGeneralRoom",
          `${username} has left the room`
        );

        // Update `hasJoined` and remove the socket from the room
        socket.data.hasJoined = false;
        socket.leave("generalRoom");
      }
    });

    socket.on("disconnect", () => {
      if (socket.data.hasJoined) {
        const username = socket.data.username || "A user";
        io.to("generalRoom").emit(
          "leftGeneralRoom",
          `${username} has left the room`
        );
      }
      console.log("User disconnected");
    });
  });
};
