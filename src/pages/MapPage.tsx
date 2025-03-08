
import { useState, useEffect } from "react";
import { MapPin, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FoodMap from "@/components/map/FoodMap";

// Sample food data with locations
const FOODS = [
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
    position: { lat: 51.505, lng: -0.09 } // London
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
    position: { lat: 51.51, lng: -0.1 }
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
    position: { lat: 51.515, lng: -0.08 }
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
    position: { lat: 51.52, lng: -0.095 }
  },
];

const MapPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 }); // Default to London
  const [zoom, setZoom] = useState(13);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          setZoom(14);
          toast.success(t("location_detected"));
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error(t("location_error"));
          setIsLoading(false);
        }
      );
    } else {
      toast.error(t("geolocation_not_supported"));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would call a geocoding service
      toast.info(`${t("searching_for")} "${searchQuery}"`);
      // Mock a location change for demo purposes
      setMapCenter({ 
        lat: 51.505 + (Math.random() * 0.02 - 0.01), 
        lng: -0.09 + (Math.random() * 0.02 - 0.01) 
      });
    }
  };

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-bold mb-6">{t("food_map")}</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button
              onClick={handleUseCurrentLocation}
              variant="outline"
              className="justify-start gap-2"
              disabled={isLoading}
            >
              <MapPin className="h-4 w-4" />
              {t("use_current_location")}
            </Button>
            
            <form onSubmit={handleSearch} className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("search_location")}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={!searchQuery.trim() || isLoading}>
                {t("search")}
              </Button>
            </form>
          </div>
          
          <div className="h-[70vh] w-full rounded-lg overflow-hidden border border-border shadow-sm">
            <FoodMap 
              center={mapCenter} 
              zoom={zoom} 
              markers={FOODS}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapPage;
