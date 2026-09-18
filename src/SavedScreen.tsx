import { useState } from "react";
import { savedCollections, restaurants } from "./data";
import { RestaurantCard } from "./components";
import { BookmarkIcon } from "./icons";

interface Props {
  onRestaurantClick: (id: string) => void;
}

export default function SavedScreen({ onRestaurantClick }: Props) {
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  return (
    <div className="pb-28 screen-enter">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <h1 className="font-display font-900 text-[#24221D] text-2xl">Saved</h1>
        <p className="text-[#8B8578] text-sm font-body mt-1">Your food collections</p>
      </div>

      {/* Collections Grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {savedCollections.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveCollection(activeCollection === col.id ? null : col.id)}
              className={`p-4 rounded-[16px] text-left transition-all active:scale-[0.97] ${activeCollection === col.id ? "ring-2 ring-[#FFC928]" : ""}`}
              style={{
                backgroundColor: activeCollection === col.id ? "#24221D" : col.color,
                boxShadow: "0 2px 8px rgba(36,34,29,0.06)",
              }}
            >
              <span className="text-2xl block mb-2">{col.emoji}</span>
              <p
                className={`font-display font-700 text-sm ${activeCollection === col.id ? "text-[#FFC928]" : "text-[#24221D]"}`}
              >
                {col.name}
              </p>
              <p
                className={`text-xs font-body mt-0.5 ${activeCollection === col.id ? "text-white/60" : "text-[#8B8578]"}`}
              >
                {col.count} items
              </p>
            </button>
          ))}

          <button className="p-4 rounded-[16px] text-left border-2 border-dashed border-[#F5E9C8] flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">+</span>
            <p className="font-display font-700 text-[#8B8578] text-sm text-center">
              New Collection
            </p>
          </button>
        </div>
      </div>

      {/* Recently Saved */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-800 text-[#24221D] text-base">
            {activeCollection
              ? savedCollections.find((c) => c.id === activeCollection)?.name
              : "Recently Saved"}
          </h2>
        </div>

        {activeCollection === null ? (
          <div className="flex flex-col gap-3">
            {restaurants.slice(0, 3).map((r) => (
              <RestaurantCard key={r.id} restaurant={r} onClick={() => onRestaurantClick(r.id)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 justify-between">
            {restaurants.map((r) => (
              <button
                key={r.id}
                onClick={() => onRestaurantClick(r.id)}
                className="flex items-center gap-3 bg-white rounded-[16px] p-3 w-full text-left active:scale-[0.98] transition-transform"
                style={{ boxShadow: "0 2px 8px rgba(36,34,29,0.06)" }}
              >
                <div className="w-12 h-12 rounded-[10px] overflow-hidden bg-[#F5E9C8] flex-shrink-0">
                  <img src={r.coverImage} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-display font-700 text-[#24221D] text-sm">{r.name}</p>
                  <p className="text-[#8B8578] text-xs font-body">
                    {r.distance} · {r.priceRange}
                  </p>
                </div>
                <BookmarkIcon size={16} filled className="text-[#FFC928]" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
