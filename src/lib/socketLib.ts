// lib/socket.ts
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
});

export default socket;
