import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UpdateGroup({ chat }) {
  const { currentUser } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const [userAlreadyAdded, setUserAlreadyAdded] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([...chat.users]);
  const [groupInfo, setGroupInfo] = useState({
    name: chat.chatName,
    description: "",
    users: [],
  });

  const handleSearch = async (e) => {
    setUserAlreadyAdded(false);
    try {
      setLoading(true);
      const res = await fetch(`/api/user/get-users?searchTerm=${search}`);
      const data = await res.json();
      if (data.success) {
        setSearchResult(data.users);
        setLoading(false);
        console.log(data);
      } else {
        console.log(data.message);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
  };
  useEffect(() => {
    if (search.trim() !== "") {
      const timerId = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => clearTimeout(timerId);
    }
  }, [search]);

  const addUser = (userToAdd) => {
    const userExists = selectedUsers.some((user) => user._id === userToAdd._id);

    if (userExists) {
      setUserAlreadyAdded(true);
    } else {
      setUserAlreadyAdded(false);
      console.log(userToAdd);
      setSelectedUsers((prev) => [userToAdd, ...prev]);
    }
  };
  const removeUser = (userIdToRemove) => {
    setSelectedUsers((prev) =>
      prev.filter((user) => user._id !== userIdToRemove)
    );
  };

  useEffect(() => {
    setGroupInfo((prev) => {
      const userExists = selectedUsers.some(
        (user) => user._id === currentUser.user._id
      );

      const updatedUsers = userExists
        ? selectedUsers
        : [currentUser.user, ...selectedUsers];

      return {
        ...prev,
        users: updatedUsers,
      };
    });
  }, [selectedUsers, currentUser.user, chat.users]);

  const createGroup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/chat/create-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupInfo),
      });
      const data = await res.json();
      if (data.success) {
        console.log("Group created successfully:", data);
        setChats((prev) => [data.result, ...prev]);
        setGroupInfo({ name: "", description: "", users: [currentUser.user] });
        document.getElementById("my_modal_4").close();
      } else {
        console.error("Failed to create group:", data.message);
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        + Update group
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form
            className="flex flex-col gap-3 w-full text-cyan-300"
            onSubmit={createGroup}
          >
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="group name"
                value={groupInfo.name}
                onChange={(e) =>
                  setGroupInfo({ ...groupInfo, name: e.target.value })
                }
                required
              />
            </label>

            <p className="tex-xs text-red-500">
              {userAlreadyAdded ? "user already added" : ""}
            </p>
            <ul className="flex gap-3 ">
              {selectedUsers && selectedUsers.length > 0
                ? selectedUsers.map((user) => (
                    <li
                      key={user._id}
                      className="bg-white bg-opacity-5 p-1 rounded-lg flex gap-3 justify-center items-center"
                    >
                      <p>{user.userName}</p>
                      <span
                        className="cursor-pointer bg-white bg-opacity-5 p-1 rounded-full hover:bg-opacity-10"
                        onClick={() => removeUser(user._id)}
                      >
                        X
                      </span>
                    </li>
                  ))
                : ""}
            </ul>

            <u className="flex flex-col gap-3">
              <p> {loading ? "loading ..." : "results : "}</p>
              {searchResult && searchResult.length > 0 && search
                ? searchResult.map((user) => (
                    <li
                      key={user._id}
                      onClick={() => addUser(user)}
                      className="bg-white bg-opacity-5 p-3 rounded-lg flex flex-row items-center   "
                    >
                      <p>{user.userName}</p>
                    </li>
                  ))
                : ""}
            </u>

            <label className="input input-bordered flex items-center gap-2">
              <input
                type="search"
                className="grow"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <button className="btn" type="submit">
              Create
            </button>
            <button className="btn w-full" onClick={() => console.log(chat)}>
              Log
            </button>
          </form>
          <form method="dialog" className="mt-3">
            <button className="btn w-full">Close</button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default UpdateGroup;
