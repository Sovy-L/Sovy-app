
import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface FoodCardProps {
  id: string;
  name: string;
  restaurant: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  distance: string;
  timeLeft: string;
  tags?: string[];
  className?: string;
}

export const FoodCard = ({
  id,
  name,
  restaurant,
  image,
  originalPrice,
  discountedPrice,
  distance,
  timeLeft,
  tags = [],
  className,
}: FoodCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const discountPercentage = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  return (
    <Link to={`/details/${id}`}>
      <Card 
        className={cn(
          "overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group",
          className
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={image}
            alt={name}
            className={cn(
              "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
              !imageLoaded && "opacity-0",
              imageLoaded && "opacity-100"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary font-medium">{discountPercentage}% OFF</Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-base line-clamp-1">{name}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{restaurant}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium">${discountedPrice.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground line-through ml-2">
                ${originalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{distance}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{timeLeft}</span>
          </div>
          <div className="w-full flex gap-1 mt-2 flex-wrap">
            {tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default FoodCard;
