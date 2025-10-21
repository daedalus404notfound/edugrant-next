"use client";

import { useEffect, useState } from "react";
import socket from "@/lib/socketLib";

import { useAdminStore } from "@/store/adminUserStore";

export default function useSocketConnection() {
  const { admin } = useAdminStore(); // make sure this store holds admin info after login
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Only connect when admin info is available
    if (!admin?.accountId || !admin?.role) return;
    console.log(admin.role);
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
      setConnected(true);

      // Register admin with backend socket
      socket.emit("register", {
        role: admin.role,
        id: admin.accountId,
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
  }, [admin?.accountId, admin?.role]);

  return { connected, socket };
}
