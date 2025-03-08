
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import HowItWorksModal from "./HowItWorksModal";

export const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: "smooth",
    });
  };

  const handleFindFoodNearMe = () => {
    if (navigator.geolocation) {
      toast.loading(t("detecting_location"));
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          toast.dismiss();
          toast.success(t("location_detected"));
          
          // Navigate to browse with coordinates
          setTimeout(() => {
            navigate(`/browse?lat=${latitude}&lng=${longitude}`);
          }, 500);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.dismiss();
          toast.error(t("location_error"));
          
          // Navigate to browse without coordinates
          setTimeout(() => {
            navigate("/browse");
          }, 500);
        }
      );
    } else {
      toast.error(t("geolocation_not_supported"));
      
      // Navigate to browse without coordinates
      setTimeout(() => {
        navigate("/browse");
      }, 500);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-white to-transparent dark:from-background dark:to-transparent"
        style={{ zIndex: -2 }}
      />
      
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"
        style={{ zIndex: -3 }}
      />
      
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" style={{ zIndex: -1 }} />
      
      <div className="container-custom text-center px-4 animate-fade-in">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-block">
            <p className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
              <span className="animate-pulse-subtle">●</span>
              <span className="ml-2">{t("save_food")}</span>
            </p>
          </div>
          
          <h1 className="font-bold text-4xl md:text-6xl tracking-tight">
            {t("rescue_delicious")}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("join_movement")}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button size="lg" className="text-base" onClick={handleFindFoodNearMe}>
              {t("find_food_near_me")}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base"
              onClick={() => setHowItWorksOpen(true)}
            >
              {t("how_it_works")}
            </Button>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full p-3 transition-colors hover:bg-secondary animate-float"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6" />
      </button>

      <HowItWorksModal 
        isOpen={howItWorksOpen} 
        onClose={() => setHowItWorksOpen(false)} 
      />
    </section>
  );
};

export default Hero;
