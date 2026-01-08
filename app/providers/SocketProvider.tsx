"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/app/store/useAuthStore";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user?.id) return;

    socketRef.current = io("http://localhost:3000", {
      path: "/api/socket",
    });

    socketRef.current.emit("joinRoom", user.id);

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
