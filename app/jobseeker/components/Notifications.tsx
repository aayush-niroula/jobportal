"use client";

import {
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import {
  Bell,
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/app/providers/SocketProvider";
import { useAuthStore } from "@/app/store/useAuthStore";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

const Notifications = () => {
  const socket = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showAll, setShowAll] = useState(false);
  const user = useAuthStore((state) => state.user);

  const normalizeNotification = (n: any): Notification => ({
    id: n.id || n._id?.$oid,
    title: n.type === "INTERVIEW" ? "Interview Scheduled" : "Application Status",
    description: n.message,
    type: n.type === "INTERVIEW" ? "success" : "info",
    time: n.created_at
      ? n.created_at.$date
        ? new Date(n.created_at.$date).toLocaleString()
        : new Date(n.created_at).toLocaleString()
      : "Just now",
    read: n.is_read,
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
     if(!res.ok) return 
        const data = await res.json();
        const mapped = data.map(normalizeNotification);
        setNotifications(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, [user?.token]);
  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data: any) => {
      setNotifications((prev) => [
        normalizeNotification(data),
        ...prev,
      ]);
    };

    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  const unreadCount = notifications.filter((n) => !n.read).length;

 
  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/markasread/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      if (!res.ok) throw new Error("Failed to mark as read");
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  
  const markAllAsRead = async () => {
    try {
      const res = await fetch(`/api/notifications/markallread`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      if (!res.ok) throw new Error("Failed to mark all as read");
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

 
  const clearNotification = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/markasread/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      if (!res.ok) throw new Error("Failed to delete notification");
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

  return (
    <div className="bg-white font-sans border border-gray-200 rounded-2xl shadow-lg p-4 md:p-6 
      w-full max-w-full md:max-w-md lg:max-w-lg
      flex flex-col h-[calc(100vh-2rem)] md:h-auto md:max-h-150">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-xl">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl md:text-2xl">Notifications</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{unreadCount} unread</Badge>
              <span className="text-sm text-gray-500">
                {notifications.length} total
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={markAllAsRead}
          className="text-blue-600"
        >
          Mark all read
        </Button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {displayedNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`relative group p-4 rounded-xl transition
              ${notification.read ? "bg-gray-50" : "bg-blue-50 border-l-4 border-l-blue-500"}`}
          >
            <div className="flex gap-3">
              {getIcon(notification.type)}

              <div className="flex-1">
                <div className="flex justify-between">
                  <AlertTitle className="font-semibold">
                    {notification.title}
                  </AlertTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => clearNotification(notification.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <AlertDescription className="text-sm text-gray-600">
                  {notification.description}
                </AlertDescription>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length > 3 && (
        <Button
          variant="ghost"
          onClick={() => setShowAll(!showAll)}
          className="mt-4"
        >
          {showAll ? "Show Less" : `View All (${notifications.length})`}
        </Button>
      )}

      {notifications.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Bell className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-gray-500">No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
