import React from "react";
import {
  HomeIcon,
  CompassIcon,
  PlusIcon,
  BookmarkIcon,
  UserIcon,
  FlameIcon,
} from "./icons";

export type NavTab = "home" | "explore" | "feed" | "saved" | "profile";

interface SidebarProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onCreatePost: () => void;
}

export function Sidebar({ activeTab, onNavigate, onCreatePost }: SidebarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: HomeIcon, badge: null },
    { id: "explore", label: "Explore Spots", icon: CompassIcon, badge: null },
    { id: "feed", label: "Foodie Feed", icon: FlameIcon, badge: "Hot" },
    { id: "saved", label: "Saved Craves", icon: BookmarkIcon, badge: null },
    { id: "profile", label: "My Profile", icon: UserIcon, badge: null },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#F5E9C8] h-screen sticky top-0 px-4 py-6 z-30 shadow-sm flex-shrink-0">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-3 mb-8 cursor-pointer" onClick={() => onNavigate("home")}>
        <div className="w-10 h-10 rounded-2xl bg-[#FFC928] flex items-center justify-center font-display font-black text-2xl text-[#24221D] shadow-sm">
          m
        </div>
        <div>
          <h1 className="font-display font-black text-xl text-[#24221D] leading-none tracking-tight">
            me<span className="text-[#FFC928]">foodie</span>
          </h1>
          <p className="text-[11px] text-[#8B8578] font-body mt-0.5 font-medium">
            Satisfy Every Craving
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5">
        <div className="text-[11px] font-display font-bold text-[#8B8578] px-3 uppercase tracking-wider mb-2">
          Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as NavTab)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-display font-bold transition-all duration-200 ${
                isActive
                  ? "bg-[#24221D] text-[#FFC928] shadow-md shadow-[#24221D]/10"
                  : "text-[#24221D] hover:bg-[#FFF9ED] hover:text-[#24221D]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={isActive ? "text-[#FFC928]" : "text-[#8B8578]"} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FF5733] text-white`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Action Button */}
      <div className="pt-4 border-t border-[#F5E9C8] space-y-4">
        <button
          onClick={onCreatePost}
          className="w-full flex items-center justify-center gap-2 bg-[#FFC928] hover:bg-[#e6b420] text-[#24221D] font-display font-bold py-3 px-4 rounded-2xl shadow-sm transition-transform active:scale-[0.98]"
        >
          <PlusIcon size={18} />
          <span>Post Food Review</span>
        </button>

        {/* User Mini Card */}
        <div
          onClick={() => onNavigate("profile")}
          className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#FFF9ED] border border-[#F5E9C8] cursor-pointer hover:bg-[#F5E9C8]/40 transition-colors"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&auto=format"
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border border-[#FFC928]"
          />
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-xs text-[#24221D] truncate">Naveen S.</p>
            <p className="text-[10px] text-[#8B8578] truncate">Pro Foodie · Level 4</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
