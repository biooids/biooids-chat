import { createContext, useContext, useEffect, ReactNode } from "react";
import { io } from "socket.io-client";

const URL = "http://localhost:3000"; // Your backend server URL
const socket = io(URL, {
  autoConnect: false, // Prevents automatic connection on instance creation
});

const SocketContext = createContext(socket);

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  useEffect(() => {
    // Connect the socket when the provider mounts
    socket.connect();

    // Optionally add any global event listeners
    socket.on("connect", () => {
      console.log("Socket connected");
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Clean up: disconnect the socket when the provider unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
