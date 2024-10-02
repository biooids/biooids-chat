import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function MainLayout() {
  return (
    <div>
      <NavBar />
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default MainLayout;
