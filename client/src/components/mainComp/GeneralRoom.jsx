import React, { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actionSuccess } from "../../app/features/user/userSlice";

function GeneralRoom() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const socket = useSocket();
  const [isJoining, setIsJoining] = useState(false);

  // Handle socket event management and cleanup
  useEffect(() => {
    joinGeneralRoom();
    userJoinedGeneralRoom();
    getUsersInGeneralRoom();

    if (socket) {
      // Cleanup listener on component unmount or before re-attaching
      return () => {
        socket.off("userJoinedGeneralRoom");
      };
    }
  }, [socket]);

  // Join the general room
  const joinGeneralRoom = () => {
    if (socket && !isJoining) {
      setIsJoining(true); // Disable future clicks until the process completes
      socket.emit("joinGeneralRoom", { userName: currentUser.user.userName });
    }
  };

  const userJoinedGeneralRoom = () => {
    if (socket) {
      socket.on("userJoinedGeneralRoom", (data) => {
        saveUserInGeneralRoom(data);
        // setUsers((prevUsers) => {
        //   if (prevUsers.some((user) => user.userName === data.userName)) {
        //     return prevUsers;
        //   }
        //   return [data, ...prevUsers];
        // });
        setIsJoining(false);
      });
    }
  };

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
        dispatch(actionSuccess(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUsersInGeneralRoom = async () => {
    try {
      const res = await fetch("/api/generalRoom/getUsersInGeneralRoom");
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        console.log(data.message);
      }
      setUsers(data.usersInGeneralRoom);
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
      <section className="flex m-auto p-3  gap-3">
        <div className="p-3 border-2 border-cyan-500">
          <p>Active users</p>
          <ul className="mt-3">
            {users
              ? users.map((user, index) => (
                  <li key={index} className="">
                    {user.userName}
                  </li>
                ))
              : ""}
          </ul>
        </div>
        <div className="p-3 border-2 border-cyan-500">message here</div>
      </section>
    </section>
  );
}

export default GeneralRoom;
