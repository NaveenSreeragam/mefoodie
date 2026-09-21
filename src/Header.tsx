import React, { useState } from "react";
import { SearchIcon, MapPinIcon, BellIcon, FilterIcon } from "./icons";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onExploreClick?: () => void;
  user?: { phone?: string; email?: string; name?: string } | null;
  onOpenAuth?: () => void;
}

export function Header({ onSearch, onExploreClick, user, onOpenAuth }: HeaderProps) {
  const [location, setLocation] = useState("Jubilee Hills, Hyderabad");
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchVal);
  };

  return (
    <header className="hidden md:flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-[#F5E9C8] px-8 py-3.5 sticky top-0 z-20 shadow-xs">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative w-96">
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search dishes, restaurants, cravings..."
          className="w-full bg-[#FFF9ED] border border-[#F5E9C8] text-[#24221D] text-sm font-body rounded-2xl pl-10 pr-4 py-2.5 focus:border-[#FFC928] focus:bg-white transition-all outline-none"
        />
        <SearchIcon
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B8578]"
        />
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Location Selector */}
        <div className="flex items-center gap-2 bg-[#FFF9ED] border border-[#F5E9C8] px-3.5 py-2 rounded-2xl cursor-pointer hover:border-[#FFC928] transition-colors">
          <MapPinIcon size={16} className="text-[#FFC928]" />
          <span className="text-xs font-display font-bold text-[#24221D]">{location}</span>
          <span className="text-[10px] text-[#8B8578]">▼</span>
        </div>

        {/* Filter Trigger */}
        <button
          onClick={onExploreClick}
          className="p-2.5 rounded-2xl bg-[#FFF9ED] border border-[#F5E9C8] text-[#24221D] hover:bg-[#F5E9C8]/40 transition-colors"
          title="Filter Restaurants"
        >
          <FilterIcon size={18} />
        </button>

        {/* Notification Bell */}
        <button
          className="relative p-2.5 rounded-2xl bg-[#FFF9ED] border border-[#F5E9C8] text-[#24221D] hover:bg-[#F5E9C8]/40 transition-colors"
          title="Notifications"
        >
          <BellIcon size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF5733]" />
        </button>

        {/* Sign In / User pill */}
        {user ? (
          <div className="flex items-center gap-2 bg-[#FFF9ED] border border-[#F5E9C8] px-3 py-1.5 rounded-2xl">
            <div className="w-6 h-6 rounded-full bg-[#FFC928] text-[#24221D] font-display font-black text-xs flex items-center justify-center">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="text-xs font-display font-bold text-[#24221D] max-w-[100px] truncate">
              {user.name || user.phone}
            </span>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="bg-[#FFC928] hover:bg-[#e6b420] text-[#24221D] font-display font-bold text-xs px-4 py-2.5 rounded-2xl shadow-xs transition-all active:scale-[0.98]"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
