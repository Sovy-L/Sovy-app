
import React from 'react';
import { Utensils } from 'lucide-react';

export interface FoodInformationProps {
  description: string;
  originalPrice: number;
  discountedPrice: number;
  portions: number;
}

const FoodInformation = ({ description, originalPrice, discountedPrice, portions }: FoodInformationProps) => {
  const savingsPercent = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">About this food</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primary/10 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">Original price</p>
          <p className="text-lg font-semibold line-through">${originalPrice.toFixed(2)}</p>
        </div>
        
        <div className="bg-green-100 rounded-lg p-4 text-center">
          <p className="text-sm text-green-700 mb-1">You pay only</p>
          <p className="text-lg font-semibold text-green-700">${discountedPrice.toFixed(2)}</p>
        </div>
        
        <div className="bg-primary/10 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">You save</p>
          <p className="text-lg font-semibold">{savingsPercent}%</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Utensils className="text-muted-foreground" />
        <span>Enough for {portions} {portions === 1 ? 'person' : 'people'}</span>
      </div>
    </div>
  );
};

export default FoodInformation;
