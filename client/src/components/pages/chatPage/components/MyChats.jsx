import React, { useEffect, useState } from "react";

function MyChats({ userName }) {
  return (
    <div className="bg-white bg-opacity-5 p-3 rounded-lg flex flex-row items-center cursor-pointer  ">
      {userName}
    </div>
  );
}

export default MyChats;
