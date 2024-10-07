import React, { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actionSuccess } from "../../app/features/user/userSlice";

function Testing() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const socket = useSocket();
  const [isJoining, setIsJoining] = useState(false);

  // Join the general room on button click
  const joinGeneralRoom = () => {
    if (socket && !isJoining) {
      setIsJoining(true); // Disable future clicks until the process completes
      socket.emit("joinGeneralRoom", { userName: currentUser.user.userName });
    }
  };

  // Handle socket event management and cleanup
  useEffect(() => {
    if (socket) {
      socket.on("userJoinedGeneralRoom", (data) => {
        saveUserInGeneralRoom(data); // Save user in the general room
        getUsersInGeneralRoom(); // Get all users in the general room
        setIsJoining(false); // Re-enable button clicks
      });

      // Cleanup listener on component unmount or before re-attaching
      return () => {
        socket.off("userJoinedGeneralRoom");
      };
    }
  }, [socket]);

  const saveUserInGeneralRoom = async (user) => {
    try {
      const res = await fetch("/api/generalRoom/saveUserInGeneralRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        navigate("/generalRoom");
      }
      dispatch(actionSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
  const getUsersInGeneralRoom = async () => {
    try {
      const res = await fetch("/api/generalRoom/getUsersInGeneralRoom");
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col gap-3 p-3 w-fit m-auto bg-white bg-opacity-5 mt-3 rounded-lg">
      <h2 className="text-3xl">General Chat Room</h2>
      <ul>
        <p>Rules to follow</p>
        <li>Be nice</li>
        <li>Be kind</li>
        <li>Be helpful</li>
        <li>Be cool</li>
        <li>Be awesome</li>
        <li>Be fun</li>
        <li>Be interesting</li>
      </ul>

      <button
        className="btn w-full"
        onClick={joinGeneralRoom}
        disabled={isJoining}
      >
        Enter
      </button>
    </section>
  );
}

export default Testing;
