
import { useState, useEffect } from "react";
import { FavoriteItem } from "@/types/auth";

export const useFavorites = (initialFavorites: FavoriteItem[] = []) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : initialFavorites;
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: Omit<FavoriteItem, "id" | "addedAt">) => {
    const newFavorite: FavoriteItem = {
      ...item,
      id: `fav-${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date().toISOString(),
      distance: item.distance || "Unknown distance",  // Ensure distance is not undefined
      timeLeft: item.timeLeft || "Unknown time",     // Ensure timeLeft is not undefined
    };
    
    setFavorites(prev => [...prev, newFavorite]);
  };

  const removeFromFavorites = (itemId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== itemId));
  };

  const isFavorite = (itemId: string) => {
    return favorites.some(item => item.id === itemId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};
