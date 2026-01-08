import { useEffect, useState } from "react";
import { useSocket } from "../providers/SocketProvider";


export interface Notification {
  id: string;
  message: string;
  type: string;
  created_at: string;
  is_read: boolean;
}

export const useNotifications = (userId?: string) => {
  const socket = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);


  useEffect(() => {
    if (!userId) return;

    fetch(`/api/notifications?user_id=${userId}`)
      .then((res) => res.json())
      .then(setNotifications);
  }, [userId]);

 
  useEffect(() => {
    if (!socket) return;

    socket.on("new-notification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("new-notification");
    };
  }, [socket]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return {
    notifications,
    unreadCount,
    setNotifications,
  };
};
