import { X } from "lucide-react";

type NotificationType = "success" | "error" | "info" | "warning";

type Notification = {
  id: string;
  type?: NotificationType;
  message: string;
  onClose: (id: string) => void;
};

const NotificationCard = ({ id, type = "info", message, onClose }: Notification) => {
  const bgColor: Record<NotificationType, string> = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  };

  return (
    <div
      className={`flex items-center justify-between p-4 mb-2 border-l-4 rounded shadow ${bgColor[type]}`}
    >
      <span>{message}</span>
      <button onClick={() => onClose(id)}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NotificationCard;
