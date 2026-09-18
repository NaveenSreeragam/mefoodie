import { useState } from "react";
import { SlidersIcon, XIcon, ChevronRightIcon } from "./icons";
import { SearchBar, FilterPill, FoodCard, RestaurantCard, RatingBadge } from "./components";
import { restaurants, foodCategories } from "./data";

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
  onRestaurantClick: (id: string) => void;
}

export default function ExploreScreen({ onRestaurantClick }: Props) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"food" | "restaurants">("food");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (f: string) =>
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const filteredFood = foodResults.filter(
    (f) =>
      !query ||
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.restaurant.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredRestaurants = restaurants.filter(
    (r) =>
      !query ||
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="pb-28 screen-enter">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <h1 className="font-display font-900 text-[#24221D] text-2xl">Explore</h1>
        <p className="text-[#8B8578] text-sm font-body mt-1">Find food, restaurants, cravings</p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search chicken shawarma, biriyani…"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-4 overflow-x-auto pb-1 mb-4">
        <button className="flex-shrink-0 w-9 h-9 rounded-full bg-[#24221D] flex items-center justify-center">
          <SlidersIcon size={16} className="text-[#FFC928]" />
        </button>
        {allFilters.map((f) => (
          <FilterPill
            key={f}
            label={f}
            active={activeFilters.includes(f)}
            onClick={() => toggleFilter(f)}
          />
        ))}
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 px-4 mb-4 overflow-x-auto">
          <span className="text-xs text-[#8B8578] font-body flex-shrink-0">Filtered:</span>
          {activeFilters.map((f) => (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              className="flex-shrink-0 flex items-center gap-1 bg-[#FFC928] text-[#24221D] text-xs font-display font-700 px-3 py-1 rounded-full"
            >
              {f} <XIcon size={12} />
            </button>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mx-4 mb-4 bg-[#F5E9C8] p-1 rounded-full">
        {(["food", "restaurants"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-full text-sm font-display font-700 capitalize transition-all ${activeTab === tab ? "bg-[#24221D] text-[#FFC928] shadow-sm" : "text-[#8B8578]"}`}
          >
            {tab === "food"
              ? `🍽 Food (${filteredFood.length})`
              : `🏪 Restaurants (${filteredRestaurants.length})`}
          </button>
        ))}
      </div>

      {/* Results */}
      {activeTab === "food" ? (
        <div>
          {query && (
            <div className="px-4 mb-3">
              <p className="text-[#8B8578] text-sm font-body">
                Showing results for <span className="font-600 text-[#24221D]">"{query}"</span>
              </p>
            </div>
          )}
          {filteredFood.length === 0 ? (
            <EmptyState query={query} />
          ) : (
            <div className="grid grid-cols-2 gap-3 px-4">
              {filteredFood.map((item, i) => (
                <FoodCard
                  key={i}
                  name={item.name}
                  restaurant={item.restaurant}
                  price={item.price}
                  rating={item.rating}
                  distance={item.distance}
                  image={item.image}
                  isVeg={item.isVeg}
                  isSpicy={item.isSpicy}
                  onClick={() => onRestaurantClick(item.restaurantId)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-4">
          {filteredRestaurants.length === 0 ? (
            <EmptyState query={query} />
          ) : (
            filteredRestaurants.map((r) => (
              <button
                key={r.id}
                onClick={() => onRestaurantClick(r.id)}
                className="flex items-center gap-3 bg-white rounded-[16px] p-3 text-left active:scale-[0.98] transition-transform"
                style={{ boxShadow: "0 2px 8px rgba(36,34,29,0.06)" }}
              >
                <div className="w-16 h-16 rounded-[12px] overflow-hidden bg-[#F5E9C8] flex-shrink-0">
                  <img src={r.coverImage} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display font-700 text-[#24221D] text-sm">{r.name}</p>
                    <RatingBadge rating={r.rating} />
                  </div>
                  <p className="text-[#8B8578] text-xs font-body mt-0.5 line-clamp-1">
                    {r.cuisine}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] font-bold ${r.isOpen ? "text-green-600" : "text-red-400"}`}
                    >
                      {r.isOpen ? "● Open" : "● Closed"}
                    </span>
                    <span className="text-[#8B8578] text-[10px]">
                      {r.distance} · {r.priceRange}
                    </span>
                    {r.isHiddenGem && (
                      <span className="bg-[#FFC928] text-[#24221D] text-[9px] font-display font-800 px-1.5 py-0.5 rounded-full">
                        ✦ GEM
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRightIcon size={16} className="text-[#C4BDB3] flex-shrink-0" />
              </button>
            ))
          )}
        </div>
      )}

      {/* Category Browse (when no query) */}
      {!query && (
        <div className="mt-8 px-4">
          <h3 className="font-display font-800 text-[#24221D] text-base mb-3">
            Browse by category
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {foodCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setQuery(cat.label)}
                className="bg-white rounded-[16px] p-3 flex flex-col items-center gap-2 active:scale-[0.97] transition-transform"
                style={{ boxShadow: "0 2px 8px rgba(36,34,29,0.06)" }}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-body text-[#24221D] font-500 text-center leading-tight">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <span className="text-5xl mb-4">🔍</span>
      <p className="font-display font-800 text-[#24221D] text-lg text-center">
        No results for "{query}"
      </p>
      <p className="text-[#8B8578] text-sm font-body mt-2 text-center">
        Try searching for chicken, biriyani, shawarma…
      </p>
    </div>
  );
}
