
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export interface OrderSummaryProps {
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  onReserveClick: () => void;
}

const OrderSummary = ({ name, image, originalPrice, discountedPrice, onReserveClick }: OrderSummaryProps) => {
  const savings = originalPrice - discountedPrice;
  const savingsPercent = Math.round((savings / originalPrice) * 100);
  
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-16 w-16 overflow-hidden rounded-md">
            <img src={image} alt={name} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">1 item</p>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Original price</span>
            <span className="line-through">${originalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Discounted price</span>
            <span>${discountedPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>You save</span>
            <span>${savings.toFixed(2)} ({savingsPercent}%)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onReserveClick}>
          Reserve Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
