
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Ticket, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";

interface PickupCodeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PickupCodeDialog = ({ isOpen, onOpenChange }: PickupCodeDialogProps) => {
  const { purchases } = useAuth();
  const { t } = useLanguage();
  const pendingOrders = purchases.filter(p => 
    (p.status === "pending" || p.status === "ready") && p.pickupCode
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("your_pickup_codes")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {pendingOrders.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              {t("no_active_orders")}
            </div>
          ) : (
            pendingOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{order.foodName}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "ready" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {order.status === "ready" ? t("ready") : t("pending")}
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="px-6 py-3 bg-primary/10 rounded-lg text-center">
                    <h3 className="text-sm text-muted-foreground mb-1">{t("pickup_code")}</h3>
                    <div className="text-3xl font-bold tracking-wider text-primary">{order.pickupCode}</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-muted-foreground">{order.restaurant}</p>
                  {order.pickupTime && (
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDistanceToNow(new Date(order.pickupTime), { addSuffix: true })}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PickupCodeDialog;
