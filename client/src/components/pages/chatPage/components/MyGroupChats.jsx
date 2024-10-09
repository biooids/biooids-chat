import React from "react";

function MyGroupChats() {
  {
    const [groupChats, setGroupChats] = useState([]);

    /* <ul className="flex flex-col gap-3 border-b-2 border-slate-700 pb-3 ">
        <p>Group chats :</p>

        <CreateGroup setChats={setChats} />
        {groupChats && groupChats.length > 0 ? (
          groupChats.map((chat) => <MyGroupChats key={chat._id} />)
        ) : (
          <p>No group chats found.Yet!</p>
        )}

        <MyGroupChats />
      </ul> */
  }
  return (
    <li className="bg-white bg-opacity-5 p-3 rounded-lg flex flex-row items-center  ">
      MyGroupChats
    </li>
  );
}

export default MyGroupChats;
