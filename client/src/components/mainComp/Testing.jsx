import React, { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import { useSelector } from "react-redux";

function Testing() {
  const { currentUser } = useSelector((state) => state.user);
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]); // State to store messages
  const [message, setMessage] = useState({
    userName: currentUser.user.userName,
    content: "",
  });

  // Handle user leaving the room
  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit("leaveTestingRoom", { userName: currentUser.user.userName });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit("joinTestingRoom", { userName: currentUser.user.userName });
    }

    if (socket) {
      socket.on("userJoined", (data) => {
        setUsers((prevUsers) => [...prevUsers, data.userName]); // Add the user to the list
      });

      // Listen for messages from the server
      socket.on("receiveMessage", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }

    // Cleanup the event listeners when the component is unmounted
    return () => {
      if (socket) {
        socket.off("userJoined");
        socket.off("receiveMessage");
        socket.emit("leaveTestingRoom", {
          userName: currentUser.user.userName,
        });
      }
    };
  }, [socket]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setMessage((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (socket) {
      socket.emit("sendMessage", message);
      setMessage((prev) => ({ ...prev, content: "" }));
    }
  };

  return (
    <div className="flex gap-3 p-5">
      <div>
        <p>Active users:</p>
        <ul>
          {users.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <ul>
            {messages.map((message, index) => (
              <li key={index} className="flex gap-3">
                <p>{message.userName}:</p>
                <p>{message.content}</p>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            id="content"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            autoComplete="off"
            value={message.content}
            onChange={handleChange}
          />
          <button type="submit" className="btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Testing;
