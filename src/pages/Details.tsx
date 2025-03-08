
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetailNotFound from "@/components/details/DetailNotFound";
import DetailSkeleton from "@/components/details/DetailSkeleton";
import DetailHeader from "@/components/details/DetailHeader";
import FoodImage from "@/components/details/FoodImage";
import FoodInformation from "@/components/details/FoodInformation";
import RestaurantInfo from "@/components/details/RestaurantInfo";
import OrderSummary from "@/components/details/OrderSummary";
import PickupInfo from "@/components/details/PickupInfo";
import PaymentModal from "@/components/payment/PaymentModal";
import SignInModal from "@/components/auth/SignInModal";
import { useAuth } from "@/contexts/AuthContext";

// This is a sample food data that would be replaced with real API data
const ALL_FOODS = [
  {
    id: "1",
    name: "Mystery Box - Mixed Italian Food",
    restaurant: "Bella Pasta",
    description: "A delicious surprise of pasta, garlic bread, and maybe even a dessert! Rescued from today's freshly made food that would otherwise go to waste.",
    image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-4.0.3",
    originalPrice: 24.99,
    discountedPrice: 8.99,
    distance: "0.5 miles",
    timeLeft: "2 hours",
    tags: ["Italian", "Pasta", "Pizza"],
    portions: 2,
    pickupTime: "Today, 6:00 PM - 8:00 PM",
    pickupLocation: "123 Main St, New York, NY 10001",
    restaurantAddress: "123 Main St, New York, NY 10001",
    restaurantPhone: "(555) 123-4567",
    restaurantLat: 40.7128,
    restaurantLng: -74.0060,
    restaurantRating: 4.8,
    restaurantReviews: 241,
    restaurantOpeningHours: {
      Monday: "11:00 AM - 10:00 PM",
      Tuesday: "11:00 AM - 10:00 PM",
      Wednesday: "11:00 AM - 10:00 PM",
      Thursday: "11:00 AM - 10:00 PM",
      Friday: "11:00 AM - 11:00 PM",
      Saturday: "11:00 AM - 11:00 PM",
      Sunday: "12:00 PM - 9:00 PM",
    },
  },
  {
    id: "2",
    name: "Bakery Surprise Pack",
    restaurant: "Golden Crust Bakery",
    description: "A mix of our fresh baked goods from today! May include croissants, muffins, cookies, and bread.",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3",
    originalPrice: 15.99,
    discountedPrice: 5.99,
    distance: "0.8 miles",
    timeLeft: "3 hours",
    tags: ["Bakery", "Pastries", "Fresh"],
    portions: 1,
    pickupTime: "Today, 5:00 PM - 7:00 PM",
    pickupLocation: "456 Broadway, New York, NY 10013",
    restaurantAddress: "456 Broadway, New York, NY 10013",
    restaurantPhone: "(555) 234-5678",
    restaurantLat: 40.7234,
    restaurantLng: -74.0021,
    restaurantRating: 4.6,
    restaurantReviews: 187,
    restaurantOpeningHours: {
      Monday: "7:00 AM - 7:00 PM",
      Tuesday: "7:00 AM - 7:00 PM",
      Wednesday: "7:00 AM - 7:00 PM",
      Thursday: "7:00 AM - 7:00 PM",
      Friday: "7:00 AM - 8:00 PM",
      Saturday: "7:00 AM - 8:00 PM",
      Sunday: "8:00 AM - 6:00 PM",
    },
  },
];

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [food, setFood] = useState<typeof ALL_FOODS[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [signInModalOpen, setShowSignInModal] = useState(false);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundFood = ALL_FOODS.find(f => f.id === id) || null;
      setFood(foundFood);
      setIsLoading(false);
    }, 1000);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleReserveClick = () => {
    if (!isAuthenticated) {
      setShowSignInModal(true);
      return;
    }
    
    setPaymentModalOpen(true);
  };
  
  if (isLoading) {
    return (
      <div className="page-transition min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container-custom py-8">
          <DetailSkeleton />
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!food) {
    return (
      <div className="page-transition min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container-custom py-16">
          <DetailNotFound />
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-8">
          <DetailHeader 
            name={food.name}
            restaurant={food.restaurant}
            tags={food.tags}
            rating={food.restaurantRating}
            reviewCount={food.restaurantReviews}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <FoodImage 
                image={food.image}
                timeLeft={food.timeLeft}
                distance={food.distance}
              />
              
              <FoodInformation
                description={food.description}
                originalPrice={food.originalPrice}
                discountedPrice={food.discountedPrice}
                portions={food.portions}
              />
              
              <PickupInfo
                pickupTime={food.pickupTime}
                pickupLocation={food.pickupLocation}
                lat={food.restaurantLat}
                lng={food.restaurantLng}
              />
              
              <RestaurantInfo
                name={food.restaurant}
                address={food.restaurantAddress}
                phone={food.restaurantPhone}
                openingHours={food.restaurantOpeningHours}
              />
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary
                name={food.name}
                image={food.image}
                originalPrice={food.originalPrice}
                discountedPrice={food.discountedPrice}
                onReserveClick={handleReserveClick}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        food={food}
        onSuccess={(purchaseId) => {
          navigate(`/success/${purchaseId}`);
        }}
      />
      
      <SignInModal
        isOpen={signInModalOpen}
        onClose={() => setShowSignInModal(false)}
        onRegisterClick={() => {
          setShowSignInModal(false);
          // Open register modal (in a real app)
        }}
        onMerchantRegisterClick={() => {
          setShowSignInModal(false);
          // Open merchant register modal
        }}
      />
    </div>
  );
};

export default Details;
