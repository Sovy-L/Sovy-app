
import { useState } from "react";
import { PaymentMethod } from "@/types/auth";
import { toast } from "sonner";

export const usePaymentMethods = (initialPaymentMethods: PaymentMethod[] = []) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);

  const addPaymentMethod = (cardNumber: string, cardholderName: string, expiryDate: string, makeDefault = false) => {
    const last4 = cardNumber.replace(/\s+/g, "").slice(-4);
    
    const newPaymentMethod: PaymentMethod = {
      id: "pm-" + Math.random().toString(36).substr(2, 9),
      cardNumber: last4,
      cardholderName,
      expiryDate,
      isDefault: makeDefault,
    };
    
    // If this is set as default, unset any existing default
    let updatedPaymentMethods = [...paymentMethods];
    
    if (makeDefault) {
      updatedPaymentMethods = updatedPaymentMethods.map(pm => ({
        ...pm,
        isDefault: false
      }));
    }
    
    // If this is the first payment method, make it default
    if (updatedPaymentMethods.length === 0) {
      newPaymentMethod.isDefault = true;
    }
    
    setPaymentMethods([...updatedPaymentMethods, newPaymentMethod]);
    
    toast.success("Payment method added", {
      description: `Card ending in ${last4} has been added to your account.`,
    });
    
    return newPaymentMethod.id;
  };
  
  const setDefaultPaymentMethod = (paymentMethodId: string) => {
    const updatedPaymentMethods = paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === paymentMethodId
    }));
    
    setPaymentMethods(updatedPaymentMethods);
    
    toast.success("Default payment method updated", {
      description: "Your default payment method has been updated.",
    });
  };
  
  const deletePaymentMethod = (paymentMethodId: string) => {
    const methodToDelete = paymentMethods.find(pm => pm.id === paymentMethodId);
    const updatedPaymentMethods = paymentMethods.filter(pm => pm.id !== paymentMethodId);
    
    // If we deleted the default payment method, make another one default
    if (methodToDelete?.isDefault && updatedPaymentMethods.length > 0) {
      updatedPaymentMethods[0].isDefault = true;
    }
    
    setPaymentMethods(updatedPaymentMethods);
    
    toast.success("Payment method removed", {
      description: "The payment method has been removed from your account.",
    });
  };

  return {
    paymentMethods,
    setPaymentMethods,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod
  };
};
