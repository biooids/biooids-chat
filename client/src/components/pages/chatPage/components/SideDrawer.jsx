import React, { useState } from "react";
import SearchCards from "./SearchCards";

function SideDrawer({ setChats }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

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

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn bg-black mt-3 mb-3 drawer-button"
          >
            Search
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <aside className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-3">
            <label
              htmlFor="my-drawer"
              className="btn bg-black mt-3 mb-3 drawer-button"
            >
              Close X
            </label>
            <form action="" onSubmit={handleSearch}>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
                  required
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
              <button
                className="btn bg-white bg-opacity-50 text-black "
                type="submit"
              >
                {loading ? "searching..." : "search"}
              </button>
            </form>
            <ul className="flex flex-col gap-3">
              <p>users found:</p>
              {searchResult && searchResult.length > 0 ? (
                searchResult.map((user) => (
                  <label
                    key={user._id}
                    htmlFor="my-drawer"
                    className="drawer-button"
                  >
                    <SearchCards
                      userId={user._id}
                      profilePicture={user.profilePicture}
                      userName={user.userName}
                      setChats={setChats}
                    />
                  </label>
                ))
              ) : (
                <p> {loading ? "Searching..." : "Search again !!"}</p>
              )}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
export default SideDrawer;
