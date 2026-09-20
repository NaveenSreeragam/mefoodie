import { useState, useEffect } from "react"
import { savedCollections, socialPosts } from "./data"
import { BookmarkIcon, ChevronRightIcon } from "./icons"
import { RatingBadge } from "./components"

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
}

const userPosts = socialPosts.slice(0, 2)

const reviews = [
  {
    restaurant: "Azad Hotel",
    food: "Mutton Biriyani",
    rating: 5,
    comment:
      "Absolutely legendary. The rice was perfectly cooked and the mutton was so tender.",
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
]

interface UserProfile {
  fullName: string
  handle: string
  bio: string
  location: string
  avatarBg: string
  avatarUrl: string
  favoriteCuisines: string[]
}

const DEFAULT_PROFILE: UserProfile = {
  fullName: "Arjun Krishnan",
  handle: "arjunk_tvpm",
  bio: "🍗 Chicken fry evangelist · TVM local",
  location: "Trivandrum, Kerala",
  avatarBg: "#E84C3D",
  avatarUrl: "",
  favoriteCuisines: ["Biryani", "South Indian", "Street Food", "Seafood"],
}

const CUISINE_OPTIONS = [
  "Biryani",
  "South Indian",
  "Street Food",
  "Seafood",
  "North Indian",
  "Chai & Snacks",
  "Desserts",
  "Chinese",
  "Cafes & Bakery",
  "Arabian / Shawarma",
]

const AVATAR_COLORS = [
  "#E84C3D",
  "#FFC928",
  "#2E7D32",
  "#1976D2",
  "#8E24AA",
  "#D81B60",
  "#F57C00",
  "#455A64",
]

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "reviews">(
    "posts",
  )
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState<UserProfile>(DEFAULT_PROFILE)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Load saved profile from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mefoodie_user_profile")
      if (saved) {
        const parsed = JSON.parse(saved)
        setProfile(parsed)
        setEditForm(parsed)
      }
    } catch (e) {
      console.warn("Failed to load profile from localStorage:", e)
    }
  }, [])

  const getInitials = (name: string) => {
    if (!name.trim()) return "U"
    const parts = name.trim().split(" ")
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return parts[0].slice(0, 2).toUpperCase()
  }

  const handleOpenEdit = () => {
    setEditForm({ ...profile })
    setIsEditModalOpen(true)
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanedHandle = editForm.handle.startsWith("@")
      ? editForm.handle.slice(1)
      : editForm.handle

    const updated = {
      ...editForm,
      handle: cleanedHandle,
    }

    setProfile(updated)
    try {
      localStorage.setItem("mefoodie_user_profile", JSON.stringify(updated))
    } catch (e) {
      console.warn("Failed to save profile to localStorage:", e)
    }

    setIsEditModalOpen(false)
    setToastMessage("Profile updated successfully! ✨")
    setTimeout(() => setToastMessage(null), 3500)
  }

  const toggleCuisine = (cuisine: string) => {
    setEditForm((prev) => {
      const exists = prev.favoriteCuisines.includes(cuisine)
      if (exists) {
        return {
          ...prev,
          favoriteCuisines: prev.favoriteCuisines.filter((c) => c !== cuisine),
        }
      } else {
        return {
          ...prev,
          favoriteCuisines: [...prev.favoriteCuisines, cuisine],
        }
      }
    })
  }

  return (
    <div className="pb-28 screen-enter relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 left-4 md:left-auto md:w-96 bg-[#24221D] text-[#FFC928] px-4 py-3 rounded-2xl shadow-xl z-50 flex items-center justify-between border border-[#FFC928]/30 animate-bounce">
          <span className="font-display font-700 text-sm">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white text-xs font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-[#24221D] px-4 pt-10 pb-8 rounded-b-[32px] shadow-lg">
        <div className="flex items-start justify-between mb-5">
          <div className="text-white/40 text-xs font-display tracking-wider uppercase font-700">
            {profile.location || "Foodie Explorer"}
          </div>
          <button
            onClick={handleOpenEdit}
            className="bg-[#FFC928] hover:bg-[#ffe066] text-[#24221D] px-4 py-1.5 rounded-full text-xs font-display font-800 transition-all active:scale-95 shadow-md flex items-center gap-1.5"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit Profile
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#FFC928] shadow-md"
              />
            ) : (
              <div
                style={{ backgroundColor: profile.avatarBg }}
                className="w-20 h-20 rounded-full flex items-center justify-center font-display font-900 text-white text-2xl flex-shrink-0 border-2 border-[#FFC928]/40 shadow-md"
              >
                {getInitials(profile.fullName)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-900 text-white text-xl truncate">
              {profile.fullName}
            </h2>
            <p className="text-[#FFC928] text-sm font-body font-600">
              @{profile.handle}
            </p>
            <p className="text-white/70 text-xs font-body mt-1 line-clamp-2 leading-snug">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Favorite Cuisine Badges */}
        {profile.favoriteCuisines.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/10">
            {profile.favoriteCuisines.map((cuisine) => (
              <span
                key={cuisine}
                className="bg-white/10 text-white/90 px-2.5 py-0.5 rounded-full text-[11px] font-body font-500 backdrop-blur-xs"
              >
                😋 {cuisine}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-6 mt-5 pt-3 border-t border-white/10">
          {[
            { label: "Discoveries", value: "47" },
            { label: "Followers", value: "1.2K" },
            { label: "Following", value: "230" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-900 text-white text-xl">
                {stat.value}
              </p>
              <p className="text-white/50 text-xs font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#F5E9C8] mx-4 mt-4 rounded-full p-1 gap-1 shadow-inner">
        {(["posts", "saved", "reviews"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-full text-sm font-display font-700 capitalize transition-all ${
              activeTab === tab
                ? "bg-[#24221D] text-[#FFC928] shadow-sm"
                : "text-[#8B8578] hover:text-[#24221D]"
            }`}
          >
            {tab === "posts"
              ? "📸 Posts"
              : tab === "saved"
                ? "🔖 Saved"
                : "⭐ Reviews"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "posts" && (
          <div className="grid grid-cols-2 gap-2 px-4">
            {[
              IMG.biryani,
              IMG.chicken,
              IMG.shawarma,
              IMG.snack,
              IMG.streetSnack,
              IMG.biryani,
            ].map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-[16px] overflow-hidden bg-[#F5E9C8] group cursor-pointer"
              >
                <img
                  src={img}
                  alt="Post"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
            ))}
          </div>
        )}

        {activeTab === "saved" && (
          <div className="px-4">
            <p className="text-[#8B8578] text-sm font-body mb-4">
              Your saved collections
            </p>
            <div className="grid grid-cols-2 gap-3">
              {savedCollections.map((col) => (
                <button
                  key={col.id}
                  className="p-4 rounded-[16px] text-left active:scale-[0.97] transition-transform"
                  style={{
                    backgroundColor: col.color,
                    boxShadow: "0 2px 8px rgba(36,34,29,0.06)",
                  }}
                >
                  <span className="text-2xl block mb-2">{col.emoji}</span>
                  <p className="font-display font-700 text-[#24221D] text-sm">
                    {col.name}
                  </p>
                  <p className="text-[#8B8578] text-xs font-body mt-0.5">
                    {col.count} items
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-4">
              <button className="w-full border-2 border-dashed border-[#F5E9C8] rounded-[16px] py-4 flex items-center justify-center gap-2 text-[#8B8578] font-display font-700 text-sm hover:bg-[#F5E9C8]/20 transition-colors">
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
                    <p className="font-display font-700 text-[#24221D] text-sm">
                      {rev.food}
                    </p>
                    <p className="text-[#FFC928] text-xs font-body font-600">
                      {rev.restaurant}
                    </p>
                  </div>
                  <RatingBadge rating={rev.rating} />
                </div>
                <p className="text-[#24221D] text-sm font-body leading-relaxed">
                  {rev.comment}
                </p>
                <p className="text-[#8B8578] text-xs font-body mt-2">
                  {rev.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT PROFILE MODAL / DRAWER */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="bg-white w-full max-w-lg rounded-[28px] overflow-hidden shadow-2xl my-8 border border-[#F5E9C8]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#24221D] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">✏️</span>
                <h3 className="font-display font-800 text-lg text-white">
                  Edit Profile
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSaveProfile}
              className="p-6 space-y-5 max-h-[80vh] overflow-y-auto"
            >
              {/* Live Preview Header */}
              <div className="bg-[#FFF9ED] p-4 rounded-2xl border border-[#F5E9C8] flex items-center gap-4">
                {editForm.avatarUrl ? (
                  <img
                    src={editForm.avatarUrl}
                    alt="Preview"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#FFC928]"
                  />
                ) : (
                  <div
                    style={{ backgroundColor: editForm.avatarBg }}
                    className="w-14 h-14 rounded-full flex items-center justify-center font-display font-800 text-white text-lg flex-shrink-0 border-2 border-[#FFC928]"
                  >
                    {getInitials(editForm.fullName)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[#8B8578] font-body uppercase font-600">
                    Live Preview
                  </p>
                  <p className="font-display font-800 text-[#24221D] text-base truncate">
                    {editForm.fullName || "Your Name"}
                  </p>
                  <p className="text-[#FFC928] text-xs font-body font-700">
                    @{editForm.handle || "username"}
                  </p>
                </div>
              </div>

              {/* Avatar Options */}
              <div>
                <label className="block text-xs font-display font-800 uppercase tracking-wider text-[#24221D] mb-2">
                  Avatar Background Color
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {AVATAR_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setEditForm({
                          ...editForm,
                          avatarBg: color,
                          avatarUrl: "",
                        })
                      }
                      style={{ backgroundColor: color }}
                      className={`w-8 h-8 rounded-full transition-transform ${
                        editForm.avatarBg === color && !editForm.avatarUrl
                          ? "scale-125 ring-2 ring-offset-2 ring-[#24221D]"
                          : "hover:scale-110 opacity-80 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Optional Custom Image URL */}
              <div>
                <label className="block text-xs font-display font-800 uppercase tracking-wider text-[#24221D] mb-1">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={editForm.avatarUrl}
                  onChange={(e) =>
                    setEditForm({ ...editForm, avatarUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FFF9ED] text-[#24221D] text-sm focus:outline-none focus:border-[#FFC928] focus:ring-2 focus:ring-[#FFC928]/30"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-display font-800 uppercase tracking-wider text-[#24221D] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editForm.fullName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, fullName: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FFF9ED] text-[#24221D] text-sm font-display font-600 focus:outline-none focus:border-[#FFC928] focus:ring-2 focus:ring-[#FFC928]/30"
                  placeholder="Arjun Krishnan"
                />
              </div>

              {/* Handle */}
              <div>
                <label className="block text-xs font-display font-800 uppercase tracking-wider text-[#24221D] mb-1">
                  Username (@handle) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-[#8B8578] font-bold text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    required
                    value={editForm.handle}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        handle: e.target.value.replace(/^@/, ""),
                      })
                    }
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FFF9ED] text-[#24221D] text-sm font-body focus:outline-none focus:border-[#FFC928] focus:ring-2 focus:ring-[#FFC928]/30"
                    placeholder="arjunk_tvpm"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-display font-800 uppercase tracking-wider text-[#24221D]">
                    Foodie Pitch / Bio
                  </label>
                  <span className="text-[10px] text-[#8B8578]">
                    {editForm.bio.length}/120
                  </span>
                </div>
                <textarea
                  maxLength={120}
                  rows={2}
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FFF9ED] text-[#24221D] text-sm font-body focus:outline-none focus:border-[#FFC928] focus:ring-2 focus:ring-[#FFC928]/30 resize-none"
                  placeholder="🍗 Chicken fry evangelist · TVM local"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-display font-800 uppercase tracking-wider text-[#24221D] mb-1">
                  Location / City
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FFF9ED] text-[#24221D] text-sm font-body focus:outline-none focus:border-[#FFC928] focus:ring-2 focus:ring-[#FFC928]/30"
                  placeholder="Trivandrum, Kerala"
                />
              </div>

              {/* Favorite Cuisines */}
              <div>
                <label className="block text-xs font-display font-800 uppercase tracking-wider text-[#24221D] mb-2">
                  Favorite Cuisines & Food Badges
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CUISINE_OPTIONS.map((cuisine) => {
                    const isSelected =
                      editForm.favoriteCuisines.includes(cuisine)
                    return (
                      <button
                        key={cuisine}
                        type="button"
                        onClick={() => toggleCuisine(cuisine)}
                        className={`px-3 py-1.5 rounded-full text-xs font-display font-700 transition-all ${
                          isSelected
                            ? "bg-[#24221D] text-[#FFC928] shadow-sm"
                            : "bg-[#F5E9C8] text-[#8B8578] hover:bg-[#e6d8b3]"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {cuisine}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#F5E9C8]">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-[#E8DEC8] text-[#8B8578] hover:text-[#24221D] font-display font-700 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#FFC928] hover:bg-[#ffe066] text-[#24221D] font-display font-800 text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
