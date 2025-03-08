
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Using Leaflet for maps (no API key required)
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the marker data structure
interface FoodMarker {
  id: string;
  name: string;
  restaurant: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  position: { lat: number; lng: number };
  distance?: string;
  timeLeft?: string;
}

interface FoodMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers: FoodMarker[];
}

const FoodMap = ({ center, zoom, markers }: FoodMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // If map already exists, just update view
    if (leafletMap.current) {
      leafletMap.current.setView([center.lat, center.lng], zoom);
      return;
    }

    // Create new map
    leafletMap.current = L.map(mapRef.current).setView([center.lat, center.lng], zoom);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap.current);

    // Create a layer group for markers
    markersLayerRef.current = L.layerGroup().addTo(leafletMap.current);

    // Cleanup on unmount
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  // Update map center and zoom when props change
  useEffect(() => {
    if (leafletMap.current) {
      leafletMap.current.setView([center.lat, center.lng], zoom);
    }
  }, [center, zoom]);

  // Create custom food basket icon
  const createFoodIcon = () => {
    return L.divIcon({
      html: `<div class="bg-primary text-white p-2 rounded-full shadow-md">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
             </div>`,
      className: 'food-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  };

  // Update markers when they change
  useEffect(() => {
    if (!markersLayerRef.current || !leafletMap.current) return;

    // Clear existing markers
    markersLayerRef.current.clearLayers();

    // Add markers for each food item
    markers.forEach(marker => {
      const foodIcon = createFoodIcon();
      
      const popupContent = `
        <div class="food-popup p-2">
          <div class="font-bold">${marker.name}</div>
          <div class="text-sm text-gray-600">${marker.restaurant}</div>
          <div class="mt-1 flex justify-between items-center">
            <div>
              <span class="line-through text-xs text-gray-500">$${marker.originalPrice.toFixed(2)}</span>
              <span class="text-primary font-bold ml-1">$${marker.discountedPrice.toFixed(2)}</span>
            </div>
            <button 
              class="bg-primary text-white text-xs px-2 py-1 rounded-md hover:bg-primary/90 transition-colors"
              onclick="window.location.href='/details/${marker.id}'"
            >
              ${t("view")}
            </button>
          </div>
        </div>
      `;

      const m = L.marker([marker.position.lat, marker.position.lng], { 
        icon: foodIcon,
        title: marker.name
      })
        .addTo(markersLayerRef.current!)
        .bindPopup(popupContent)
        .on('click', () => {
          leafletMap.current?.setView([marker.position.lat, marker.position.lng], zoom);
        });
    });
  }, [markers, navigate, t, zoom]);

  return <div ref={mapRef} className="h-full w-full" />;
};

export default FoodMap;
