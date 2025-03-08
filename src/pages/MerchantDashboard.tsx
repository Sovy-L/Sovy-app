
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MerchantDashboard from "@/components/merchant/MerchantDashboard";
import { useAuth } from "@/contexts/AuthContext";

const MerchantDashboardPage = () => {
  const { isAuthenticated, isMerchant } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if not authenticated or not a merchant
    if (!isAuthenticated || !isMerchant) {
      navigate("/");
    }
    
    window.scrollTo(0, 0);
  }, [isAuthenticated, isMerchant, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container-custom">
          <MerchantDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MerchantDashboardPage;
