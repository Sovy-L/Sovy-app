
import React from 'react';
import { CalendarClock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export interface PickupInfoProps {
  pickupTime: string;
  pickupLocation: string;
  lat: number;
  lng: number;
}

const PickupInfo = ({ pickupTime, pickupLocation, lat, lng }: PickupInfoProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Pickup Information</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CalendarClock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Pickup Time</h3>
                <p className="text-sm text-muted-foreground mt-1">{pickupTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Pickup Location</h3>
                <p className="text-sm text-muted-foreground mt-1">{pickupLocation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Map will be displayed here</p>
      </div>
    </div>
  );
};

export default PickupInfo;
