
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import OngoingOrders from "@/components/OngoingOrders";
import { useAuth } from "@/contexts/AuthContext";

// Import the new component files
import FavoritesList from "@/components/home/FavoritesList";
import FoodDiscovery from "@/components/home/FoodDiscovery";
import HowItWorks from "@/components/home/HowItWorks";
import Benefits from "@/components/home/Benefits";

const Index = () => {
  const { isAuthenticated, favorites, isMerchant } = useAuth();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {isAuthenticated && !isMerchant && <OngoingOrders />}
        
        {isAuthenticated && favorites.length > 0 && (
          <FavoritesList favorites={favorites} />
        )}
        
        <FoodDiscovery />
        
        <HowItWorks />
        
        <Benefits />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
