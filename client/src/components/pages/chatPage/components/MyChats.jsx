import React, { useEffect, useState } from "react";

function MyChats({ userName }) {
  return (
    <li className="bg-white bg-opacity-5 p-3 rounded-lg flex flex-row items-center  ">
      {userName}
    </li>
  );
}

export default MyChats;
