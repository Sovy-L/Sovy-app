
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft } from 'lucide-react';

const DetailNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Search className="h-10 w-10 text-muted-foreground" />
      </div>
      
      <h1 className="mb-2 text-2xl font-bold">Food not found</h1>
      <p className="mb-6 text-muted-foreground max-w-md">
        We couldn't find the food item you're looking for. It may have been reserved already or removed from the menu.
      </p>
      
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back home
          </Link>
        </Button>
        
        <Button asChild>
          <Link to="/browse">Browse food</Link>
        </Button>
      </div>
    </div>
  );
};

export default DetailNotFound;
