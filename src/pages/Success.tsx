
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuccessPage from "@/components/payment/SuccessPage";
import { useAuth } from "@/contexts/AuthContext";

// Sample food data (same as in Details.tsx)
const ALL_FOODS = [
  {
    id: "1",
    name: "Mystery Box - Mixed Italian Food",
    restaurant: "Bella Pasta",
    image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-4.0.3",
    originalPrice: 24.99,
    discountedPrice: 8.99,
    distance: "0.5 miles",
    timeLeft: "2 hours",
    tags: ["Italian", "Pasta", "Pizza"],
    category: "Italian",
    rating: 4.8,
    reviewCount: 124,
    description: "A surprise selection of our freshest Italian specialties. May include pasta dishes, antipasti, bread, and desserts. Perfect for 1-2 people.",
    pickupTime: "Today, 6:00 PM - 8:00 PM",
    address: "123 Main Street, New York, NY 10001",
    restaurantDescription: "Authentic Italian cuisine made with love and tradition. Our chef trained in Rome and brings authentic flavors to every dish.",
  },
  {
    id: "2",
    name: "Bakery Surprise Pack",
    restaurant: "Golden Crust Bakery",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3",
    originalPrice: 15.99,
    discountedPrice: 5.99,
    distance: "0.8 miles",
    timeLeft: "3 hours",
    tags: ["Bakery", "Pastries", "Fresh"],
    category: "Bakery",
    rating: 4.6,
    reviewCount: 96,
    description: "A delightful assortment of freshly baked goods which may include croissants, muffins, bread and pastries. Contents vary daily based on what's fresh!",
    pickupTime: "Today, 4:30 PM - 6:30 PM",
    address: "456 Oak Avenue, New York, NY 10002",
    restaurantDescription: "Family-owned bakery serving fresh, handmade breads and pastries since 1982. We use traditional recipes and organic ingredients.",
  },
  {
    id: "3",
    name: "Sushi Box - Chef's Selection",
    restaurant: "Sakura Sushi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3",
    originalPrice: 29.99,
    discountedPrice: 12.99,
    distance: "1.2 miles",
    timeLeft: "1 hour",
    tags: ["Japanese", "Sushi", "Fish"],
    category: "Japanese",
    rating: 4.9,
    reviewCount: 218,
    description: "Premium sushi assortment selected by our head chef. Includes a variety of fresh nigiri, maki rolls, and sashimi. Perfect for sushi lovers!",
    pickupTime: "Today, 8:30 PM - 9:30 PM",
    address: "789 Cherry Lane, New York, NY 10003",
    restaurantDescription: "Authentic Japanese cuisine prepared by our Tokyo-trained chefs. We source the freshest fish daily from trusted suppliers.",
  },
  {
    id: "4",
    name: "Organic Fruit & Veggie Box",
    restaurant: "Green Market",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3",
    originalPrice: 18.99,
    discountedPrice: 6.99,
    distance: "1.5 miles",
    timeLeft: "4 hours",
    tags: ["Organic", "Fruit", "Vegetables"],
    category: "Grocery",
    rating: 4.7,
    reviewCount: 85,
    description: "A selection of organic, locally sourced seasonal fruits and vegetables. Perfect for healthy eating and reducing food waste.",
    pickupTime: "Tomorrow, 10:00 AM - 12:00 PM",
    address: "101 Green Street, New York, NY 10004",
    restaurantDescription: "Local market specializing in organic produce sourced from farms within 100 miles. We support sustainable agriculture.",
  },
];

const Success = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, purchases } = useAuth();
  const [food, setFood] = useState<typeof ALL_FOODS[0] | null>(null);
  
  // Get the order ID from the URL query parameters
  const orderId = searchParams.get("orderId");
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    
    // Find the food by ID
    const foundFood = ALL_FOODS.find((item) => item.id === id);
    setFood(foundFood || null);
    
    // Validate that the orderId exists in the user's purchases
    if (orderId && !purchases.some(p => p.id === orderId)) {
      navigate("/");
    }
  }, [id, orderId, isAuthenticated, navigate, purchases]);
  
  if (!food || !orderId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-28">
          <div className="container-custom">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28">
        <div className="container-custom">
          <SuccessPage 
            foodItem={food} 
            orderId={orderId}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Success;
