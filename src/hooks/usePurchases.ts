
import { useState } from "react";
import { Purchase } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

export const usePurchases = (initialPurchases: Purchase[] = []) => {
  const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);
  const { toast: uiToast } = useToast();

  const addPurchase = (purchase: Omit<Purchase, "id" | "date" | "status" | "pickupCode"> & { pickupTime?: string }) => {
    const purchaseId = "ord-" + Math.random().toString(36).substr(2, 9);
    const newPurchase: Purchase = {
      id: purchaseId,
      date: new Date().toISOString().split('T')[0],
      status: "pending",
      ...purchase,
    };
    
    setPurchases([newPurchase, ...purchases]);
    
    return purchaseId;
  };
  
  const updatePurchaseStatus = (purchaseId: string, status: Purchase["status"], pickupCode?: string) => {
    const updatedPurchases = purchases.map(purchase => 
      purchase.id === purchaseId
        ? { ...purchase, status, pickupCode }
        : purchase
    );
    
    setPurchases(updatedPurchases);
  };
  
  const updatePurchaseRating = (purchaseId: string, rating: number) => {
    const updatedPurchases = purchases.map(purchase => 
      purchase.id === purchaseId
        ? { ...purchase, rating }
        : purchase
    );
    
    setPurchases(updatedPurchases);
    
    uiToast({
      title: "Thank you for your feedback!",
      description: "Your rating has been submitted.",
    });
  };

  const calculateTotalSaved = () => {
    return purchases.reduce((total, purchase) => total + purchase.saved, 0);
  };

  // Schedule notification for a purchase
  const schedulePickupNotification = (purchaseId: string, pickupTime: string) => {
    const pickupDate = new Date(pickupTime);
    const notificationTime = new Date(pickupDate.getTime() - 30 * 60 * 1000); // 30 minutes before
    
    // If notification time is in the future
    if (notificationTime > new Date()) {
      const timeUntilNotification = notificationTime.getTime() - new Date().getTime();
      
      setTimeout(() => {
        const purchase = purchases.find(p => p.id === purchaseId);
        if (purchase && purchase.status === "pending") {
          // Show notification
          toast("Pickup Reminder", {
            description: `Your order from ${purchase.restaurant} will be ready for pickup in 30 minutes.`,
            duration: 10000,
          });
          
          // For a real app, we might use the Web Notifications API or a mobile notification
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("Pickup Reminder", {
              body: `Your order from ${purchase.restaurant} will be ready for pickup in 30 minutes.`,
            });
          }
        }
      }, timeUntilNotification);
    }
  };

  return {
    purchases,
    setPurchases,
    addPurchase,
    updatePurchaseStatus,
    updatePurchaseRating,
    calculateTotalSaved,
    schedulePickupNotification
  };
};
