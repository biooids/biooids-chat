import React from "react";

function CreateGroup() {
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form className="flex flex-col gap-3 w-full">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="group name"
                required
              />
            </label>

            <ul className="flex gap-3 ">
              <li className="bg-white bg-opacity-5 p-1 rounded-lg flex gap-3 justify-center items-center">
                <p>lorremm</p>
                <span className="cursor-pointer bg-white bg-opacity-5 p-1 rounded-full hover:bg-opacity-10">
                  X
                </span>
              </li>
            </ul>

            <u className="flex flex-col gap-3">
              <li className="bg-white bg-opacity-5 p-3 rounded-lg flex flex-row items-center   ">
                eddy
              </li>
            </u>

            <label className="input input-bordered flex items-center gap-2">
              <input
                type="search"
                className="grow"
                placeholder="Search"
                required
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
            <div className="flex justify-between">
              <button className="btn" type="submit">
                Create
              </button>
              <form method="dialog" className="">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn w-full">Close</button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default CreateGroup;
