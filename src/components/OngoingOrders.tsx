import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";

const OngoingOrders = () => {
  const { purchases } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Filter for pending and ready orders
  const ongoingOrders = purchases.filter(p => p.status === "pending" || p.status === "ready");

  useEffect(() => {
    // Update current time every minute to keep the relative time fresh
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  if (ongoingOrders.length === 0) {
    return null;
  }

  return (
    <section className="bg-primary/5 py-6 mb-8">
      <div className="container-custom">
        <h2 className="text-xl font-semibold mb-4">{t("ongoing_orders")}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ongoingOrders.map((order) => {
            // Calculate pickup time
            let timeDisplay = "";
            if (order.pickupTime) {
              const pickupDate = new Date(order.pickupTime);
              if (pickupDate > currentTime) {
                timeDisplay = formatDistanceToNow(pickupDate, { addSuffix: true });
              } else {
                timeDisplay = "Ready for pickup";
              }
            }
            
            return (
              <Card 
                key={order.id} 
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/success/${order.id}`)}
              >
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-1">
                        <h3 className="font-medium">{order.foodName}</h3>
                        <p className="text-sm text-muted-foreground">{order.restaurant}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "ready" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {order.status === "ready" ? "Ready" : "Pending"}
                      </span>
                    </div>
                    
                    {order.pickupCode && (
                      <div className="mb-3 bg-primary/10 px-3 py-2 rounded-md">
                        <span className="text-xs text-muted-foreground block mb-1">Pickup code</span>
                        <span className="text-lg font-bold tracking-wider text-primary">{order.pickupCode}</span>
                      </div>
                    )}
                    
                    <Separator className="my-3" />
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-primary mr-2" />
                        <span>{timeDisplay}</span>
                      </div>
                      <div className="flex items-center justify-end">
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OngoingOrders;
