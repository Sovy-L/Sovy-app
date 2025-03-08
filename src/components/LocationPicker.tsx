
import { useState, useEffect } from "react";
import { MapPin, Navigation, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationPicker = ({ isOpen, onClose }: LocationPickerProps) => {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setLocation("");
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleUseCurrentLocation = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // In a real app, we would do a reverse geocoding here
          // For demo, we'll just use the coordinates
          setLocation(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
          
          toast.success(t("location_detected"));
          
          setTimeout(() => {
            navigate(`/browse?lat=${latitude}&lng=${longitude}`);
            onClose();
            setIsLoading(false);
          }, 1000);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error(t("location_error"));
          setIsLoading(false);
        }
      );
    } else {
      toast.error(t("geolocation_not_supported"));
      setIsLoading(false);
    }
  };

  const handleSubmitLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      navigate(`/browse?location=${encodeURIComponent(location.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-0 right-0 top-0 z-50 border-b bg-background shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t("set_location")}</h2>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              onClick={handleUseCurrentLocation}
              variant="outline"
              className="w-full justify-start gap-2"
              disabled={isLoading}
            >
              <Navigation className="h-4 w-4" />
              {t("use_current_location")}
            </Button>
            
            <form onSubmit={handleSubmitLocation} className="flex flex-col gap-2">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t("enter_location_placeholder")}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" disabled={!location.trim() || isLoading}>
                  {t("search")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
