import React, { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider"; // Import the hook

function Testing() {
  const socket = useSocket(); // Access the socket
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    if (socket) {
      socket.emit("message", "Hello from testing component!");
    }
  };
  useEffect(() => {
    if (socket) {
      // Listen for events from the server
      socket.on("serverMessage", (data) => {
        setMessage(data);
      });

      // Cleanup listener on unmount
      return () => socket.off("serverMessage");
    }
  }, [socket]);

  return (
    <div className="bg-slate-700 w-fit m-auto mt-3 p-3">
      <div></div>
      <div></div>
      <button className="btn" onClick={sendMessage}>
        Send Message
      </button>
      <p>Message from server: {message}</p>
    </div>
  );
}

export default Testing;
