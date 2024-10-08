import React from "react";
import SideDrawer from "./components/SideDrawer";
import MyChats from "./components/MyChats";
import MyChatBox from "./components/MyChatBox";

function ChatPage() {
  return (
    <section className="w-full">
      <SideDrawer />
      <section className="grid grid-cols-2 gap-3 ">
        <MyChats />
        <MyChatBox />
      </section>
    </section>
  );
}

export default ChatPage;
