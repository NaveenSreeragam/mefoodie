import { useState } from "react";
import { BellIcon, ChevronRightIcon, SparklesIcon } from "./icons";
import {
  FoodCard,
  RestaurantCard,
  HiddenGemCard,
  SectionHeader,
  SearchBar,
} from "./components";
import { foodCategories, getTimeGreeting, getTimeRecommendations, type Restaurant } from "./data";

const IMG = {
  biryani:
    "https://images.unsplash.com/photo-1722698030083-75d1d50cabe4?w=400&h=400&fit=crop&auto=format",
  chicken:
    "https://images.unsplash.com/photo-1515931215890-366d3990cf8d?w=400&h=400&fit=crop&auto=format",
  shawarma:
    "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=400&fit=crop&auto=format",
  dessert:
    "https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=400&h=400&fit=crop&auto=format",
  snack:
    "https://images.unsplash.com/photo-1788621138170-6854f17c9e2e?w=400&h=400&fit=crop&auto=format",
  streetSnack:
    "https://images.unsplash.com/photo-1760263051331-0e4d3dafc9ff?w=400&h=400&fit=crop&auto=format",
};

interface Props {
  restaurants: Restaurant[];
  onRestaurantClick: (id: string) => void;
  onExploreClick: () => void;
  onHiddenGemsClick: () => void;
}

const cravingItems = [
  {
    name: "Chicken Biriyani",
    restaurant: "Azad Hotel",
    price: 180,
    rating: 4.8,
    distance: "1.2 km",
    image: IMG.biryani,
    isVeg: false,
    isSpicy: false,
  },
  {
    name: "Kerala Chicken Fry",
    restaurant: "Buhari Hotel",
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
    price: 80,
    rating: 4.6,
    distance: "1.5 km",
    image: IMG.shawarma,
    isVeg: false,
    isSpicy: false,
  },
  {
    name: "Pazham Pori",
    restaurant: "SL Bakery",
    price: 12,
    rating: 4.8,
    distance: "0.4 km",
    image: IMG.snack,
    isVeg: true,
    isSpicy: false,
  },
  {
    name: "Masala Chai",
    restaurant: "Chai Chronicles",
    price: 15,
    rating: 4.9,
    distance: "2.1 km",
    image: IMG.streetSnack,
    isVeg: true,
    isSpicy: false,
  },
  {
    name: "Bakery Pastries",
    restaurant: "SL Bakery",
    price: 45,
    rating: 4.5,
    distance: "0.4 km",
    image: IMG.dessert,
    isVeg: true,
    isSpicy: false,
  },
];

