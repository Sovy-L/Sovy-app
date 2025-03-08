import { useState } from "react";
import { X, CreditCard, Check, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { addMinutes } from "date-fns";

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  food: {
    id: string;
    name: string;
    restaurant: string;
    originalPrice: number;
    discountedPrice: number;
  };
  onSuccess: (orderId: string) => void;
}

type PaymentStepType = "payment-method" | "new-card" | "cash" | "processing" | "success";

export const PaymentModal = ({ isOpen, onClose, food: foodItem, onSuccess }: PaymentModalProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<PaymentStepType>("payment-method");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [saveCard, setSaveCard] = useState(false);
  const [makeDefault, setMakeDefault] = useState(false);
  const [paymentType, setPaymentType] = useState<"card" | "cash">("card");
  
  const { t } = useLanguage();
  const { toast } = useToast();
  const { paymentMethods, addPaymentMethod, addPurchase, updatePurchaseStatus, schedulePickupNotification } = useAuth();

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStep("processing");
    
    const pickupCode = Math.floor(1000 + Math.random() * 9000).toString();
    const pickupTime = addMinutes(new Date(), 30 + Math.floor(Math.random() * 15)).toISOString();
    
    try {
      if (step === "new-card" && saveCard) {
        addPaymentMethod(cardNumber, name, expiry, makeDefault);
      }
      
      const savedAmount = foodItem.originalPrice - foodItem.discountedPrice;
      
      const orderId = addPurchase({
        restaurant: foodItem.restaurant,
        foodName: foodItem.name,
        originalPrice: foodItem.originalPrice,
        paidPrice: foodItem.discountedPrice,
        saved: savedAmount,
        pickupTime,
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      updatePurchaseStatus(orderId, "ready", pickupCode);
      schedulePickupNotification(orderId, pickupTime);
      
      setStep("success");
      
      toast({
        title: paymentType === "card" ? "Payment successful" : "Order placed successfully",
        description: paymentType === "card" 
          ? "Your payment was processed successfully."
          : "Your cash payment order was created successfully.",
      });
      
      setTimeout(() => {
        onSuccess(orderId);
        onClose();
        setStep("payment-method");
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: paymentType === "card" ? "Payment failed" : "Order failed",
        description: "There was an issue processing your order. Please try again.",
      });
      setStep("payment-method");
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setCardNumber("");
    setName("");
    setExpiry("");
    setCvc("");
    setSaveCard(false);
    setMakeDefault(false);
  };

  const handleNewCardClick = () => {
    setStep("new-card");
    resetForm();
  };

  const handleBackToPaymentMethods = () => {
    setStep("payment-method");
    resetForm();
  };
  
  const handleCashPaymentClick = () => {
    setPaymentType("cash");
    setStep("cash");
  };

  const renderContent = () => {
    switch (step) {
      case "payment-method":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Button
                type="button"
                variant={paymentType === "card" ? "default" : "outline"}
                className="w-full flex items-center justify-center"
                onClick={() => setPaymentType("card")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Card
              </Button>
              <Button
                type="button"
                variant={paymentType === "cash" ? "default" : "outline"}
                className="w-full flex items-center justify-center"
                onClick={() => setPaymentType("cash")}
              >
                <span className="mr-2">💵</span>
                Cash
              </Button>
            </div>
            
            {paymentType === "cash" ? (
              <Button 
                type="button" 
                className="w-full mt-4" 
                onClick={handleCashPaymentClick}
              >
                Pay in cash (${foodItem.discountedPrice.toFixed(2)})
              </Button>
            ) : (
              <>
                {paymentMethods.length > 0 ? (
                  <>
                    <RadioGroup 
                      value={selectedPaymentMethod} 
                      onValueChange={setSelectedPaymentMethod}
                      className="space-y-3"
                    >
                      {paymentMethods.map((method) => (
                        <div 
                          key={method.id} 
                          className={`flex items-center space-x-2 rounded-md border p-3 ${
                            selectedPaymentMethod === method.id ? "border-primary" : ""
                          }`}
                        >
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id} className="flex flex-1 cursor-pointer justify-between">
                            <div>
                              <p className="font-medium">•••• •••• •••• {method.cardNumber}</p>
                              <p className="text-sm text-muted-foreground">Expires {method.expiryDate}</p>
                            </div>
                            {method.isDefault && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    <Separator />
                    
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full"
                      onClick={handleNewCardClick}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add new payment method
                    </Button>
                    
                    <Button 
                      type="button" 
                      className="w-full"
                      disabled={!selectedPaymentMethod}
                      onClick={handleSubmit}
                    >
                      Pay ${foodItem.discountedPrice.toFixed(2)}
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center py-6">
                      <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No payment methods yet</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Add a new payment method to continue with your purchase
                      </p>
                    </div>
                    
                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleNewCardClick}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add payment method
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        );
        
      case "new-card":
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cardNumber" className="text-sm font-medium">
                Card Number
              </label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Cardholder Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="expiry" className="text-sm font-medium">
                  Expiry Date
                </label>
                <Input
                  id="expiry"
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cvc" className="text-sm font-medium">
                  CVC
                </label>
                <Input
                  id="cvc"
                  type="text"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ""))}
                  maxLength={3}
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="saveCard"
                checked={saveCard}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSaveCard(checked);
                  if (!checked) setMakeDefault(false);
                }}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="saveCard" className="text-sm">
                Save this card for future payments
              </label>
            </div>
            
            {saveCard && (
              <div className="flex items-center space-x-2 ml-6">
                <input
                  type="checkbox"
                  id="makeDefault"
                  checked={makeDefault}
                  onChange={(e) => setMakeDefault(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="makeDefault" className="text-sm">
                  Make this my default payment method
                </label>
              </div>
            )}
            
            <div className="flex space-x-3 pt-2">
              {paymentMethods.length > 0 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleBackToPaymentMethods}
                >
                  Back
                </Button>
              )}
              <Button type="submit" className="flex-1">
                Pay ${foodItem.discountedPrice.toFixed(2)}
              </Button>
            </div>
          </form>
        );
        
      case "cash":
        return (
          <div className="space-y-4">
            <div className="text-center py-6">
              <div className="mx-auto h-12 w-12 flex items-center justify-center text-primary mb-4 text-3xl">
                💵
              </div>
              <h3 className="text-lg font-medium mb-2">Pay in Cash</h3>
              <p className="text-sm text-muted-foreground">
                You'll pay ${foodItem.discountedPrice.toFixed(2)} in cash when you pick up your order.
              </p>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">{foodItem.name}</p>
                <p className="text-sm text-muted-foreground">{foodItem.restaurant}</p>
              </div>
              <div className="text-right">
                <p className="text-sm line-through text-muted-foreground">
                  ${foodItem.originalPrice.toFixed(2)}
                </p>
                <p className="font-bold text-primary">${foodItem.discountedPrice.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={handleBackToPaymentMethods}
              >
                Back
              </Button>
              <Button 
                type="button" 
                className="flex-1"
                onClick={handleSubmit}
              >
                Confirm Order
              </Button>
            </div>
          </div>
        );
        
      case "processing":
        return (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <h3 className="text-lg font-semibold">
              {paymentType === "card" ? "Processing Payment" : "Processing Order"}
            </h3>
            <p className="text-muted-foreground">
              {paymentType === "card" 
                ? "Please wait while we process your payment..." 
                : "Please wait while we process your order..."}
            </p>
          </div>
        );
        
      case "success":
        return (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">
              {paymentType === "card" ? "Payment Successful!" : "Order Confirmed!"}
            </h3>
            <p className="text-muted-foreground">
              {paymentType === "card"
                ? `Your payment of $${foodItem.discountedPrice.toFixed(2)} was processed successfully.`
                : `Your order of $${foodItem.discountedPrice.toFixed(2)} was confirmed successfully.`}
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isProcessing && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold">
            {paymentType === "cash" && step !== "payment-method"
              ? <span className="mr-2">💵</span>
              : <CreditCard className="mr-2 h-5 w-5" />
            }
            {step === "success" 
              ? (paymentType === "card" ? "Payment Complete" : "Order Confirmed")
              : step === "new-card" 
                ? "Add Payment Method" 
                : step === "cash"
                  ? "Cash Payment"
                  : "Payment Details"}
          </DialogTitle>
          {step !== "processing" && step !== "success" && (
            <Button
              className="absolute right-4 top-4"
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={isProcessing}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </DialogHeader>
        
        <div className="pt-4">{renderContent()}</div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
