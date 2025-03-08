
import { Link } from "react-router-dom";
import FoodCard from "@/components/FoodCard";
import FavoritesButton from "@/components/FavoritesButton";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { FavoriteItem } from "@/types/auth";

interface FavoritesListProps {
  favorites: FavoriteItem[];
}

const FavoritesList = ({ favorites }: FavoritesListProps) => {
  const { t } = useLanguage();

  if (favorites.length === 0) {
    return null;
  }

  return (
    <section className="section bg-white pt-4 pb-12">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t("your_favorites")}</h2>
          <p className="text-muted-foreground">
            {t("quick_access_favorites")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((food) => (
            <div key={food.id} className="relative">
              <FoodCard
                id={food.id}
                name={food.name}
                restaurant={food.restaurant}
                image={food.image}
                originalPrice={food.originalPrice}
                discountedPrice={food.discountedPrice}
                distance={food.distance || "Unknown"}
                timeLeft={food.timeLeft || "Unknown"}
                tags={food.tags}
              />
              <FavoritesButton item={food} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FavoritesList;
