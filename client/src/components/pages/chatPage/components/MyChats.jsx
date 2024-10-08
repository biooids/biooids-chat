import React, { useEffect, useState } from "react";

function MyChats() {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const res = await fetch("/api/chat/fetch-chats");
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setChats(data.results);
      } else {
        console.error("Failed to fetch chats:", data.message);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <section className="bg-white bg-opacity-5 rounded-lg p-3 flex flex-col gap-3">
      <p>MyChats</p>
      <ul className="flex flex-col gap-3">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <li
              key={chat._id}
              className="bg-white bg-opacity-5 p-3 rounded-lg flex flex-row items-center  "
            >
              hiii
            </li>
          ))
        ) : (
          <p>No chats found.Yet !</p>
        )}
      </ul>
    </section>
  );
}

export default MyChats;
