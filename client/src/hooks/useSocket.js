// useSocket.js
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url); // Connect to your server

    setSocket(socketIo);

    // Cleanup on unmount
    return () => {
      socketIo.disconnect();
    };
  }, [url]);

  return socket;
};

export default useSocket;
