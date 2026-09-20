import { useState } from "react";
import { SlidersIcon, XIcon, ChevronRightIcon, SearchIcon, MapPinIcon } from "./icons";
import { SearchBar, FilterPill, FoodCard, RestaurantCard, RatingBadge } from "./components";
import type { Restaurant } from "./data";

const IMG = {
  biryani:
    "https://images.unsplash.com/photo-1722698030083-75d1d50cabe4?w=400&h=400&fit=crop&auto=format",
  chicken:
    "https://images.unsplash.com/photo-1515931215890-366d3990cf8d?w=400&h=400&fit=crop&auto=format",
  shawarma:
    "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=400&fit=crop&auto=format",
  snack:
    "https://images.unsplash.com/photo-1788621138170-6854f17c9e2e?w=400&h=400&fit=crop&auto=format",
  streetSnack:
    "https://images.unsplash.com/photo-1760263051331-0e4d3dafc9ff?w=400&h=400&fit=crop&auto=format",
};

const allFilters = [
  "Open now",
  "Under ₹150",
  "Under ₹300",
  "Nearby",
  "4.5+ Rating",
  "Veg Only",
  "🌶 Spicy",
  "Delivery",
  "Dine-in",
  "Late Night",
];

const foodResults = [
  {
    name: "Mutton Biriyani",
    restaurant: "Azad Hotel",
    restaurantId: "azad",
    price: 220,
    rating: 4.8,
    distance: "1.2 km",
    image: IMG.biryani,
    isVeg: false,
    isSpicy: true,
  },
  {
    name: "Chicken Fry",
    restaurant: "Buhari Hotel",
    restaurantId: "buhari",
    price: 140,
    rating: 4.9,
    distance: "0.8 km",
    image: IMG.chicken,
    isVeg: false,
    isSpicy: true,
  },
  {
    name: "Chicken Shawarma",
    restaurant: "Shawarma King",
    restaurantId: "shawarma-king",
    price: 80,
    rating: 4.6,
    distance: "1.5 km",
    image: IMG.shawarma,
    isVeg: false,
    isSpicy: false,
  },
  {
    name: "Chicken Porotta",
    restaurant: "Buhari Hotel",
    restaurantId: "buhari",
    price: 160,
    rating: 4.7,
    distance: "0.8 km",
    image: IMG.chicken,
    isVeg: false,
    isSpicy: false,
  },
  {
    name: "Pazham Pori",
    restaurant: "SL Bakery",
    restaurantId: "sl-bakery",
    price: 12,
    rating: 4.8,
    distance: "0.4 km",
    image: IMG.snack,
    isVeg: true,
    isSpicy: false,
  },
  {
    name: "Masala Chai + Vada",
    restaurant: "Chai Chronicles",
    restaurantId: "chai-chronicles",
    price: 35,
    rating: 4.9,
    distance: "2.1 km",
    image: IMG.streetSnack,
    isVeg: true,
    isSpicy: false,
  },
];

interface Props {
  restaurants: Restaurant[];
  onRestaurantClick: (id: string) => void;
}

export default function ExploreScreen({ restaurants, onRestaurantClick }: Props) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "dishes" | "restaurants">("all");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  const filteredRestaurants = restaurants.filter((r) => {
    if (query && !r.name.toLowerCase().includes(query.toLowerCase()) && !r.cuisine.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    if (activeFilters.includes("Open now") && !r.isOpen) return false;
    if (activeFilters.includes("4.5+ Rating") && r.rating < 4.5) return false;
    if (activeFilters.includes("Under ₹300") && r.avgPrice > 300) return false;
    return true;
  });

  return (
    <div className="pb-12 screen-enter px-4 sm:px-6 md:px-8 py-6">
      {/* Title */}
      <div className="pt-2 pb-4">
        <h1 className="font-display font-black text-[#24221D] text-2xl md:text-3xl">
          Explore Food & Places 🧭
        </h1>
        <p className="text-[#8B8578] text-sm font-body mt-1">
          Search dishes, street spots, and top-rated restaurants near you
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 'Biriyani', 'Bakery', 'Late Night'..."
            className="w-full bg-white border border-[#F5E9C8] text-[#24221D] font-body text-sm rounded-2xl pl-11 pr-4 py-3 shadow-sm focus:border-[#FFC928] outline-none"
          />
          <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B8578]" />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8578]">
              <XIcon size={16} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilterModal(true)}
          className={`p-3 rounded-2xl border flex items-center gap-2 font-display font-bold text-sm transition-colors ${
            activeFilters.length > 0 ? "bg-[#24221D] text-[#FFC928] border-[#24221D]" : "bg-white text-[#24221D] border-[#F5E9C8]"
          }`}
        >
          <SlidersIcon size={18} />
          <span className="hidden sm:inline">Filters</span>
          {activeFilters.length > 0 && (
            <span className="bg-[#FFC928] text-[#24221D] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilters.length}
            </span>
          )}
        </button>
      </div>

      {/* Filter Quick Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none mb-6">
        {allFilters.map((f) => (
          <FilterPill
            key={f}
            label={f}
            active={activeFilters.includes(f)}
            onClick={() => toggleFilter(f)}
          />
        ))}
      </div>

      {/* View Switcher Tabs */}
      <div className="flex border-b border-[#F5E9C8] mb-6">
        {[
          { id: "all", label: "All Results" },
          { id: "dishes", label: "Dishes & Craves" },
          { id: "restaurants", label: "Restaurants & Spots" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 font-display font-bold text-sm border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-[#FFC928] text-[#24221D]"
                : "border-transparent text-[#8B8578] hover:text-[#24221D]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Desktop Main Content Layout */}
      <div className="space-y-8">
        {/* Dishes Section */}
        {(activeTab === "all" || activeTab === "dishes") && (
          <div>
            <h2 className="font-display font-black text-[#24221D] text-lg mb-4">
              Popular Dishes Nearby
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {foodResults.map((item, idx) => (
                <FoodCard
                  key={idx}
                  {...item}
                  onClick={() => onRestaurantClick(item.restaurantId)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Restaurants Section */}
        {(activeTab === "all" || activeTab === "restaurants") && (
          <div>
            <h2 className="font-display font-black text-[#24221D] text-lg mb-4">
              Top Rated Restaurants ({filteredRestaurants.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredRestaurants.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} onClick={() => onRestaurantClick(r.id)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
