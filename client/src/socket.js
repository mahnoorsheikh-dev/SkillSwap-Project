import { io } from "socket.io-client";

let API_URL = import.meta.env.VITE_API_URL;

API_URL = API_URL.replace("/api", "");

const socket = io(API_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
