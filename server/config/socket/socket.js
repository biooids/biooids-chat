export const joinTestingRoom = (socket, io) => {
  socket.on("joinGeneralRoom", (data) => {
    socket.join("generalRoom");
    console.log(`User with name: ${data.userName} joined room: generalRoom`);
    io.to("generalRoom").emit("userJoinedGeneralRoom", data);
  });
};
//   socket.on("leaveTestingRoom", (data) => {
//     socket.leave("testing");
//     console.log(`User with name: ${data.userName} left room: testing`);
//     io.to("testing").emit("userLeft", data);
//   });
// };

// const sendMessage = (socket, io) => {
//   socket.on("sendMessage", (data) => {
//     io.to("testing").emit("receiveMessage", {
//       ...data,
//       id: socket.id,
//     });
//   });
