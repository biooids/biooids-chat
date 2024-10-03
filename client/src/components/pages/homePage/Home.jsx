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
          <p className="text-center">Active users</p>
          <div className="flex flex-col gap-3 p-3  ">
            <div className="p-3 border-cyan-700 rounded-lg border-2 ">
              <p>DNAprogrammer </p>
            </div>
          </div>
        </section>

        <section className="border-2 border-cyan-700 rounded-lg w-[70%] h-full flex flex-col gap- ">
          <div className=" border-cyan-700 border-b-2 p-3 ">chat</div>

          <section className="bg-slate-70 rounded-lg  flex-grow overflow-x-auto p-3">
            {/* <ul className="flex flex-col gap-3 ">
              <li className="bg-black  flex  gap-3 justify-end">
                <div className="p-3 flex flex-col gap-1 w-[300px] bg-slate-700 rounded-lg">
                  <p>DNAprogrammer</p>
                  <p className="">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Fuga sint, maxime animi, harum hic aperiam voluptate dicta
                    quo debitis assumenda eligendi aspernatur voluptates.
                    Sapiente, voluptate minima mollitia voluptatibus ducimus
                    repellat.
                  </p>
                </div>
              </li>
            </ul> */}

            <div className="chat chat-start">
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>

            <div className="chat chat-end">
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">2 hour ago</time>
              </div>
              <div className="chat-bubble">I loved you.</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          </section>

          <form className="flex justify-center items-center gap-3  p-3">
            <input type="text" className="w-full p-3 bg-slate-700 rounded-lg" />
            <button type="submit" className="bg-slate-700 p-3 rounded-lg">
              send
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}

export default Home;
