
import { Link } from "react-router-dom";
import { Leaf, DollarSign, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Benefits = () => {
  const { t } = useLanguage();

  // Benefits data with translations
  const BENEFITS = [
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: t("save_money"),
      description: t("get_delicious")
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: t("reduce_waste"),
      description: t("help_businesses")
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      title: t("support_local"),
      description: t("support_local_businesses")
    }
  ];

  return (
    <section className="section bg-white py-20">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t("why_choose")}</h2>
          <p className="text-muted-foreground">
            {t("join_thousands")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto bg-secondary rounded-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-4">{t("ready_to_reduce")}</h3>
            <p className="text-muted-foreground mb-6">
              {t("join_thousands")}
            </p>
            <Button asChild size="lg">
              <Link to="/browse">{t("find_food_now")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
