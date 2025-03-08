
import { useState } from "react";
import { ShoppingBag, MapPin, Clock, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal = ({ isOpen, onClose }: HowItWorksModalProps) => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: t("find_nearby"),
      description: t("discover_restaurants")
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-primary" />,
      title: t("reserve_pay"),
      description: t("select_favorite")
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: t("pickup_time"),
      description: t("collect_food")
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t("how_it_works_heading")}</DialogTitle>
          <DialogDescription>
            {t("save_food_steps")}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button onClick={onClose}>{t("got_it")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksModal;
