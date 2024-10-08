import React from "react";

function SearchCards({ userId, profilePicture, userName }) {
  const accessChat = () => {
    console.log("accessing chat");
  };
  return (
    <li
      className="bg-white bg-opacity-5 p-3 rounded-lg flex flex-row items-center "
      onClick={accessChat}
    >
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={profilePicture} alt="Tailwind-CSS-Avatar-component" />
        </div>
      </div>
      <p>{userName}</p>
    </li>
  );
}

export default SearchCards;
