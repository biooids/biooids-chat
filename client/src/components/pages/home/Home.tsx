import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../components/mainComp/SocketContext";
import { useState } from "react";

function Home() {
  const socket = useSocket();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const currentUserName: string = "eddy has joined the general room";

  const storeGeneralRoomMessage = async () => {
    try {
      setLoading(true);
      const result = await fetch("/api/generalRoom/storeGeneralRoomMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ generalRoomMessage: currentUserName }),
      });
      const data = await result.json();
      if (!data.success) {
        alert(data.message);
        setLoading(false);
        return;
      } else {
        socket.emit("joinGeneralRoom", currentUserName);

        socket.on("joinedGeneralRoom", (data) => {
          console.log("Received roomStatus event on client:", data);
        });
        socket.off("joinedGeneralRoom");
        setLoading(false);
        navigate("/general-room");
      }
      console.log("storage response :", data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <button
        className="btn "
        onClick={storeGeneralRoomMessage}
        disabled={loading}
      >
        {loading ? "Loading..." : "Join General Room"}
      </button>
    </div>
  );
}

export default Home;
