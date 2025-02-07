"use client";

import type React from "react";
import { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const baseStyles =
    "fixed bottom-4 right-4 p-4 rounded-md shadow-md transition-opacity duration-300";
  const typeStyles =
    type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white";

  return <div className={`${baseStyles} ${typeStyles}`}>{message}</div>;
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, toast]);
  };

  return { Toast, addToast };
};
