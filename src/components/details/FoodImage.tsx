
import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import FavoritesButton from '@/components/FavoritesButton';

export interface FoodImageProps {
  image: string;
  timeLeft: string;
  distance: string;
}

const FoodImage = ({ image, timeLeft, distance }: FoodImageProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <img
        src={image}
        alt="Food"
        className="w-full h-[300px] object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-3 bg-gradient-to-t from-black/80 to-transparent text-white">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">{timeLeft} left</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{distance}</span>
        </div>
      </div>
      <div className="absolute top-3 left-3">
        <Badge className="bg-green-600 text-white hover:bg-green-700">
          Save food, save money
        </Badge>
      </div>
    </div>
  );
};

export default FoodImage;
