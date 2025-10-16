//useSocketConection

"use client";

import { useEffect, useState } from "react";
import socket from "@/lib/socketLib";
import Cookies from "js-cookie";
import * as jose from "jose";
export default function useSocketConnection() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = Cookies.get("AdminToken");
    if (!token) {
      console.warn("no token found — skipping socket connection.");
      return;
    }
    let payload: any;
    try {
      payload = jose.decodeJwt(token);
    } catch (error) {
      console.error("❌ Failed to decode token:", error);
      return;
    }
    const accountId = payload?.accountId || payload?.id;
    const role = payload?.role;

    if (!accountId || !role) {
      console.warn(
        "🚫 Token missing accountId or role — cannot connect socket."
      );
      return;
    }
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
      setConnected(true);

      // Register user with backend socket
      socket.emit("register", {
        role: role,
        id: accountId,
      });
      console.log("📡 Emitted register event:", { role, accountId });
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
  }, []);

  return { connected, socket };
}
