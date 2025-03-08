
export type User = {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  address?: string;
  isMerchant?: boolean;
};

export type Business = {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  location: string;
  address: string;
  phoneNumber: string;
  availableBaskets: number;
  bankDetails: {
    accountName: string;
    accountNumber: string; // Last 4 digits only for display
  };
  verified: boolean;
  createdAt: string;
}

export type Purchase = {
  id: string;
  date: string;
  restaurant: string;
  foodName: string;
  originalPrice: number;
  paidPrice: number;
  saved: number;
  status: "pending" | "ready" | "completed";
  pickupCode?: string;
  pickupTime?: string;
  rating?: number;
  paymentMethod?: "card" | "cash";
};

export type PaymentMethod = {
  id: string;
  cardNumber: string; // Last 4 digits only
  cardholderName: string;
  expiryDate: string;
  isDefault: boolean;
};

export interface FavoriteItem {
  id: string;
  name: string;
  restaurant: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  distance: string;
  timeLeft: string;
  tags?: string[];
  addedAt?: string;
}

export type AuthContextType = {
  user: User | null;
  business: Business | null;
  isAuthenticated: boolean;
  isMerchant: boolean;
  isLoading: boolean;
  purchases: Purchase[];
  paymentMethods: PaymentMethod[];
  favorites: FavoriteItem[];
  totalSaved: number;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phoneNumber?: string, address?: string, isMerchant?: boolean) => Promise<void>;
  registerBusiness: (businessData: Omit<Business, "id" | "ownerId" | "verified" | "createdAt">) => Promise<void>;
  logout: () => void;
  addPaymentMethod: (cardNumber: string, cardholderName: string, expiryDate: string, makeDefault?: boolean) => void;
  setDefaultPaymentMethod: (paymentMethodId: string) => void;
  deletePaymentMethod: (paymentMethodId: string) => void;
  addPurchase: (purchase: Omit<Purchase, "id" | "date" | "status" | "pickupCode"> & { pickupTime?: string }) => string;
  updatePurchaseStatus: (purchaseId: string, status: Purchase["status"], pickupCode?: string) => void;
  updatePurchaseRating: (purchaseId: string, rating: number) => void;
  addToFavorites: (item: Omit<FavoriteItem, "id" | "addedAt">) => void;
  removeFromFavorites: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  schedulePickupNotification: (purchaseId: string, pickupTime: string) => void;
  updateBusiness: (businessData: Partial<Omit<Business, "id" | "ownerId" | "verified">>) => Promise<void>;
  getBusinessStats: () => { totalSales: number, totalOrders: number, pendingOrders: number };
};
