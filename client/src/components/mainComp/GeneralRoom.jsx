import React, { useEffect, useState } from "react";

function GeneralRoom() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsersInGeneralRoom = async () => {
      try {
        const res = await fetch("/api/generalRoom/getUsersInGeneralRoom");
        const data = await res.json();
        console.log(data);
        if (!data.success) {
          console.log(data.message);
          return;
        }
        setUsers(data.usersInGeneralRoom);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersInGeneralRoom();
  }, []);
  return (
    <section className="flex m-auto p-3 w-fit gap-3">
      <div className="p-3 border-2 border-cyan-500">
        <p>Active users</p>
        <ul className="mt-3">
          {users.map((user, index) => (
            <li key={index} className="">
              {user.userName}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3 border-2 border-cyan-500">message here</div>
      {/* <button className="btn" onClick={getUsersInGeneralRoom}>
        get
      </button> */}
    </section>
  );
}

export default GeneralRoom;
