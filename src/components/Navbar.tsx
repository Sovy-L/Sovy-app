
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import SignInModal from "./auth/SignInModal";
import RegisterModal from "./auth/RegisterModal";
import RegisterMerchantModal from "./auth/RegisterMerchantModal";
import SearchBar from "./SearchBar";
import LocationPicker from "./LocationPicker";
import HowItWorksModal from "./HowItWorksModal";
import DesktopNav from "./navbar/DesktopNav";
import DesktopActions from "./navbar/DesktopActions";
import MobileMenu from "./navbar/MobileMenu";
import PickupCodeDialog from "./navbar/PickupCodeDialog";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registerMerchantModalOpen, setRegisterMerchantModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [locationPickerOpen, setLocationPickerOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [pickupCodeOpen, setPickupCodeOpen] = useState(false);
  const { purchases, isMerchant } = useAuth();
  const navigate = useNavigate();

  // Find pending orders with pickup codes
  const pendingOrders = purchases.filter(p => p.status === "pending" && p.pickupCode);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignInClick = () => {
    setMobileMenuOpen(false);
    setSignInModalOpen(true);
  };

  const handleRegisterClick = () => {
    setMobileMenuOpen(false);
    setRegisterModalOpen(true);
  };

  const handleMerchantRegisterClick = () => {
    setMobileMenuOpen(false);
    setRegisterMerchantModalOpen(true);
  };

  const handleSearchClick = () => {
    setMobileMenuOpen(false);
    setSearchOpen(true);
  };

  const handleLocationClick = () => {
    setMobileMenuOpen(false);
    setLocationPickerOpen(true);
  };

  const handleHowItWorksClick = () => {
    setMobileMenuOpen(false);
    setHowItWorksOpen(true);
  };

  const handleProfileClick = () => {
    setMobileMenuOpen(false);
    navigate('/profile');
  };

  const handleMerchantDashboardClick = () => {
    setMobileMenuOpen(false);
    navigate('/merchant-dashboard');
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-2 bg-white/80 backdrop-blur-md shadow-sm"
            : "py-4 bg-transparent"
        )}
      >
        <div className="container-custom flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight flex items-center"
          >
            <ShoppingBag className="mr-2 h-6 w-6 text-primary" />
            <span className="inline-block">SaveFood</span>
          </Link>

          <DesktopNav onHowItWorksClick={handleHowItWorksClick} />

          <DesktopActions 
            pendingOrders={pendingOrders}
            onSearchClick={handleSearchClick}
            onLocationClick={handleLocationClick}
            onPickupCodeClick={() => setPickupCodeOpen(true)}
            onSignInClick={handleSignInClick}
          />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <MobileMenu 
          isOpen={mobileMenuOpen}
          pendingOrders={pendingOrders}
          onClose={() => setMobileMenuOpen(false)}
          onSearchClick={handleSearchClick}
          onLocationClick={handleLocationClick}
          onPickupCodeClick={() => setPickupCodeOpen(true)}
          onHowItWorksClick={handleHowItWorksClick}
          onSignInClick={handleSignInClick}
          onRegisterClick={handleRegisterClick}
          onProfileClick={handleProfileClick}
        />
      </header>

      <PickupCodeDialog 
        isOpen={pickupCodeOpen} 
        onOpenChange={setPickupCodeOpen} 
      />

      <SignInModal
        isOpen={signInModalOpen}
        onClose={() => setSignInModalOpen(false)}
        onRegisterClick={() => {
          setSignInModalOpen(false);
          setRegisterModalOpen(true);
        }}
        onMerchantRegisterClick={() => {
          setSignInModalOpen(false);
          setRegisterMerchantModalOpen(true);
        }}
      />
      
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSignInClick={() => {
          setRegisterModalOpen(false);
          setSignInModalOpen(true);
        }}
      />
      
      <RegisterMerchantModal
        isOpen={registerMerchantModalOpen}
        onClose={() => setRegisterMerchantModalOpen(false)}
        onSignInClick={() => {
          setRegisterMerchantModalOpen(false);
          setSignInModalOpen(true);
        }}
      />
      
      <SearchBar 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
      
      <LocationPicker
        isOpen={locationPickerOpen}
        onClose={() => setLocationPickerOpen(false)}
      />
      
      <HowItWorksModal
        isOpen={howItWorksOpen}
        onClose={() => setHowItWorksOpen(false)}
      />
    </>
  );
};

export default Navbar;
