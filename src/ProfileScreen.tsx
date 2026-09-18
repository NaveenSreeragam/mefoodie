import { useState } from "react";
import { savedCollections, socialPosts } from "./data";
import { BookmarkIcon, ChevronRightIcon } from "./icons";
import { RatingBadge } from "./components";

const IMG = {
  biryani:
    "https://images.unsplash.com/photo-1722698030083-75d1d50cabe4?w=300&h=300&fit=crop&auto=format",
  chicken:
    "https://images.unsplash.com/photo-1515931215890-366d3990cf8d?w=300&h=300&fit=crop&auto=format",
  shawarma:
    "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300&h=300&fit=crop&auto=format",
  snack:
    "https://images.unsplash.com/photo-1788621138170-6854f17c9e2e?w=300&h=300&fit=crop&auto=format",
  streetSnack:
    "https://images.unsplash.com/photo-1760263051331-0e4d3dafc9ff?w=300&h=300&fit=crop&auto=format",
};

const userPosts = socialPosts.slice(0, 2);

const reviews = [
  {
    restaurant: "Azad Hotel",
    food: "Mutton Biriyani",
    rating: 5,
    comment: "Absolutely legendary. The rice was perfectly cooked and the mutton was so tender.",
    date: "2 days ago",
  },
  {
    restaurant: "Chai Chronicles",
    food: "Masala Chai",
    rating: 5,
    comment:
      "Found this hidden gem and it did not disappoint. The slow-brewed chai is unlike anything else in TVM.",
    date: "1 week ago",
  },
  {
    restaurant: "Buhari Hotel",
    food: "Chicken Fry",
    rating: 4,
    comment:
      "Classic Buhari experience. Always consistent. The raw shallots with lime is the perfect finish.",
    date: "2 weeks ago",
  },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "reviews">("posts");

  return (
    <div className="pb-28 screen-enter">
      {/* Header */}
      <div className="bg-[#24221D] px-4 pt-12 pb-8">
        <div className="flex items-start justify-between mb-5">
          <div />
          <button className="text-[#FFC928] text-sm font-display font-700">Edit profile</button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#E84C3D] flex items-center justify-center font-display font-900 text-white text-2xl flex-shrink-0">
            AK
          </div>
          <div>
            <h2 className="font-display font-900 text-white text-xl">Arjun Krishnan</h2>
            <p className="text-[#FFC928] text-sm font-body">@arjunk_tvpm</p>
            <p className="text-white/60 text-xs font-body mt-1">
              🍗 Chicken fry evangelist · TVM local
            </p>
          </div>
        </div>

        <div className="flex gap-6 mt-5">
          {[
            { label: "Discoveries", value: "47" },
            { label: "Followers", value: "1.2K" },
            { label: "Following", value: "230" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-900 text-white text-xl">{stat.value}</p>
              <p className="text-white/50 text-xs font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#F5E9C8] mx-4 mt-4 rounded-full p-1 gap-1">
        {(["posts", "saved", "reviews"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-full text-sm font-display font-700 capitalize transition-all ${activeTab === tab ? "bg-[#24221D] text-[#FFC928]" : "text-[#8B8578]"}`}
          >
            {tab === "posts" ? "📸 Posts" : tab === "saved" ? "🔖 Saved" : "⭐ Reviews"}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "posts" && (
          <div className="grid grid-cols-2 gap-2 px-4">
            {[IMG.biryani, IMG.chicken, IMG.shawarma, IMG.snack, IMG.streetSnack, IMG.biryani].map(
              (img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-[16px] overflow-hidden bg-[#F5E9C8]"
                >
                  <img src={img} alt="Post" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-display font-700 line-clamp-1">
                      {
                        [
                          "Mutton Biriyani",
                          "Chicken Fry",
                          "Shawarma",
                          "Pazham Pori",
                          "Masala Chai",
                          "Kerala Meals",
                        ][i]
                      }
                    </p>
                    <p className="text-white/70 text-[10px] font-body">
                      ❤ {[342, 187, 89, 456, 891, 123][i]}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        )}

        {activeTab === "saved" && (
          <div className="px-4">
            <p className="text-[#8B8578] text-sm font-body mb-4">Your saved collections</p>
            <div className="grid grid-cols-2 gap-3">
              {savedCollections.map((col) => (
                <button
                  key={col.id}
                  className="p-4 rounded-[16px] text-left active:scale-[0.97] transition-transform"
                  style={{ backgroundColor: col.color, boxShadow: "0 2px 8px rgba(36,34,29,0.06)" }}
                >
                  <span className="text-2xl block mb-2">{col.emoji}</span>
                  <p className="font-display font-700 text-[#24221D] text-sm">{col.name}</p>
                  <p className="text-[#8B8578] text-xs font-body mt-0.5">{col.count} items</p>
                </button>
              ))}
            </div>

            <div className="mt-4">
              <button className="w-full border-2 border-dashed border-[#F5E9C8] rounded-[16px] py-4 flex items-center justify-center gap-2 text-[#8B8578] font-display font-700 text-sm">
                <span className="text-xl">+</span> New Collection
              </button>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="px-4 flex flex-col gap-3">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="bg-white rounded-[16px] p-4"
                style={{ boxShadow: "0 2px 8px rgba(36,34,29,0.06)" }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-display font-700 text-[#24221D] text-sm">{rev.food}</p>
                    <p className="text-[#FFC928] text-xs font-body">{rev.restaurant}</p>
                  </div>
                  <RatingBadge rating={rev.rating} />
                </div>
                <p className="text-[#24221D] text-sm font-body leading-relaxed">{rev.comment}</p>
                <p className="text-[#8B8578] text-xs font-body mt-2">{rev.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
