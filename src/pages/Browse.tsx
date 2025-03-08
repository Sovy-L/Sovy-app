
import { useState, useEffect } from "react";
import { MapPin, Search, ChevronDown, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Sample food data (expanded)
const ALL_FOODS = [
  {
    id: "1",
    name: "Mystery Box - Mixed Italian Food",
    restaurant: "Bella Pasta",
    image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-4.0.3",
    originalPrice: 24.99,
    discountedPrice: 8.99,
    distance: "0.5 miles",
    timeLeft: "2 hours",
    tags: ["Italian", "Pasta", "Pizza"],
    category: "Italian",
  },
  {
    id: "2",
    name: "Bakery Surprise Pack",
    restaurant: "Golden Crust Bakery",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3",
    originalPrice: 15.99,
    discountedPrice: 5.99,
    distance: "0.8 miles",
    timeLeft: "3 hours",
    tags: ["Bakery", "Pastries", "Fresh"],
    category: "Bakery",
  },
  {
    id: "3",
    name: "Sushi Box - Chef's Selection",
    restaurant: "Sakura Sushi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3",
    originalPrice: 29.99,
    discountedPrice: 12.99,
    distance: "1.2 miles",
    timeLeft: "1 hour",
    tags: ["Japanese", "Sushi", "Fish"],
    category: "Japanese",
  },
  {
    id: "4",
    name: "Organic Fruit & Veggie Box",
    restaurant: "Green Market",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3",
    originalPrice: 18.99,
    discountedPrice: 6.99,
    distance: "1.5 miles",
    timeLeft: "4 hours",
    tags: ["Organic", "Fruit", "Vegetables"],
    category: "Grocery",
  },
  {
    id: "5",
    name: "Coffee Shop Pastry Box",
    restaurant: "Urban Brew",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-4.0.3",
    originalPrice: 12.99,
    discountedPrice: 4.99,
    distance: "0.3 miles",
    timeLeft: "1 hour",
    tags: ["Coffee", "Pastries", "Dessert"],
    category: "Bakery",
  },
  {
    id: "6",
    name: "Lunch Box - Mediterranean",
    restaurant: "Olive Garden",
    image: "https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-4.0.3",
    originalPrice: 16.99,
    discountedPrice: 7.99,
    distance: "0.9 miles",
    timeLeft: "2 hours",
    tags: ["Mediterranean", "Healthy", "Lunch"],
    category: "Mediterranean",
  },
  {
    id: "7",
    name: "Chinese Takeout Mix",
    restaurant: "Golden Dragon",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3",
    originalPrice: 22.99,
    discountedPrice: 9.99,
    distance: "1.1 miles",
    timeLeft: "3 hours",
    tags: ["Chinese", "Asian", "Takeout"],
    category: "Asian",
  },
  {
    id: "8",
    name: "Fresh Salad Bowl",
    restaurant: "Green Eats",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3",
    originalPrice: 14.99,
    discountedPrice: 5.99,
    distance: "0.6 miles",
    timeLeft: "1 hour",
    tags: ["Salad", "Healthy", "Vegan"],
    category: "Healthy",
  },
];

const CATEGORIES = [
  "All",
  "Italian",
  "Bakery",
  "Japanese",
  "Grocery",
  "Mediterranean",
  "Asian",
  "Healthy",
];

const Browse = () => {
  const [foods, setFoods] = useState(ALL_FOODS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filters, setFilters] = useState({
    maxPrice: 20,
    maxDistance: 5,
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    let filteredFoods = ALL_FOODS;
    
    // Filter by search query
    if (searchQuery) {
      filteredFoods = filteredFoods.filter(
        (food) =>
          food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          food.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
          food.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (selectedCategory !== "All") {
      filteredFoods = filteredFoods.filter(
        (food) => food.category === selectedCategory
      );
    }
    
    // Filter by price
    filteredFoods = filteredFoods.filter(
      (food) => food.discountedPrice <= filters.maxPrice
    );
    
    // Filter by distance (converting "X.X miles" to numbers)
    filteredFoods = filteredFoods.filter((food) => {
      const distance = parseFloat(food.distance.split(" ")[0]);
      return distance <= filters.maxDistance;
    });
    
    setFoods(filteredFoods);
  }, [searchQuery, selectedCategory, filters]);
  
  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Browse Available Food</h1>
            <p className="text-muted-foreground">
              Find and reserve surplus food from restaurants and stores near you.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, restaurant or cuisine"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="w-full md:w-40">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>
          
          {filtersOpen && (
            <div className="bg-secondary/50 rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Max Price: ${filters.maxPrice}
                </label>
                <Slider
                  defaultValue={[filters.maxPrice]}
                  max={30}
                  step={1}
                  onValueChange={([value]) => 
                    setFilters({ ...filters, maxPrice: value })
                  }
                  className="py-4"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Max Distance: {filters.maxDistance} miles
                </label>
                <Slider
                  defaultValue={[filters.maxDistance]}
                  max={10}
                  step={0.5}
                  onValueChange={([value]) =>
                    setFilters({ ...filters, maxDistance: value })
                  }
                  className="py-4"
                />
              </div>
            </div>
          )}
          
          {foods.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {foods.map((food) => (
                <FoodCard key={food.id} {...food} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-secondary/50 rounded-lg mb-8">
              <h3 className="text-xl font-medium mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setFilters({ maxPrice: 20, maxDistance: 5 });
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
          
          <div className="flex justify-center mb-8">
            <Button variant="outline" size="lg">
              Load More
            </Button>
          </div>
          
          <div className="bg-primary/10 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <h3 className="text-xl font-medium mb-2">Set Your Location</h3>
                <p className="text-muted-foreground mb-4">
                  Get more accurate results by setting your precise location.
                </p>
                <Button className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Use Current Location</span>
                </Button>
              </div>
              <div className="hidden md:block md:w-1/3">
                <div className="aspect-square max-w-[200px] mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Browse;
