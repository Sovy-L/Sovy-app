
import { useState } from "react";
import { Business, User } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

export const useBusinessManagement = (
  user: User | null, 
  business: Business | null,
  setUser: (user: User | null) => void,
  setBusiness: (business: Business | null) => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast: uiToast } = useToast();

  const registerBusiness = async (businessData: Omit<Business, "id" | "ownerId" | "verified" | "createdAt">) => {
    if (!user) {
      throw new Error("You must be logged in to register a business");
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Create a mock business for demo
      const newBusiness: Business = {
        ...businessData,
        id: "business-" + Math.random().toString(36).substr(2, 9),
        ownerId: user.id,
        verified: false,
        createdAt: new Date().toISOString(),
      };
      
      // Update user to be a merchant if not already
      const updatedUser = {
        ...user,
        isMerchant: true,
      };
      
      // Store business in localStorage for demo
      const storedBusinesses = localStorage.getItem("businesses");
      let businesses = storedBusinesses ? JSON.parse(storedBusinesses) : [];
      businesses.push(newBusiness);
      localStorage.setItem("businesses", JSON.stringify(businesses));
      
      // Update user
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Update stored users
      const storedUsers = localStorage.getItem("users");
      let users = storedUsers ? JSON.parse(storedUsers) : [];
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
      }
      
      // Set business
      setBusiness(newBusiness);
      localStorage.setItem("business", JSON.stringify(newBusiness));
      
      toast.success("Business registered!", {
        description: "Your business has been registered successfully. You can now start selling on SaveFood."
      });
    } catch (error) {
      uiToast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register business",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBusiness = async (businessData: Partial<Omit<Business, "id" | "ownerId" | "verified">>) => {
    if (!user || !business) {
      throw new Error("You must be logged in as a merchant to update business details");
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update business
      const updatedBusiness = {
        ...business,
        ...businessData,
      };
      
      // Store business in localStorage for demo
      const storedBusinesses = localStorage.getItem("businesses");
      let businesses = storedBusinesses ? JSON.parse(storedBusinesses) : [];
      const businessIndex = businesses.findIndex((b: Business) => b.id === business.id);
      if (businessIndex !== -1) {
        businesses[businessIndex] = updatedBusiness;
        localStorage.setItem("businesses", JSON.stringify(businesses));
      }
      
      // Set business
      setBusiness(updatedBusiness);
      localStorage.setItem("business", JSON.stringify(updatedBusiness));
      
      toast.success("Business updated!", {
        description: "Your business details have been updated successfully."
      });
    } catch (error) {
      uiToast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update business details",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getBusinessStats = (purchases: any[]) => {
    const totalSales = purchases.reduce((total, purchase) => total + purchase.paidPrice, 0);
    const totalOrders = purchases.length;
    const pendingOrders = purchases.filter(p => p.status === "pending").length;
    
    return {
      totalSales,
      totalOrders,
      pendingOrders,
    };
  };

  return {
    registerBusiness,
    updateBusiness,
    getBusinessStats,
    isLoading
  };
};
