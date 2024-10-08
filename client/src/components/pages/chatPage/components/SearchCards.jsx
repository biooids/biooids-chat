import React, { useState } from "react";

function SearchCards({ userId, profilePicture, userName, setChats }) {
  const { selectedChat, setSelectedChat } = useState();
  const accessChat = async () => {
    const res = await fetch("/api/chat/access-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (!data.success) {
      console.log(data.message);
      return;
    } else {
      setChats((prev) => [data.results, ...prev]);
    }
  };
  return (
    <li
      className="bg-white bg-opacity-5 p-3 rounded-lg flex flex-row items-center  "
      onClick={accessChat}
    >
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={profilePicture} alt="Tailwind-CSS-Avatar-component" />
        </div>
      </div>
      <p>{userName}</p>
    </li>
  );
}

export default SearchCards;
