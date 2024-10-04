import React, { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider"; // Import the hook

function Testing() {
  const socket = useSocket(); // Access the socket
  const [sentMessage, setSentMessage] = useState({
    name: "X",
    content: "",
  });
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [messageSucceeded, setMessageSucceeded] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSentMessage((prev) => ({ ...prev, content: value }));
    setMessageSucceeded(false);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("message", sentMessage);
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on("userConnected", (data) => {
        console.log(data);
        setReceivedMessages((prev) => [data, ...prev]);
      });
      socket.on("serverMessage", (data) => {
        console.log(data);
        setReceivedMessages((prev) => [data, ...prev]);
        setMessageSucceeded(true);
      });

      // Cleanup listener on unmount
      return () => socket.off("serverMessage");
    }
  }, [socket]);

  return (
    <div className="bg-slate-700 w-fit m-auto mt-3 p-3 flex flex-col gap-3">
      <p>Messages from server:</p>
      <ul className="bg-black p-3 rounded-lg">
        {receivedMessages.map((message) => (
          <li>
            <span>{message.name}</span>
            <p>{message.content}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage} className="flex gap-3">
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type here"
          className="input input-bordered "
          value={messageSucceeded ? "" : sentMessage.content}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          send
        </button>
      </form>
    </div>
  );
}

export default Testing;
