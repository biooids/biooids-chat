//@ts-nocheck
import { useEffect, useState } from "react";
import { useSocket } from "../../../components/mainComp/SocketContext";

function GeneralRoom() {
  const socket = useSocket();
  const [messageFromServer, setMessageFromServer] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const getGeneralRoomMessage = async () => {
    const result = await fetch("/api/generalRoom/getGeneralRoomMessage");
    const data = await result.json();
    console.log("fetched data :", data);
    if (data.success) {
      setRoomMessages((previous) => [...previous, ...data.generalRoomMessages]);
    } else {
      console.log(data.message);
    }
  };

  useEffect(() => {
    getGeneralRoomMessage();
  }, []);

  useEffect(() => {
    socket.emit("messageForServer", "Hello, server!");

    socket.on("messageForClient", (data) => {
      setMessageFromServer(data.messageForClient);
    });

    socket.on("userMessageFromServer", (data) => {
      console.log("Received userMessage event on client:", data);
      setRoomMessages((previous) => [
        { generalRoomMessage: data },
        ...previous,
      ]);
    });

    socket.on("joinedGeneralRoom", (message) => {
      setRoomMessages((previous) => [
        { generalRoomMessage: message },
        ...previous,
      ]);
    });

    return () => {
      socket.off("joinedGeneralRoom");
      socket.off("messageForClient");
      socket.off("userMessageFromServer");
    };
  }, [socket]);

  const storeGeneralRoomMessage = async (generalRoomMessage) => {
    const result = await fetch("/api/generalRoom/storeGeneralRoomMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ generalRoomMessage }),
    });
    const data = await result.json();
    console.log("stored data :", data);
    return data.success;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await storeGeneralRoomMessage(userMessage);
    if (result) {
      socket.emit("userMessageFromClient", userMessage);
      setUserMessage("");
    }
  };

  return (
    <section className="flex flex-col gap-3 p-5">
      <h1>{messageFromServer}</h1>
      <h2>Current messages: {roomMessages.length}</h2>
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button type="submit" className="btn" disabled={!userMessage}>
          Submit
        </button>
      </form>
      <section className="flex flex-col gap-3 p-3 border-2 rounded-lg border-slate-700 h-[70vh] overflow-auto">
        {roomMessages.map((message, index) => (
          <p key={index}>{message.generalRoomMessage}</p>
        ))}
      </section>
    </section>
  );
}

export default GeneralRoom;
