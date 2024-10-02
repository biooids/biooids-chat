import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="p-5 flex justify-between items-center border-b-2 border-cyan-700">
      <span>biooids Chat</span>
      <ul className="flex gap-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            ` ${isActive ? "text-cyan-300 underline" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="home"
          className={({ isActive }) =>
            ` ${isActive ? "text-cyan-300 underline" : ""}`
          }
        >
          Log In
        </NavLink>
      </ul>
      <span>light</span>
    </nav>
  );
}

export default NavBar;
