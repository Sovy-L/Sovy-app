
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Map, Ticket, Store } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface DesktopActionsProps {
  pendingOrders: any[];
  onSearchClick: () => void;
  onLocationClick: () => void;
  onPickupCodeClick: () => void;
  onSignInClick: () => void;
}

const DesktopActions = ({ 
  pendingOrders, 
  onSearchClick, 
  onLocationClick, 
  onPickupCodeClick, 
  onSignInClick 
}: DesktopActionsProps) => {
  const { isAuthenticated, user, isMerchant, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleMapClick = () => {
    navigate('/map');
  };

  const handleMerchantDashboardClick = () => {
    navigate('/merchant-dashboard');
  };

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button 
        variant="ghost" 
        size="icon" 
        aria-label="Search"
        onClick={onSearchClick}
      >
        <Search className="h-5 w-5" />
      </Button>
      
      <LanguageSelector />
      
      <Button 
        variant="ghost" 
        size="icon" 
        aria-label="View map"
        onClick={handleMapClick}
        title={t("view_map")}
      >
        <Map className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        aria-label="Set location"
        onClick={onLocationClick}
      >
        <MapPin className="h-5 w-5" />
      </Button>
      
      {pendingOrders.length > 0 && (
        <Button
          variant="outline"
          size="icon"
          aria-label="Pickup codes"
          onClick={onPickupCodeClick}
          className="relative"
          title="Pickup codes"
        >
          <Ticket className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-white">
            {pendingOrders.length}
          </span>
        </Button>
      )}
      
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {user?.name?.split(" ")[0] || "Account"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleProfileClick}>{t("my_profile")}</DropdownMenuItem>
            {isMerchant && (
              <DropdownMenuItem onClick={handleMerchantDashboardClick}>
                <Store className="mr-2 h-4 w-4" />
                Merchant Dashboard
              </DropdownMenuItem>
            )}
            {pendingOrders.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onPickupCodeClick}>
                  View Pickup Codes
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>{t("logout")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={onSignInClick}>{t("sign_in")}</Button>
      )}
    </div>
  );
};

export default DesktopActions;
