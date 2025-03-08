
import { Link } from "react-router-dom";
import { Ticket, Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

interface MobileMenuProps {
  isOpen: boolean;
  pendingOrders: any[];
  onClose: () => void;
  onSearchClick: () => void;
  onLocationClick: () => void;
  onPickupCodeClick: () => void;
  onHowItWorksClick: () => void;
  onSignInClick: () => void;
  onRegisterClick: () => void;
  onProfileClick: () => void;
}

const MobileMenu = ({
  isOpen,
  pendingOrders,
  onClose,
  onSearchClick,
  onLocationClick,
  onPickupCodeClick,
  onHowItWorksClick,
  onSignInClick,
  onRegisterClick,
  onProfileClick,
}: MobileMenuProps) => {
  const { isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden transition-all duration-300 ease-in-out transform",
        isOpen
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full pointer-events-none"
      )}
    >
      <div className="flex flex-col h-full pt-16 p-6 space-y-6">
        <Link
          to="/"
          className="text-lg font-medium transition-colors hover:text-primary"
          onClick={onClose}
        >
          {t("home")}
        </Link>
        <Link
          to="/browse"
          className="text-lg font-medium transition-colors hover:text-primary"
          onClick={onClose}
        >
          {t("browse")}
        </Link>
        <Link
          to="/map"
          className="text-lg font-medium transition-colors hover:text-primary"
          onClick={onClose}
        >
          {t("view_map")}
        </Link>
        <button
          className="text-lg font-medium transition-colors hover:text-primary text-left bg-transparent border-none"
          onClick={onHowItWorksClick}
        >
          {t("how_it_works")}
        </button>
        <Link
          to="#"
          className="text-lg font-medium transition-colors hover:text-primary"
          onClick={onClose}
        >
          {t("about_us")}
        </Link>
        
        {pendingOrders.length > 0 && (
          <button
            className="text-lg font-medium transition-colors hover:text-primary text-left bg-transparent border-none flex items-center"
            onClick={() => {
              onClose();
              onPickupCodeClick();
            }}
          >
            <Ticket className="h-5 w-5 mr-2" />
            View Pickup Codes ({pendingOrders.length})
          </button>
        )}
        
        <div className="flex flex-col space-y-4 mt-auto">
          {isAuthenticated ? (
            <>
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={onProfileClick}
              >
                {t("my_profile")}
              </Button>
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                {t("logout")}
              </Button>
            </>
          ) : (
            <>
              <Button className="w-full" onClick={onSignInClick}>
                {t("sign_in")}
              </Button>
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={onRegisterClick}
              >
                {t("register")}
              </Button>
            </>
          )}
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              aria-label="Search"
              onClick={onSearchClick}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <LanguageSelector />
            
            <Button
              variant="outline"
              size="icon"
              aria-label="Set location"
              onClick={onLocationClick}
            >
              <MapPin className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
