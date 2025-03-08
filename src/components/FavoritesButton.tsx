
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { FavoriteItem } from "@/types/auth";

interface FavoritesButtonProps {
  item: {
    id: string;
    name: string;
    restaurant: string;
    image: string;
    originalPrice: number;
    discountedPrice: number;
    distance?: string;
    timeLeft?: string;
    tags?: string[];
  };
  className?: string;
}

export const FavoritesButton = ({ item, className }: FavoritesButtonProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useAuth();
  const isFav = isFavorite(item.id);
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFav) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites({
        name: item.name,
        restaurant: item.restaurant,
        image: item.image,
        originalPrice: item.originalPrice,
        discountedPrice: item.discountedPrice,
        distance: item.distance || "",
        timeLeft: item.timeLeft || "",
        tags: item.tags
      });
    }
  };
  
  return (
    <button
      onClick={handleToggleFavorite}
      className={cn(
        "absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10",
        isFav ? "text-red-500" : "text-gray-500",
        className
      )}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={cn("h-5 w-5", isFav ? "fill-current" : "")} />
    </button>
  );
};

export default FavoritesButton;
