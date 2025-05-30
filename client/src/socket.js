// socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

// Optional: Add event listeners for connection and disconnection
socket.on("connect", () => {
  console.log("Connected to the server");
});

export default socket;