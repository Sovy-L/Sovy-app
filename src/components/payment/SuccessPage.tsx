
import { Link } from "react-router-dom";
import { PartyPopper, CalendarClock, ArrowLeft, Tag, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface SuccessPageProps {
  foodItem: {
    id: string;
    name: string;
    restaurant: string;
    pickupTime: string;
    address: string;
  };
  orderId: string;
}

export const SuccessPage = ({ foodItem, orderId }: SuccessPageProps) => {
  const { t } = useLanguage();
  const { purchases } = useAuth();
  
  // Find the purchase in the user's purchase history
  const purchase = purchases.find(p => p.id === orderId);
  const pickupCode = purchase?.pickupCode || "----";

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center px-4 py-12">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
        <PartyPopper className="h-12 w-12 text-primary" />
      </div>
      
      <h1 className="mb-2 text-3xl font-bold">{t("congratulations")}</h1>
      <p className="mb-6 text-xl">{t("order_confirmed")}</p>
      
      <div className="mb-8 max-w-md rounded-lg border bg-card p-6 text-left shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">{foodItem.name}</h2>
        
        <div className="flex justify-center mb-6">
          <div className="px-6 py-3 bg-primary/10 rounded-lg text-center">
            <h3 className="text-sm text-muted-foreground mb-1">Your pickup code</h3>
            <div className="text-3xl font-bold tracking-wider text-primary">{pickupCode}</div>
            <p className="text-xs text-muted-foreground mt-1">Show this code when you pick up your order</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <CalendarClock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Pickup Time</p>
              <p className="text-sm text-muted-foreground">{foodItem.pickupTime}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Pickup Location</p>
              <p className="text-sm text-muted-foreground">{foodItem.address}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Tag className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Order Status</p>
              <p className="text-sm text-muted-foreground capitalize">
                {purchase?.status || "Processing"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mb-6 max-w-md text-muted-foreground">
        {t("pickup_info")}
      </p>
      
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link to="/profile" className="flex items-center">
            View my orders
          </Link>
        </Button>
        
        <Button asChild>
          <Link to="/browse" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back_to_browse")}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
