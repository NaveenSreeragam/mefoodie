import { useState } from "react";
import {
  StarIcon,
  MapPinIcon,
  BookmarkIcon,
  HeartIcon,
  FlameIcon,
  MessageIcon,
  ShareIcon,
} from "./icons";
import type { Restaurant, MenuItem, FoodPost } from "./data";

// ─── Rating Badge ─────────────────────────────────────────────────────────────
export function RatingBadge({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 bg-[#24221D] text-[#FFC928] font-display font-bold rounded-full ${size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-sm"}`}
    >
      <StarIcon size={size === "sm" ? 10 : 13} className="text-[#FFC928]" />
      {rating.toFixed(1)}
    </span>
  );
}

// ─── Filter Pill ─────────────────────────────────────────────────────────────
export function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-150 ${
        active ? "bg-[#24221D] text-[#FFC928]" : "bg-white text-[#24221D] border border-[#F5E9C8]"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Food Card ────────────────────────────────────────────────────────────────
export function FoodCard({
  name,
  restaurant,
  price,
  rating,
  distance,
  image,
  isVeg,
  isSpicy,
  onSave,
  saved = false,
  onClick,
}: {
  name: string;
  restaurant: string;
  price: number;
  rating: number;
  distance: string;
  image: string;
  isVeg?: boolean;
  isSpicy?: boolean;
  onSave?: () => void;
  saved?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-44 bg-white rounded-[20px] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
      style={{ boxShadow: "0 2px 16px rgba(36,34,29,0.08)" }}
    >
      <div className="relative h-36 bg-[#F5E9C8]">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave?.();
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
        >
          <BookmarkIcon
            size={15}
            filled={saved}
            className={saved ? "text-[#FFC928]" : "text-[#8B8578]"}
          />
        </button>
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          <RatingBadge rating={rating} />
        </div>
        {isSpicy && (
          <span className="absolute top-2 left-2 bg-[#FF5733] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
            <FlameIcon size={10} className="text-white" /> Spicy
          </span>
        )}
      </div>
      <div className="p-2.5">
        <p className="font-display font-700 text-[#24221D] text-sm leading-tight line-clamp-1">
          {name}
        </p>
        <p className="text-[#8B8578] text-[11px] font-body mt-0.5 line-clamp-1">{restaurant}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-display font-bold text-[#FFC928] text-sm">₹{price}</span>
          <span className="text-[#8B8578] text-[10px] flex items-center gap-0.5">
            <MapPinIcon size={10} /> {distance}
          </span>
        </div>
        {isVeg !== undefined && (
          <div className="mt-1.5">
            <span
              className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${isVeg ? "border-green-600" : "border-red-500"}`}
            >
              <span className={`w-2 h-2 rounded-full ${isVeg ? "bg-green-600" : "bg-red-500"}`} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Restaurant Card ──────────────────────────────────────────────────────────
export function RestaurantCard({
  restaurant,
  onClick,
}: {
  restaurant: Restaurant;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-64 bg-white rounded-[20px] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
      style={{ boxShadow: "0 2px 16px rgba(36,34,29,0.08)" }}
    >
      <div className="relative h-36 bg-[#24221D] p-4 flex flex-col justify-between">
        {restaurant.isHiddenGem && (
          <div className="absolute top-2 left-2 bg-[#FFC928] text-[#24221D] text-[10px] font-display font-800 px-2 py-1 rounded-full">
            ✦ HIDDEN GEM ✦
          </div>
        )}
        <div className="flex items-end">
          <p className="font-display font-800 text-white text-base leading-tight pr-2">{restaurant.name}</p>
        </div>
      </div>
      <div className="p-3">
        <p className="font-display font-800 text-[#24221D] text-sm leading-tight">
          {restaurant.name}
        </p>
        <p className="text-[#8B8578] text-[11px] font-body mt-0.5 line-clamp-1">
          {restaurant.cuisine}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#8B8578] text-[11px] flex items-center gap-0.5">
            <MapPinIcon size={10} /> {restaurant.area}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {restaurant.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-[#FFF9ED] text-[#8B8578] text-[10px] px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hidden Gem Card ──────────────────────────────────────────────────────────
export function HiddenGemCard({
  restaurant,
  onClick,
}: {
  restaurant: Restaurant;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative w-72 flex-shrink-0 rounded-[24px] overflow-hidden cursor-pointer active:scale-[0.97] transition-transform"
      style={{ boxShadow: "0 4px 24px rgba(36,34,29,0.15)" }}
    >
      <div className="h-52 bg-[#F5E9C8]">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24221D]/80 via-transparent to-transparent" />
      </div>
      <div className="absolute top-3 left-3">
        <span className="bg-[#FFC928] text-[#24221D] text-[11px] font-display font-800 px-3 py-1 rounded-full tracking-wide">
          ✦ HIDDEN GEM ✦
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-display font-900 text-white text-lg leading-tight">{restaurant.name}</p>
        <p className="text-white/70 text-xs font-body mt-1 flex items-center gap-1">
          <MapPinIcon size={11} className="text-[#FFC928]" /> {restaurant.location}
        </p>
        {restaurant.gemDescription && (
          <p className="text-white/80 text-[11px] font-body mt-2 line-clamp-2 leading-relaxed">
            {restaurant.gemDescription}
          </p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <RatingBadge rating={restaurant.rating} />
          <span className="text-white/70 text-[11px]">{restaurant.reviewCount} discoveries</span>
        </div>
      </div>
    </div>
  );
}

// ─── Social Post Card ─────────────────────────────────────────────────────────
export function SocialPostCard({
  post,
  onRestaurantClick,
}: {
  post: FoodPost;
  onRestaurantClick: (id: string) => void;
}) {
  const [liked, setLiked] = useState(post.isLiked);
  const [saved, setSaved] = useState(post.isSaved);
  const [likes, setLikes] = useState(post.likes);

  return (
    <div
      className="bg-white rounded-[20px] overflow-hidden"
      style={{ boxShadow: "0 2px 12px rgba(36,34,29,0.06)" }}
    >
      <div className="flex items-center gap-3 p-3.5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-display font-800 text-white text-sm flex-shrink-0"
          style={{ backgroundColor: post.user.avatarColor }}
        >
          {post.user.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-700 text-[#24221D] text-sm">{post.user.name}</p>
          <p className="text-[#8B8578] text-xs flex items-center gap-1">
            <MapPinIcon size={10} /> {post.location} · {post.timeAgo}
          </p>
        </div>
        <button
          onClick={() => {
            setSaved(!saved);
          }}
          className="w-8 h-8 rounded-full bg-[#FFF9ED] flex items-center justify-center"
        >
          <BookmarkIcon
            size={15}
            filled={saved}
            className={saved ? "text-[#FFC928]" : "text-[#8B8578]"}
          />
        </button>
      </div>

      <div className="relative h-64 bg-[#F5E9C8]">
        <img src={post.image} alt={post.food} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tag === "Hidden Gem" ? "bg-[#FFC928] text-[#24221D]" : "bg-white/90 text-[#24221D]"}`}
            >
              {tag === "Hidden Gem" ? "✦ " : ""}
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3.5">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onRestaurantClick(post.restaurantId)}
        >
          <div>
            <p className="font-display font-800 text-[#24221D] text-sm">{post.food}</p>
            <p className="text-[#FFC928] text-xs font-body font-600 underline decoration-dotted">
              {post.restaurant}
            </p>
          </div>
        </div>

        <p className="text-[#24221D] text-sm font-body mt-2 leading-relaxed">{post.caption}</p>

        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#F5E9C8]">
          <button
            className="flex items-center gap-1.5 text-sm font-body transition-colors"
            onClick={() => {
              setLiked(!liked);
              setLikes((l) => (liked ? l - 1 : l + 1));
            }}
          >
            <HeartIcon
              size={18}
              filled={liked}
              className={liked ? "text-red-500" : "text-[#8B8578]"}
            />
            <span className={liked ? "text-red-500 font-600" : "text-[#8B8578]"}>{likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm font-body text-[#8B8578]">
            <MessageIcon size={18} />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm font-body text-[#8B8578] ml-auto">
            <ShareIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({
  title,
  subtitle,
  onSeeAll,
}: {
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
}) {
  return (
    <div className="flex items-start justify-between px-4 mb-3">
      <div>
        <h2 className="font-display font-800 text-[#24221D] text-base">{title}</h2>
        {subtitle && <p className="text-[#8B8578] text-xs font-body mt-0.5">{subtitle}</p>}
      </div>
      {onSeeAll && (
        <button onClick={onSeeAll} className="text-[#FFC928] text-sm font-display font-700 mt-0.5">
          See all
        </button>
      )}
    </div>
  );
}

// ─── Menu Item ────────────────────────────────────────────────────────────────
export function MenuItemCard({ item }: { item: MenuItem }) {
  const [added, setAdded] = useState(false);
  return (
    <div
      className={`flex gap-3 p-3 rounded-[16px] ${!item.isAvailable ? "opacity-50" : ""} ${item.isPopular ? "bg-[#FFF9ED]" : "bg-white"}`}
    >
      <div className="relative w-20 h-20 rounded-[12px] overflow-hidden bg-[#F5E9C8] flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        {item.isPopular && (
          <div className="absolute bottom-0 left-0 right-0 bg-[#FFC928] text-[#24221D] text-[9px] font-display font-800 text-center py-0.5">
            POPULAR
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-1">
          <span
            className={`w-3.5 h-3.5 rounded-sm border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${item.isVeg ? "border-green-600" : "border-red-500"}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-500"}`}
            />
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-display font-700 text-[#24221D] text-sm leading-tight line-clamp-1">
              {item.name}
            </p>
          </div>
          {item.isSpicy && <FlameIcon size={12} className="text-orange-500 flex-shrink-0 mt-0.5" />}
        </div>
        <p className="text-[#8B8578] text-[11px] font-body mt-0.5 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-display font-bold text-[#24221D] text-sm">₹{item.price}</span>
          {item.isAvailable ? (
            <button
              onClick={() => setAdded(!added)}
              className={`px-3 py-1 rounded-full text-xs font-display font-700 transition-all ${added ? "bg-[#24221D] text-[#FFC928]" : "border-2 border-[#FFC928] text-[#24221D]"}`}
            >
              {added ? "✓ Added" : "+ Add"}
            </button>
          ) : (
            <span className="text-xs text-[#8B8578] font-body">Not available</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────
export function SearchBar({
  placeholder,
  onFocus,
  value,
  onChange,
}: {
  placeholder?: string;
  onFocus?: () => void;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="mx-4 relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#8B8578" strokeWidth="2" />
          <path d="M16.5 16.5L21 21" stroke="#8B8578" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder ?? "Search food, restaurants, or cravings…"}
        className="w-full bg-white rounded-full pl-11 pr-4 py-3.5 text-sm font-body text-[#24221D] placeholder-[#C4BDB3] focus:ring-2 focus:ring-[#FFC928] outline-none transition-all"
        style={{ boxShadow: "0 2px 12px rgba(36,34,29,0.06)" }}
      />
    </div>
  );
}
