import { useState } from "react";
import { ChevronLeftIcon, CameraIcon, StarIcon } from "./icons";
import { restaurants } from "./data";

const postTags = [
  { id: "hidden-gem", label: "✦ Hidden Gem", color: "#FFC928", textColor: "#24221D" },
  { id: "cheap-eats", label: "💸 Cheap Eats", color: "#E8F5E9", textColor: "#27AE60" },
  { id: "late-night", label: "🌙 Late Night", color: "#E8EAF6", textColor: "#5C6BC0" },
  { id: "spicy", label: "🌶 Spicy", color: "#FFEBEE", textColor: "#E53935" },
  { id: "must-try", label: "⚡ Must Try", color: "#FFF3CD", textColor: "#F39C12" },
  { id: "student", label: "🎒 Student Friendly", color: "#E3F2FD", textColor: "#1976D2" },
  { id: "date-spot", label: "💛 Date Spot", color: "#FFF9ED", textColor: "#D4A017" },
  { id: "local-fav", label: "🏠 Local Favourite", color: "#F3E5F5", textColor: "#7B1FA2" },
];

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

export default function CreatePostScreen({ onBack, onSuccess }: Props) {
  const [restaurant, setRestaurant] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [posted, setPosted] = useState(false);

  const toggleTag = (id: string) =>
    setSelectedTags((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));

  const handlePost = () => {
    setPosted(true);
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  if (posted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF9ED] px-4">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        <h2 className="font-display font-900 text-[#24221D] text-2xl text-center">
          Discovery Posted!
        </h2>
        <p className="text-[#8B8578] text-sm font-body mt-2 text-center">
          Your food discovery is live for the TVM community
        </p>
      </div>
    );
  }

  return (
    <div className="pb-28 screen-enter">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: "0 2px 8px rgba(36,34,29,0.08)" }}
        >
          <ChevronLeftIcon size={20} className="text-[#24221D]" />
        </button>
        <div>
          <h1 className="font-display font-900 text-[#24221D] text-xl">New Discovery</h1>
          <p className="text-[#8B8578] text-xs font-body">Share what you found in TVM</p>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-4">
        {/* Photo Upload */}
        <div className="h-52 bg-[#F5E9C8] rounded-[20px] flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#F5E9C8] cursor-pointer active:bg-[#EDE3CE] transition-colors">
          <div className="w-14 h-14 rounded-full bg-[#FFC928] flex items-center justify-center">
            <CameraIcon size={24} className="text-[#24221D]" />
          </div>
          <p className="font-display font-700 text-[#24221D] text-sm">Add food photo</p>
          <p className="text-[#8B8578] text-xs font-body">Tap to upload or take a photo</p>
        </div>

        {/* Restaurant */}
        <div>
          <label className="block text-[#24221D] font-display font-700 text-sm mb-1.5">
            Restaurant *
          </label>
          <div className="relative">
            <input
              type="text"
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              placeholder="Where did you eat this?"
              className="w-full bg-white rounded-[14px] px-4 py-3 text-sm font-body text-[#24221D] placeholder-[#C4BDB3] focus:ring-2 focus:ring-[#FFC928] outline-none"
              style={{ boxShadow: "0 2px 8px rgba(36,34,29,0.06)" }}
              list="restaurant-list"
            />
            <datalist id="restaurant-list">
              {restaurants.map((r) => (
                <option key={r.id} value={r.name} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Food Item */}
        <div>
          <label className="block text-[#24221D] font-display font-700 text-sm mb-1.5">
            Food Item *
          </label>
          <input
            type="text"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            placeholder="What did you eat?"
            className="w-full bg-white rounded-[14px] px-4 py-3 text-sm font-body text-[#24221D] placeholder-[#C4BDB3] focus:ring-2 focus:ring-[#FFC928] outline-none"
            style={{ boxShadow: "0 2px 8px rgba(36,34,29,0.06)" }}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-[#24221D] font-display font-700 text-sm mb-1.5">
            Price (₹)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="How much did it cost?"
            className="w-full bg-white rounded-[14px] px-4 py-3 text-sm font-body text-[#24221D] placeholder-[#C4BDB3] focus:ring-2 focus:ring-[#FFC928] outline-none"
            style={{ boxShadow: "0 2px 8px rgba(36,34,29,0.06)" }}
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-[#24221D] font-display font-700 text-sm mb-2">
            Your Rating *
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform active:scale-90"
              >
                <StarIcon
                  size={36}
                  filled={star <= (hoverRating || rating)}
                  className={star <= (hoverRating || rating) ? "text-[#FFC928]" : "text-[#E5DDD0]"}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-[#8B8578] text-xs font-body mt-1">
              {
                ["", "Not great", "It was ok", "Good!", "Really good!", "Absolutely amazing! 🤩"][
                  rating
                ]
              }
            </p>
          )}
        </div>

        {/* Review */}
        <div>
          <label className="block text-[#24221D] font-display font-700 text-sm mb-1.5">
            Your Discovery Story
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell the TVM food community what makes this special…"
            rows={4}
            className="w-full bg-white rounded-[14px] px-4 py-3 text-sm font-body text-[#24221D] placeholder-[#C4BDB3] focus:ring-2 focus:ring-[#FFC928] outline-none resize-none"
            style={{ boxShadow: "0 2px 8px rgba(36,34,29,0.06)" }}
          />
          <p className="text-right text-[#C4BDB3] text-xs font-body mt-1">{review.length}/280</p>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-[#24221D] font-display font-700 text-sm mb-2">
            Tag this discovery
          </label>
          <div className="flex flex-wrap gap-2">
            {postTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className="px-3 py-1.5 rounded-full text-xs font-display font-700 transition-all active:scale-95"
                style={{
                  backgroundColor: selectedTags.includes(tag.id) ? tag.textColor : tag.color,
                  color: selectedTags.includes(tag.id) ? "white" : tag.textColor,
                  border: `1.5px solid ${tag.textColor}30`,
                  boxShadow: selectedTags.includes(tag.id)
                    ? `0 2px 12px ${tag.textColor}40`
                    : "none",
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* POST Button */}
        <button
          onClick={handlePost}
          disabled={!restaurant || !foodItem || !rating}
          className="w-full bg-[#FFC928] text-[#24221D] rounded-full py-4 font-display font-900 text-base disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition-all mt-2"
          style={{
            boxShadow:
              restaurant && foodItem && rating ? "0 6px 24px rgba(255,201,40,0.4)" : "none",
          }}
        >
          POST DISCOVERY 🚀
        </button>
      </div>
    </div>
  );
}
