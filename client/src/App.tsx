//@ts-nocheck
import { useEffect, useState, useRef } from "react";
import { useSocket } from "./components/mainComp/SocketContext";

function App() {
  const socket = useSocket();
  const [messageFromServer, setMessageFromServer] = useState("");
  const [roomStatus, setRoomStatus] = useState([]);
  const hasJoinedRoom = useRef(false);

  const storeGeneralRoomMessage = async (generalRoomMessage: string) => {
    const result = await fetch("/api/generalRoom/storeGeneralRoomMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ generalRoomMessage }),
    });
    const data = await result.json();
    console.log(data);
  };

  useEffect(() => {
    socket.emit("messageForServer", "Hello, server!");

    socket.on("messageForClient", (data) => {
      console.log(data);
      setMessageFromServer(data.messageForClient);

      if (!hasJoinedRoom.current) {
        socket.emit("joinGeneralRoom", data.clientName);
        hasJoinedRoom.current = true; // Set this flag to avoid re-joining
      }
    });

    socket.on("roomStatus", (data) => {
      setRoomStatus((previous) => [...previous, data]);

      storeGeneralRoomMessage(data);
    });

    return () => {
      socket.off("messageForClient");
      socket.off("roomStatus");
    };
  }, [socket]);

  return (
    <section className="flex flex-col gap-3">
      <h1>{messageFromServer}</h1>
      <section className="flex flex-col gap-3">
        {roomStatus.map((status) => (
          <p>{status}</p>
        ))}
      </section>
    </section>
  );
}

export default App;
