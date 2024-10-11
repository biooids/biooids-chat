import React from "react";
import UpdateGroup from "./UpdateGroup";

function MyChatBox({ chat }) {
  return (
    <section className="bg-white bg-opacity-5 gap-3 p-3 rounded-lg ">
      <div className="flex justify-between">
        <h2 className="p-3">Name: {chat.chatName} </h2>
        {chat.isGroupChat ? <UpdateGroup chat={chat} /> : ""}
      </div>
      <section className="bg-white bg-opacity-5 gap-3 p-3 rounded-lg min-h-screen"></section>
    </section>
  );
}

export default MyChatBox;
