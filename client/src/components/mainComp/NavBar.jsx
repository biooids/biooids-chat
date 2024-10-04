import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleTheme } from "../../app/features/theme/themeSlice";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

function NavBar() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

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
          to="testing"
          className={({ isActive }) =>
            ` ${isActive ? "text-cyan-300 underline" : ""}`
          }
        >
          Testing
        </NavLink>
        {currentUser ? (
          currentUser.user.userName
        ) : (
          <NavLink
            to="auth"
            className={({ isActive }) =>
              ` ${isActive ? "text-cyan-300 underline" : ""}`
            }
          >
            Log In
          </NavLink>
        )}
      </ul>
      <div>
        {theme === "dark" ? (
          <IoSunny
            onClick={() => dispatch(toggleTheme())}
            className="cursor-pointer"
          />
        ) : (
          <FaMoon
            onClick={() => dispatch(toggleTheme())}
            className="cursor-pointer"
          />
        )}
      </div>
    </nav>
  );
}

export default NavBar;
