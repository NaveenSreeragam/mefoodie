import React, { useState } from "react";
import { AuthModal } from "./AuthModal";

interface ProfileScreenProps {
  user?: { phone?: string; email?: string; name?: string } | null;
  onLoginClick?: () => void;
  onLogout?: () => void;
}

export default function ProfileScreen({ user, onLoginClick, onLogout }: ProfileScreenProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleOpenAuth = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      setShowAuthModal(true);
    }
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
            Sign in with your phone number to bookmark restaurants, submit reviews, and post your foodie moments!
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
      {/* User Header Profile Card */}
      <div className="bg-white border border-[#F5E9C8] rounded-[32px] p-6 shadow-sm flex items-center gap-5 relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-[#FFC928] flex items-center justify-center font-display font-black text-2xl text-[#24221D] shadow-inner">
          {user.name ? user.name.charAt(0).toUpperCase() : "F"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-xl text-[#24221D] truncate">
              {user.name || "Foodie Explorer"}
            </h1>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FF5733]/10 text-[#FF5733]">
              Verified
            </span>
          </div>
          <p className="text-xs text-[#8B8578] font-body mt-0.5">
            {user.phone || user.email || "Member since 2026"}
          </p>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="px-3.5 py-2 text-xs font-display font-bold text-[#FF5733] bg-[#FF5733]/10 hover:bg-[#FF5733]/20 rounded-xl transition-colors"
          >
            Sign Out
          </button>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-[#F5E9C8] rounded-2xl p-4 text-center">
          <p className="font-display font-black text-xl text-[#24221D]">0</p>
          <p className="text-[11px] text-[#8B8578] font-bold uppercase tracking-wider mt-1">Reviews</p>
        </div>
        <div className="bg-white border border-[#F5E9C8] rounded-2xl p-4 text-center">
          <p className="font-display font-black text-xl text-[#24221D]">0</p>
          <p className="text-[11px] text-[#8B8578] font-bold uppercase tracking-wider mt-1">Saved Craves</p>
        </div>
        <div className="bg-white border border-[#F5E9C8] rounded-2xl p-4 text-center">
          <p className="font-display font-black text-xl text-[#24221D]">0</p>
          <p className="text-[11px] text-[#8B8578] font-bold uppercase tracking-wider mt-1">Badges</p>
        </div>
      </div>
    </div>
  );
}
