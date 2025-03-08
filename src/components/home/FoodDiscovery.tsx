
import { Link } from "react-router-dom";
import FoodCard from "@/components/FoodCard";
import FavoritesButton from "@/components/FavoritesButton";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { FOODS } from "@/data/sampleFoods";

const FoodDiscovery = () => {
  const { t } = useLanguage();

  return (
    <section className="section bg-white pt-20 pb-16">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t("discover_food")}</h2>
          <p className="text-muted-foreground">
            {t("explore_delicious")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOODS.map((food) => (
            <div key={food.id} className="relative">
              <FoodCard {...food} />
              <FavoritesButton item={food} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/browse">{t("browse_all")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FoodDiscovery;
