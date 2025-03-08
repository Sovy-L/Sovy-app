
import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface DetailHeaderProps {
  name: string;
  restaurant: string;
  tags: string[];
  rating: number;
  reviewCount: number;
}

const DetailHeader = ({ name, restaurant, tags, rating, reviewCount }: DetailHeaderProps) => {
  return (
    <div className="w-full pt-20">
      <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
      <div className="flex flex-wrap items-center justify-between mt-2">
        <div>
          <p className="text-lg">{restaurant}</p>
          <div className="flex items-center gap-1 mt-1 text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviewCount} reviews)</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
