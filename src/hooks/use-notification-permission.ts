
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useNotificationPermission = () => {
  const [permission, setPermission] = useState<NotificationPermission | "default">("default");

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("This browser does not support desktop notifications");
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  };

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  return { permission, requestPermission };
};
