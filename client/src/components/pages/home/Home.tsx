import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../components/mainComp/SocketContext";

function Home() {
  const socket = useSocket();
  const navigate = useNavigate();

  const storeGeneralRoomMessage = async (generalRoomMessage: string) => {
    const result = await fetch("/api/generalRoom/storeGeneralRoomMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ generalRoomMessage }),
    });
    const data = await result.json();
    if (!data.success) {
      alert(data.message);
      return;
    }
    console.log("storage response :", data);
  };

  const joinGeneralRoom = () => {
    const username = "eddy";
    socket.emit("joinGeneralRoom", username);

    socket.on("joinedGeneralRoom", (data) => {
      console.log("Received roomStatus event on client:", data);
      storeGeneralRoomMessage(data);
      navigate("/general-room");
      socket.off("joinedGeneralRoom");
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <button className="btn " onClick={joinGeneralRoom}>
        click me
      </button>
    </div>
  );
}

export default Home;
