
import { Clock, MapPin, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();

  // How it works steps - using translations
  const STEPS = [
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
    <section className="section bg-secondary/50 py-20">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t("how_it_works_heading")}</h2>
          <p className="text-muted-foreground">
            {t("save_food_steps")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, index) => (
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
      </div>
    </section>
  );
};

export default HowItWorks;
