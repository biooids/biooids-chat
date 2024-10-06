const joinTestingRoom = (socket, io) => {
  // Listen for the event that requests to join the "testing" room
  socket.on("joinTestingRoom", (data) => {
    socket.join("testing"); // Join the "testing" room
    console.log(`User with name: ${data.userName} joined room: testing`);

    // Emit event to the room when a new user joins
    io.to("testing").emit("userJoined", data);
  });

  // Handle user leaving the room
  socket.on("leaveTestingRoom", (data) => {
    socket.leave("testing"); // Leave the "testing" room
    console.log(`User with name: ${data.userName} left room: testing`);
    // Emit an event to notify the room that the user left
    io.to("testing").emit("userLeft");
  });
};

const sendMessage = (socket, io) => {
  socket.on("sendMessage", (data) => {
    io.to("testing").emit("receiveMessage", {
      ...data,
      id: socket.id,
    });
  });
};

export { joinTestingRoom, sendMessage };
