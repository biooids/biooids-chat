import React, { useEffect, useState } from "react";
import SideDrawer from "./components/SideDrawer";
import MyChats from "./components/MyChats";
import MyChatBox from "./components/MyChatBox";
import CreateGroup from "./components/CreateGroupChat";

function ChatPage() {
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
    <section className="w-full">
      <SideDrawer setChats={setChats} />
      <section className="grid grid-cols-2 gap-3 ">
        <ul className="flex flex-col gap-3 bg-white bg-opacity-5 p-3">
          <div className="flex  gap-3 items-center ">
            <p>My chats</p>

            <CreateGroup />
          </div>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li
                key={chat._id}
                className="bg-white bg-opacity-5 p-3 rounded-lg flex flex-row items-center  "
              >
                <MyChats />
              </li>
            ))
          ) : (
            <p>No chats found.Yet !</p>
          )}
        </ul>

        <MyChatBox />
      </section>
    </section>
  );
}

export default ChatPage;
