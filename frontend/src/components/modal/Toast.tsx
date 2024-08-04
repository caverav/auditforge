import React from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const colors = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  const toastClasses = `fixed bottom-4 right-4 p-4 rounded shadow-lg text-white ${colors[type]}`;
  return (
    <div className={toastClasses}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
