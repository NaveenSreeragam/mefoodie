import { useState } from "react";
import {
  ChevronLeftIcon,
  MapPinIcon,
  PhoneIcon,
  NavigationIcon,
  BookmarkIcon,
  StarIcon,
  ClockIcon,
  FlameIcon,
} from "./icons";
import { MenuItemCard, RatingBadge, FoodCard } from "./components";
import { restaurants } from "./data";

interface Props {
  restaurantId: string;
  onBack: () => void;
}

export default function RestaurantScreen({ restaurantId, onBack }: Props) {
  const restaurant = restaurants.find((r) => r.id === restaurantId) ?? restaurants[0];
  const [activeCategory, setActiveCategory] = useState(restaurant.menu[0]?.id ?? "");
  const [saved, setSaved] = useState(false);

  const allItems = restaurant.menu.flatMap((c) => c.items);
  const popularItems = allItems.filter((i) => i.isPopular);

  return (
    <div className="pb-28 screen-enter">
      {/* Cover Photo */}
      <div className="relative h-56 bg-[#F5E9C8]">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24221D]/60 via-transparent to-black/20" />

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
        >
          <ChevronLeftIcon size={20} className="text-[#24221D]" />
        </button>

        {/* Save Button */}
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-12 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
        >
          <BookmarkIcon
            size={18}
            filled={saved}
            className={saved ? "text-[#FFC928]" : "text-[#24221D]"}
          />
        </button>

        {/* Hidden Gem Badge */}
        {restaurant.isHiddenGem && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#FFC928] text-[#24221D] text-xs font-display font-800 px-3 py-1.5 rounded-full">
            ✦ HIDDEN GEM ✦
          </div>
        )}

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="font-display font-900 text-white text-2xl leading-tight">
            {restaurant.name}
          </h1>
          <p className="text-white/80 text-sm font-body mt-0.5">{restaurant.tagline}</p>
        </div>
      </div>

      {/* Info Row */}
      <div className="bg-white px-4 py-3.5 flex items-center gap-4 border-b border-[#F5E9C8]">
        <RatingBadge rating={restaurant.rating} size="md" />
        <span className="text-[#8B8578] text-xs font-body">{restaurant.reviewCount} reviews</span>
        <span
          className={`text-xs font-bold flex items-center gap-1 ${restaurant.isOpen ? "text-green-600" : "text-red-400"}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${restaurant.isOpen ? "bg-green-500" : "bg-red-400"}`}
          />
          {restaurant.isOpen ? `Open until ${restaurant.openUntil}` : "Closed"}
        </span>
        <span className="text-[#8B8578] text-xs">
          {restaurant.priceRange} · ₹{restaurant.avgPrice} avg
        </span>
      </div>

      {/* Location + Actions */}
      <div className="bg-white px-4 py-3.5 border-b border-[#F5E9C8]">
        <p className="text-[#24221D] text-sm font-body flex items-center gap-1.5 mb-3">
          <MapPinIcon size={14} className="text-[#FFC928]" />
          {restaurant.location}
          <span className="text-[#8B8578]">· {restaurant.distance}</span>
        </p>
        <div className="flex gap-2">
          {[
            { icon: <NavigationIcon size={15} className="text-[#24221D]" />, label: "Directions" },
            { icon: <PhoneIcon size={15} className="text-[#24221D]" />, label: "Call" },
            {
              icon: (
                <BookmarkIcon size={15} className={saved ? "text-[#FFC928]" : "text-[#24221D]"} />
              ),
              label: saved ? "Saved" : "Save",
            },
          ].map(({ icon, label }) => (
            <button
              key={label}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#FFF9ED] text-[#24221D] text-xs font-display font-700 active:bg-[#F5E9C8] transition-colors"
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-white border-b border-[#F5E9C8]">
        {restaurant.tags.map((tag) => (
          <span
            key={tag}
            className={`flex-shrink-0 text-xs font-body px-3 py-1 rounded-full ${tag === "Hidden Gem" ? "bg-[#FFC928] text-[#24221D] font-700" : "bg-[#FFF9ED] text-[#8B8578]"}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Popular Items */}
      {popularItems.length > 0 && (
        <div className="mt-4 mb-4">
          <div className="px-4 mb-3">
            <h2 className="font-display font-800 text-[#24221D] text-base">⚡ Popular items</h2>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto pb-1">
            {popularItems.map((item) => (
              <FoodCard
                key={item.id}
                name={item.name}
                restaurant={restaurant.name}
                price={item.price}
                rating={item.rating}
                distance={restaurant.distance}
                image={item.image}
                isVeg={item.isVeg}
                isSpicy={item.isSpicy}
              />
            ))}
          </div>
        </div>
      )}

      {/* Full Menu */}
      <div className="mt-2">
        <div className="px-4 mb-3">
          <h2 className="font-display font-800 text-[#24221D] text-base">Full Menu</h2>
        </div>

        {/* Category Nav */}
        <div className="flex gap-2 px-4 overflow-x-auto pb-2 mb-3">
          {restaurant.menu.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-display font-700 transition-all ${activeCategory === cat.id ? "bg-[#24221D] text-[#FFC928]" : "bg-white text-[#8B8578]"}`}
              style={
                activeCategory !== cat.id ? { boxShadow: "0 1px 4px rgba(36,34,29,0.06)" } : {}
              }
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items by Category */}
        {restaurant.menu.map((cat) => (
          <div key={cat.id} id={cat.id} className="mb-4">
            <div className="px-4 mb-2 flex items-center gap-2">
              <h3 className="font-display font-800 text-[#24221D] text-sm">{cat.name}</h3>
              <span className="text-[#8B8578] text-xs font-body">({cat.items.length} items)</span>
            </div>
            <div className="flex flex-col gap-2 px-4">
              {cat.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
