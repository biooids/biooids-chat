import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <h1>Welcome to biooids Chat</h1>
      <Outlet />
    </div>
  );
}

export default MainLayout;
