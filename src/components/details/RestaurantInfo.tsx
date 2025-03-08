
import React, { useState } from 'react';
import { Building, Phone, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface RestaurantInfoProps {
  name: string;
  address: string;
  phone: string;
  openingHours: {
    [key: string]: string;
  };
}

const RestaurantInfo = ({ name, address, phone, openingHours }: RestaurantInfoProps) => {
  const [showAllHours, setShowAllHours] = useState(false);
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Restaurant Information</h2>
      
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{address}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Contact</h3>
                <p className="text-sm text-muted-foreground mt-1">{phone}</p>
              </div>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="opening-hours">
              <AccordionTrigger className="py-2">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Opening Hours
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {Object.entries(openingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="font-medium">{day}</span>
                      <span className="text-muted-foreground">{hours}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantInfo;
