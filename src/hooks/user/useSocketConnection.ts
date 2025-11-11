"use client";

import { useEffect, useState } from "react";
import socket from "@/lib/socketLib";
import useAuthenticatedUser from "./getTokenAuthentication";

export default function useSocketConnection() {
  const { data } = useAuthenticatedUser();
  const [connected, setConnected] = useState(false);
  const user = data?.userData;
  useEffect(() => {
    // Only connect when user info is available
    if (!user?.accountId || !user?.role) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
      setConnected(true);

      socket.emit("register", {
        role: user.role,
        id: user.accountId,
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket");
      setConnected(false);
    });

    // Optional: listen for custom messages
    socket.on("message", (msg) => {
      console.log("📨 Message from server:", msg);
    });

    // Cleanup when unmounting
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.disconnect();
    };
  }, [user?.accountId, user?.role]);

  return { connected, socket };
}
