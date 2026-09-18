import { useState } from 'react';
import { BellIcon, ChevronRightIcon } from './icons';
import {
  FoodCard, RestaurantCard, HiddenGemCard,
  SectionHeader, SearchBar, FilterPill
} from './components';
import {
  restaurants, foodCategories, getTimeGreeting, getTimeRecommendations,
} from './data';

const IMG = {
  biryani: 'https://images.unsplash.com/photo-1722698030083-75d1d50cabe4?w=400&h=400&fit=crop&auto=format',
  chicken: 'https://images.unsplash.com/photo-1515931215890-366d3990cf8d?w=400&h=400&fit=crop&auto=format',
  shawarma: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=400&fit=crop&auto=format',
  dessert: 'https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=400&h=400&fit=crop&auto=format',
  snack: 'https://images.unsplash.com/photo-1788621138170-6854f17c9e2e?w=400&h=400&fit=crop&auto=format',
  streetSnack: 'https://images.unsplash.com/photo-1760263051331-0e4d3dafc9ff?w=400&h=400&fit=crop&auto=format',
};

interface Props {
  onRestaurantClick: (id: string) => void;
  onExploreClick: () => void;
  onCravingClick: () => void;
  onHiddenGemsClick: () => void;
}

const cravingItems = [
  { name: 'Chicken Biriyani', restaurant: 'Azad Hotel', price: 180, rating: 4.8, distance: '1.2 km', image: IMG.biryani, isVeg: false, isSpicy: false },
  { name: 'Kerala Chicken Fry', restaurant: 'Buhari Hotel', price: 140, rating: 4.9, distance: '0.8 km', image: IMG.chicken, isVeg: false, isSpicy: true },
  { name: 'Chicken Shawarma', restaurant: 'Shawarma King', price: 80, rating: 4.6, distance: '1.5 km', image: IMG.shawarma, isVeg: false, isSpicy: false },
  { name: 'Pazham Pori', restaurant: 'SL Bakery', price: 12, rating: 4.8, distance: '0.4 km', image: IMG.snack, isVeg: true, isSpicy: false },
  { name: 'Masala Chai', restaurant: 'Chai Chronicles', price: 15, rating: 4.9, distance: '2.1 km', image: IMG.streetSnack, isVeg: true, isSpicy: false },
  { name: 'Bakery Pastries', restaurant: 'SL Bakery', price: 45, rating: 4.5, distance: '0.4 km', image: IMG.dessert, isVeg: true, isSpicy: false },
];

const lateNightItems = [
  { name: 'Spicy Shawarma', restaurant: 'Shawarma King', price: 90, rating: 4.5, distance: '1.5 km', image: IMG.shawarma, isVeg: false, isSpicy: true },
  { name: 'Chicken Porotta', restaurant: 'Buhari Hotel', price: 160, rating: 4.7, distance: '0.8 km', image: IMG.chicken, isVeg: false, isSpicy: false },
  { name: 'Beef Biriyani', restaurant: 'Azad Hotel', price: 200, rating: 4.7, distance: '1.2 km', image: IMG.biryani, isVeg: false, isSpicy: true },
];

