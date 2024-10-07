import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function JoinedGeneralRoom() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.user.joinedGeneralRoom ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default JoinedGeneralRoom;
