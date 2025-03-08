
import { useUserAuth } from "./useUserAuth";
import { useBusinessManagement } from "./useBusinessManagement";
import { usePurchases } from "../usePurchases";
import { usePaymentMethods } from "../usePaymentMethods";
import { useFavorites } from "../useFavorites";
import { MOCK_PURCHASES, MOCK_PAYMENT_METHODS } from "@/services/mockData";
import { Purchase } from "@/types/auth";

export const useAuthComposite = () => {
  const {
    user,
    business,
    isAuthenticated,
    isMerchant,
    isLoading: authLoading,
    login,
    register,
    logout,
    setUser,
    setBusiness
  } = useUserAuth();

  const {
    registerBusiness,
    updateBusiness,
    getBusinessStats,
    isLoading: businessLoading
  } = useBusinessManagement(user, business, setUser, setBusiness);

  // Make sure we're passing properly typed data to purchases
  const mockPurchases: Purchase[] = isAuthenticated ? MOCK_PURCHASES.map(p => ({
    ...p,
    // Ensure status is one of the allowed enum values
    status: (p.status as "pending" | "ready" | "completed")
  })) : [];

  const { 
    purchases, 
    setPurchases, 
    addPurchase, 
    updatePurchaseStatus, 
    updatePurchaseRating, 
    calculateTotalSaved,
    schedulePickupNotification 
  } = usePurchases(mockPurchases);

  const { 
    paymentMethods, 
    setPaymentMethods, 
    addPaymentMethod, 
    setDefaultPaymentMethod, 
    deletePaymentMethod 
  } = usePaymentMethods(isAuthenticated ? MOCK_PAYMENT_METHODS : []);

  const { 
    favorites, 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite 
  } = useFavorites();

  return {
    // User authentication
    user,
    business,
    isAuthenticated,
    isMerchant,
    isLoading: authLoading || businessLoading,
    login,
    register,
    logout,
    
    // Business management
    registerBusiness,
    updateBusiness,
    getBusinessStats,
    
    // Purchases
    purchases,
    setPurchases,
    addPurchase,
    updatePurchaseStatus,
    updatePurchaseRating,
    totalSaved: calculateTotalSaved(),
    schedulePickupNotification,
    
    // Payment methods
    paymentMethods,
    setPaymentMethods,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod,
    
    // Favorites
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};
