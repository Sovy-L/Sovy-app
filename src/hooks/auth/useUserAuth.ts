
import { useState, useEffect } from "react";
import { User, Business } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

export const useUserAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast: uiToast } = useToast();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    const storedBusiness = localStorage.getItem("business");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      
      if (storedBusiness) {
        setBusiness(JSON.parse(storedBusiness));
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, just create a mock user
      const storedUsers = localStorage.getItem("users");
      let users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const existingUser = users.find((u: User) => u.email === email);
      
      if (!existingUser) {
        throw new Error("User not found");
      }
      
      // Mock password check - in real app this would be handled securely on the server
      // Here we're just simulating login success
      
      setUser(existingUser);
      localStorage.setItem("user", JSON.stringify(existingUser));
      
      // If user is a merchant, load business data
      if (existingUser.isMerchant) {
        const storedBusinesses = localStorage.getItem("businesses");
        const businesses = storedBusinesses ? JSON.parse(storedBusinesses) : [];
        const userBusiness = businesses.find((b: Business) => b.ownerId === existingUser.id);
        
        if (userBusiness) {
          setBusiness(userBusiness);
          localStorage.setItem("business", JSON.stringify(userBusiness));
        }
      }
      
      toast.success("Welcome back!", {
        description: "You've successfully signed in."
      });
    } catch (error) {
      uiToast({
        variant: "destructive",
        title: "Error",
        description: "Invalid email or password",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, phoneNumber?: string, address?: string, isMerchant?: boolean): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Create a mock user for demo
      const newUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email,
        name,
        phoneNumber,
        address,
        isMerchant: !!isMerchant,
      };
      
      // Store user in localStorage for demo
      const storedUsers = localStorage.getItem("users");
      let users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast.success("Account created!", {
        description: isMerchant 
          ? "Welcome to SaveFood for Business. You've successfully created a merchant account."
          : "Welcome to SaveFood. You've successfully created an account."
      });
    } catch (error) {
      uiToast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create account",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setBusiness(null);
    localStorage.removeItem("user");
    localStorage.removeItem("business");
    toast.success("Signed out", {
      description: "You've been successfully signed out."
    });
  };

  return {
    user,
    business,
    isAuthenticated: !!user,
    isMerchant: !!user?.isMerchant,
    isLoading,
    login,
    register,
    logout,
    setUser,
    setBusiness
  };
};
