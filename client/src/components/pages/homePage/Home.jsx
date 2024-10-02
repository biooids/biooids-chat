import React from "react";

function Home() {
  return (
    <section className="p-3">
      <div className="flex   gap-3 h-[70vh]">
        <section className=" flex flex-col gap-3 border-2 border-cyan-700 rounded-lg w-[30%] h-full">
          <div className=" border-cyan-700 border-b-2 p-3">
            <ul className="w-full flex justify-between items-center">
              <li>Chat</li>
              <li>Chat</li>
              <li>Chat</li>
              <li>Chat</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 p-3  ">
            <div className="p-3 border-cyan-700 rounded-lg border-2 ">
              <p>All </p>
            </div>
          </div>
        </section>

        <section className="border-2 border-cyan-700 rounded-lg w-[70%] h-full">
          <div className=" border-cyan-700 border-b-2 p-3">chat</div>
          <div></div>
        </section>
      </div>
    </section>
  );
}

export default Home;
