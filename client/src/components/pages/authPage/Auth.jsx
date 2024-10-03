import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Auth() {
  return (
    <div>
      <nav className="p-3">
        <ul className="flex gap-3">
          <NavLink
            to="."
            end
            className={({ isActive }) =>
              `p-3 rounded-lg ${isActive ? "text-cyan-300 bg-slate-700 " : ""}`
            }
          >
            Log in
          </NavLink>
          <NavLink
            to="sign-up"
            className={({ isActive }) =>
              ` p-3 rounded-lg ${
                isActive ? "text-cyan-300 bg-slate-700  " : ""
              }`
            }
          >
            Sign Up
          </NavLink>
        </ul>
      </nav>
      <section className="">
        <Outlet />
      </section>
    </div>
  );
}

export default Auth;
