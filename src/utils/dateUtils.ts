
import { addMinutes, format } from "date-fns";

export const generatePickupTime = () => {
  // Generate a pickup time between 30 and 60 minutes from now
  const minutesToAdd = 30 + Math.floor(Math.random() * 30);
  const pickupTime = addMinutes(new Date(), minutesToAdd);
  return pickupTime.toISOString();
};

export const formatPickupTime = (isoString: string) => {
  return format(new Date(isoString), "h:mm a, MMM d");
};
