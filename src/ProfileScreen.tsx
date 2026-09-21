import React, { useState } from "react";
import { AuthModal } from "./AuthModal";
import { supabase } from "./lib/supabase";

export interface UserProfile {
  phone?: string;
  email?: string;
  name?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
}

interface ProfileScreenProps {
  user?: UserProfile | null;
  onLoginClick?: () => void;
  onLogout?: () => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

export default function ProfileScreen({
  user,
  onLoginClick,
  onLogout,
  onUpdateUser,
}: ProfileScreenProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [name, setName] = useState(user?.name || "Foodie Explorer");
  const [bio, setBio] = useState(user?.bio || "Passionate about finding hidden street food spots!");
  const [location, setLocation] = useState(user?.location || "Hyderabad, IN");
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatarUrl ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format"
  );

  const handleOpenAuth = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      setShowAuthModal(true);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaveSuccess(false);

    const updatedUser: UserProfile = {
      ...user,
      name,
      bio,
      location,
      avatarUrl,
    };

    if (supabase) {
      try {
        await supabase.auth.updateUser({
          data: {
            full_name: name,
            bio: bio,
            location: location,
            avatar_url: avatarUrl,
          },
        });
      } catch (err) {
        console.warn("Could not save metadata to Supabase Auth:", err);
      }
    }

    if (onUpdateUser) {
      onUpdateUser(updatedUser);
    }

    setLoading(false);
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!user) {
    return (
      <div className="px-4 py-12 max-w-lg mx-auto">
        <div className="bg-white border border-[#F5E9C8] rounded-[32px] p-8 text-center shadow-sm">
          <div className="w-20 h-20 bg-[#FFF9ED] border-2 border-[#F5E9C8] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            🍲
          </div>
          <h2 className="font-display font-black text-2xl text-[#24221D]">
            Join the MeFoodie Community
          </h2>
          <p className="text-[#8B8578] text-sm mt-2 font-body max-w-xs mx-auto">
            Sign in with your phone number to edit your foodie profile, bookmark restaurants, submit reviews, and post!
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleOpenAuth}
              className="w-full py-3.5 px-6 bg-[#FFC928] hover:bg-[#e6b420] text-[#24221D] font-display font-bold text-sm rounded-2xl shadow-sm transition-all active:scale-[0.98]"
            >
              Sign In or Register
            </button>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 max-w-2xl mx-auto space-y-6">
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-[#28A745]/10 border border-[#28A745]/20 text-[#28A745] font-display font-bold text-sm text-center animate-fade-in">
          ✓ Profile updated successfully!
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="bg-white border border-[#F5E9C8] rounded-[32px] p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative group">
            <img
              src={avatarUrl}
              alt={name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#FFC928] shadow-sm"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center text-white text-xs font-bold">
                Photo
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-black text-2xl text-[#24221D] truncate">
                {user.name || name}
              </h1>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#FF5733]/10 text-[#FF5733]">
                Verified Foodie
              </span>
            </div>

            {/* Location Pill */}
            <div className="flex items-center gap-1.5 text-xs text-[#8B8578] font-body mt-1">
              <span>📍</span>
              <span className="font-bold text-[#24221D]">{user.location || location}</span>
              <span>•</span>
              <span>{user.phone || user.email || "Member"}</span>
            </div>

            {/* Bio displaying */}
            <p className="text-xs text-[#555] font-body mt-2.5 bg-[#FFF9ED] p-3 rounded-2xl border border-[#F5E9C8]/60 italic">
              "{user.bio || bio}"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-display font-bold text-[#24221D] bg-[#FFC928] hover:bg-[#e6b420] rounded-xl shadow-xs transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              <span>✏️</span>
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-display font-bold text-[#FF5733] bg-[#FF5733]/10 hover:bg-[#FF5733]/20 rounded-xl transition-colors text-center"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Edit Form Drawer / Panel */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-[#F5E9C8] space-y-4 animate-fade-in">
            <h3 className="font-display font-black text-base text-[#24221D]">Edit Profile Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-display font-bold text-[#24221D] mb-1 uppercase tracking-wider">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FFF9ED] border border-[#F5E9C8] text-[#24221D] text-sm rounded-2xl px-4 py-2.5 focus:border-[#FFC928] outline-none font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-display font-bold text-[#24221D] mb-1 uppercase tracking-wider">
                  Location (City / Area)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Jubilee Hills, Hyderabad"
                  className="w-full bg-[#FFF9ED] border border-[#F5E9C8] text-[#24221D] text-sm rounded-2xl px-4 py-2.5 focus:border-[#FFC928] outline-none font-body"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-display font-bold text-[#24221D] mb-1 uppercase tracking-wider">
                Foodie Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share your favorite cuisines, food philosophy, or favorite local spots..."
                className="w-full bg-[#FFF9ED] border border-[#F5E9C8] text-[#24221D] text-sm rounded-2xl px-4 py-2.5 focus:border-[#FFC928] outline-none font-body resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold text-[#24221D] mb-1 uppercase tracking-wider">
                Avatar Image URL
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#FFF9ED] border border-[#F5E9C8] text-[#24221D] text-sm rounded-2xl px-4 py-2.5 focus:border-[#FFC928] outline-none font-body"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 text-xs font-display font-bold text-[#8B8578] hover:text-[#24221D]"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#FFC928] hover:bg-[#e6b420] text-[#24221D] font-display font-bold text-xs rounded-2xl shadow-sm transition-all active:scale-[0.98]"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-[#F5E9C8] rounded-2xl p-4 text-center">
          <p className="font-display font-black text-xl text-[#24221D]">12</p>
          <p className="text-[11px] text-[#8B8578] font-bold uppercase tracking-wider mt-1">Reviews</p>
        </div>
        <div className="bg-white border border-[#F5E9C8] rounded-2xl p-4 text-center">
          <p className="font-display font-black text-xl text-[#24221D]">8</p>
          <p className="text-[11px] text-[#8B8578] font-bold uppercase tracking-wider mt-1">Saved Craves</p>
        </div>
        <div className="bg-white border border-[#F5E9C8] rounded-2xl p-4 text-center">
          <p className="font-display font-black text-xl text-[#24221D]">Master</p>
          <p className="text-[11px] text-[#8B8578] font-bold uppercase tracking-wider mt-1">Foodie Rank</p>
        </div>
      </div>
    </div>
  );
}
