"use client";
import { Bell, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read?: boolean;
};

const notifications: Notification[] = [
  { id: 1, title: "New Job Alert", message: "Frontend Developer job posted", time: "2h ago" },
  { id: 2, title: "Application Update", message: "Your application has been reviewed", time: "5h ago" },
  { id: 3, title: "Some one viewd your profile", message: "", time: "1d ago" },
];

const Notification = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-200 transition"
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
            <h1 className="font-bold text-lg">Notifications</h1>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <ul className="flex flex-col max-h-80 overflow-y-auto">
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className={`px-4 py-3 hover:bg-gray-100 cursor-pointer transition ${
                  notif.read ? "bg-gray-50" : "bg-white"
                }`}
              >
                <p className="font-medium">{notif.title}</p>
                <p className="text-gray-600 text-sm">{notif.message}</p>
                <p className="text-gray-400 text-xs mt-1">{notif.time}</p>
              </li>
            ))}
            {notifications.length === 0 && (
              <li className="px-4 py-3 text-gray-500 text-center">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