export default function HomeScreen({ onRestaurantClick, onExploreClick, onCravingClick, onHiddenGemsClick }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useState<Record<number, boolean>>({});
  const timeRec = getTimeRecommendations();

  const toggleSave = (idx: number) => setSavedItems(prev => ({ ...prev, [idx]: !prev[idx] }));

  const hiddenGems = restaurants.filter(r => r.isHiddenGem);

  return (
    <div className="pb-28 screen-enter">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#8B8578] text-sm font-body">📍 Thiruvananthapuram, Kerala</p>
            <h1 className="font-display font-900 text-[#24221D] text-2xl mt-1 leading-tight">
              {getTimeGreeting()},<br />
              <span className="text-[#FFC928]">Arjun</span> 👋
            </h1>
            <p className="text-[#8B8578] text-sm font-body mt-1">What are you craving today?</p>
          </div>
          <button className="w-11 h-11 rounded-full bg-white flex items-center justify-center relative mt-1" style={{ boxShadow: '0 2px 12px rgba(36,34,29,0.08)' }}>
            <BellIcon size={20} className="text-[#24221D]" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#FFC928] rounded-full border-2 border-white" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-5">
        <SearchBar onFocus={onExploreClick} />
      </div>

      {/* Food Categories */}
      <div className="mb-6">
        <div className="px-4 mb-3">
          <h2 className="font-display font-800 text-[#24221D] text-base">What are you craving?</h2>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto pb-1">
          {foodCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5"
            >
              <div className={`w-[68px] h-[68px] squircle-cat flex items-center justify-center text-2xl transition-all ${activeCategory === cat.id ? 'bg-[#24221D] scale-105' : 'bg-white'}`}
                style={{ boxShadow: activeCategory === cat.id ? '0 4px 16px rgba(36,34,29,0.25)' : '0 2px 8px rgba(36,34,29,0.06)' }}>
                {cat.emoji}
              </div>
              <span className={`text-[11px] font-body font-500 text-center leading-tight max-w-[68px] ${activeCategory === cat.id ? 'text-[#24221D] font-700' : 'text-[#8B8578]'}`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Time-based Recommendations */}
      <div className="mb-6">
        <SectionHeader
          title={timeRec.label}
          subtitle={timeRec.desc}
          onSeeAll={onExploreClick}
        />
        <div className="flex gap-3 px-4 overflow-x-auto pb-1">
          {cravingItems.map((item, i) => (
            <FoodCard
              key={i}
              {...item}
              saved={savedItems[i]}
              onSave={() => toggleSave(i)}
              onClick={() => onRestaurantClick(restaurants.find(r => r.name === item.restaurant)?.id ?? 'azad')}
            />
          ))}
        </div>
      </div>

      {/* Craving Prompt CTA */}
      <div className="mx-4 mb-6">
        <button
          onClick={onCravingClick}
          className="w-full bg-[#24221D] text-white rounded-[20px] p-4 flex items-center justify-between active:scale-[0.98] transition-transform"
          style={{ boxShadow: '0 4px 20px rgba(36,34,29,0.2)' }}
        >
          <div>
            <p className="font-display font-900 text-base">Not sure what to eat?</p>
            <p className="text-white/60 text-sm font-body mt-0.5">Let MeFoodie surprise you 🎲</p>
          </div>
          <span className="bg-[#FFC928] text-[#24221D] font-display font-800 text-sm px-4 py-2 rounded-full">
            SURPRISE ME
          </span>
        </button>
      </div>

      {/* Trending Near You */}
      <div className="mb-6">
        <SectionHeader title="🔥 Trending near you" subtitle="Most ordered in the last 2 hours" onSeeAll={onExploreClick} />
        <div className="flex gap-3 px-4 overflow-x-auto pb-1">
          {restaurants.slice(0, 4).map(r => (
            <RestaurantCard key={r.id} restaurant={r} onClick={() => onRestaurantClick(r.id)} />
          ))}
        </div>
      </div>

      {/* Hidden Gems */}
      {hiddenGems.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <div>
              <h2 className="font-display font-800 text-[#24221D] text-base">✦ Hidden Gems</h2>
              <p className="text-[#8B8578] text-xs font-body mt-0.5">Places only the locals know</p>
            </div>
            <button onClick={onHiddenGemsClick} className="text-[#FFC928] text-sm font-display font-700">See all</button>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto pb-1">
            {hiddenGems.map(r => (
              <HiddenGemCard key={r.id} restaurant={r} onClick={() => onRestaurantClick(r.id)} />
            ))}
          </div>
        </div>
      )}

      {/* Late Night Cravings */}
      <div className="mb-6">
        <SectionHeader title="🌙 Late-night cravings" subtitle="Still open after midnight" onSeeAll={onExploreClick} />
        <div className="flex gap-3 px-4 overflow-x-auto pb-1">
          {lateNightItems.map((item, i) => (
            <FoodCard
              key={i}
              {...item}
              saved={savedItems[100 + i]}
              onSave={() => toggleSave(100 + i)}
              onClick={() => onRestaurantClick(restaurants.find(r => r.name === item.restaurant)?.id ?? 'shawarma-king')}
            />
          ))}
        </div>
      </div>

      {/* Popular Right Now */}
      <div className="mb-6">
        <SectionHeader title="⚡ Popular right now" subtitle="Most-loved in Thiruvananthapuram" onSeeAll={onExploreClick} />
        <div className="flex flex-col gap-3 px-4">
          {restaurants.slice(0, 3).map((r, i) => (
            <button
              key={r.id}
              onClick={() => onRestaurantClick(r.id)}
              className="flex items-center gap-3 bg-white rounded-[16px] p-3 text-left active:scale-[0.98] transition-transform"
              style={{ boxShadow: '0 2px 8px rgba(36,34,29,0.06)' }}
            >
              <span className="font-display font-900 text-2xl text-[#F5E9C8] w-8">{i + 1}</span>
              <div className="w-12 h-12 rounded-[10px] overflow-hidden bg-[#F5E9C8] flex-shrink-0">
                <img src={r.coverImage} alt={r.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-700 text-[#24221D] text-sm">{r.name}</p>
                <p className="text-[#8B8578] text-xs font-body line-clamp-1">{r.cuisine}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="bg-[#24221D] text-[#FFC928] text-xs font-display font-bold px-2 py-0.5 rounded-full">★ {r.rating}</span>
                <span className="text-[#8B8578] text-[10px]">{r.distance}</span>
              </div>
              <ChevronRightIcon size={16} className="text-[#C4BDB3]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