export default function HomeScreen({
  restaurants,
  onRestaurantClick,
  onExploreClick,
  onHiddenGemsClick,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useState<Record<number, boolean>>({});
  const timeRec = getTimeRecommendations();

  const toggleSave = (idx: number) => setSavedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const hiddenGems = restaurants.filter((r) => r.isHiddenGem);

  return (
    <div className="pb-12 screen-enter px-4 sm:px-6 md:px-8 py-6">
      {/* Mobile Header Greeting */}
      <div className="md:hidden pt-4 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#8B8578] text-xs font-body">📍 Jubilee Hills, Hyderabad</p>
            <h1 className="font-display font-black text-[#24221D] text-2xl mt-1 leading-tight">
              {getTimeGreeting()},<br />
              <span className="text-[#FFC928]">Naveen</span> 👋
            </h1>
            <p className="text-[#8B8578] text-xs font-body mt-1">What are you craving today?</p>
          </div>
          <button
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center relative mt-1 shadow-sm"
          >
            <BellIcon size={20} className="text-[#24221D]" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#FF5733] rounded-full" />
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-4">
          <SearchBar onFocus={onExploreClick} />
        </div>
      </div>

      {/* Hero Banner for Desktop & Tablet */}
      <div className="hidden md:block mb-8 bg-gradient-to-r from-[#24221D] to-[#3D3930] rounded-[28px] p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-xl">
          <span className="bg-[#FFC928] text-[#24221D] text-xs font-display font-black px-3 py-1 rounded-full inline-flex items-center gap-1 mb-3">
            <SparklesIcon size={14} /> HYPER-LOCAL FOOD FINDER
          </span>
          <h2 className="font-display font-black text-3xl lg:text-4xl text-white leading-tight">
            {getTimeGreeting()}, <span className="text-[#FFC928]">Naveen!</span>
          </h2>
          <p className="text-white/80 font-body text-base mt-2">
            Discover hyper-local authentic dishes, hidden street food gems, and live food reviews around you.
          </p>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={onExploreClick}
              className="bg-[#FFC928] hover:bg-[#e6b420] text-[#24221D] font-display font-bold px-6 py-3 rounded-2xl transition-transform active:scale-95 shadow-md"
            >
              Explore Authentic Food 🍜
            </button>
            <button
              onClick={onHiddenGemsClick}
              className="bg-white/10 hover:bg-white/20 text-white font-display font-bold px-6 py-3 rounded-2xl backdrop-blur-sm transition-colors"
            >
              View Hidden Gems 💎
            </button>
          </div>
        </div>

        {/* Floating Hero Decorative Badge */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center w-48">
            <p className="text-2xl font-black text-[#FFC928]">120+</p>
            <p className="text-xs text-white/80">Curated Local Spots</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center w-48">
            <p className="text-2xl font-black text-[#FFC928]">4.9 ★</p>
            <p className="text-xs text-white/80">Avg Taste Rating</p>
          </div>
        </div>
      </div>

      {/* Food Categories Horizontal / Responsive Grid */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display font-black text-[#24221D] text-lg">What are you craving?</h2>
          <button onClick={onExploreClick} className="text-[#8B8578] hover:text-[#24221D] text-xs font-bold flex items-center gap-0.5">
            View All <ChevronRightIcon size={14} />
          </button>
        </div>
        <div className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-none">
          {foodCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div
                className={`w-[72px] h-[72px] squircle-cat flex items-center justify-center text-3xl transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-[#24221D] scale-105 shadow-lg"
                    : "bg-white hover:bg-[#FFF9ED] group-hover:scale-105 border border-[#F5E9C8]"
                }`}
                style={{
                  boxShadow:
                    activeCategory === cat.id
                      ? "0 4px 16px rgba(36,34,29,0.25)"
                      : "0 2px 8px rgba(36,34,29,0.06)",
                }}
              >
                {cat.emoji}
              </div>
              <span
                className={`text-xs font-body font-medium text-center leading-tight max-w-[76px] ${
                  activeCategory === cat.id ? "text-[#24221D] font-bold" : "text-[#8B8578]"
                }`}
              >
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Explore CTA Prompt */}
      <div className="mb-8 md:hidden">
        <button
          onClick={onExploreClick}
          className="w-full bg-[#24221D] text-white rounded-[24px] p-5 flex items-center justify-between active:scale-[0.98] transition-transform shadow-md"
        >
          <div>
            <p className="font-display font-black text-base">Explore Top Local Gems</p>
            <p className="text-white/70 text-xs font-body mt-0.5">Handpicked food spots & authentic flavors 🥟</p>
          </div>
          <span className="bg-[#FFC928] text-[#24221D] font-display font-extrabold text-xs px-4 py-2.5 rounded-full">
            EXPLORE
          </span>
        </button>
      </div>

      {/* Trending Near You (Responsive Multi-column Grid on Desktop) */}
      <div className="mb-8">
        <SectionHeader
          title="🔥 Trending near you"
          subtitle="Places imported from your food explorer list"
          onSeeAll={onExploreClick}
        />
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
          {restaurants.map((r) => (
            <div key={r.id} className="min-w-[260px] sm:min-w-0">
              <RestaurantCard restaurant={r} onClick={() => onRestaurantClick(r.id)} />
            </div>
          ))}
        </div>
        {restaurants.length === 0 && <p className="text-sm text-[#8B8578]">Import the Excel SQL file to show restaurants here.</p>}
      </div>

      {/* Hidden Gems Section */}
      <div className="mb-8">
        <SectionHeader
          title="✨ Hidden Gems"
          subtitle="Authentic local spots loved by true foodies"
          onSeeAll={onHiddenGemsClick}
        />
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-2 md:grid-cols-3 sm:overflow-visible">
          {hiddenGems.map((r) => (
            <div key={r.id} className="min-w-[280px] sm:min-w-0">
              <HiddenGemCard restaurant={r} onClick={() => onRestaurantClick(r.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
