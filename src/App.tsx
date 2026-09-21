import { useEffect, useState } from "react";
import FeedScreen from "./FeedScreen";
import SavedScreen from "./SavedScreen";
import { HomeIcon, CompassIcon, PlusIcon, BookmarkIcon, UserIcon } from "./icons";
import { Sidebar, NavTab } from "./Sidebar";
import { Header } from "./Header";
import HomeScreen from "./HomeScreen";
import ExploreScreen from "./ExploreScreen";
import ProfileScreen from "./ProfileScreen";
import RestaurantScreen from "./RestaurantScreen";
import CreatePostScreen from "./CreatePostScreen";
import { type Restaurant } from "./data";
import { fetchRestaurants } from "./services/api";
import { AuthModal } from "./AuthModal";
import { supabase } from "./lib/supabase";

type Screen =
  | "home"
  | "explore"
  | "feed"
  | "saved"
  | "profile"
  | "restaurant"
  | "create-post";

export type UserType = {
  phone?: string;
  email?: string;
  name?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
} | null;

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [prevScreen, setPrevScreen] = useState<Screen>("home");
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [restaurantId, setRestaurantId] = useState<string>("azad");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [user, setUser] = useState<UserType>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    fetchRestaurants()
      .then((databaseRestaurants) => {
        if (databaseRestaurants.length > 0) setRestaurants(databaseRestaurants);
      })
      .catch((error) => console.warn("Unable to load restaurants from Supabase:", error));

    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            phone: session.user.phone || undefined,
            email: session.user.email || undefined,
            name: session.user.user_metadata?.full_name || "Foodie Explorer",
            bio: session.user.user_metadata?.bio || "Passionate about finding hidden street food spots!",
            location: session.user.user_metadata?.location || "Hyderabad, IN",
            avatarUrl: session.user.user_metadata?.avatar_url || undefined,
          });
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            phone: session.user.phone || undefined,
            email: session.user.email || undefined,
            name: session.user.user_metadata?.full_name || "Foodie Explorer",
            bio: session.user.user_metadata?.bio || "Passionate about finding hidden street food spots!",
            location: session.user.user_metadata?.location || "Hyderabad, IN",
            avatarUrl: session.user.user_metadata?.avatar_url || undefined,
          });
        } else {
          setUser(null);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const navigate = (s: Screen) => {
    setPrevScreen(screen);
    setScreen(s);
  };

  const navTo = (tab: NavTab) => {
    setActiveTab(tab);
    setScreen(tab === "feed" ? "feed" : tab);
  };

  const openRestaurant = (id: string) => {
    setRestaurantId(id);
    navigate("restaurant");
  };

  const goBack = () => {
    setScreen(prevScreen === "restaurant" ? "home" : prevScreen);
    setPrevScreen("home");
  };

  const handleCreatePost = () => {
    if (!user) {
      setIsAuthOpen(true);
    } else {
      navigate("create-post");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8DEC8] flex flex-col md:flex-row font-body text-[#24221D]">
      {/* Desktop Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onNavigate={(tab) => navTo(tab)}
        onCreatePost={handleCreatePost}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#FFF9ED] relative">
        {/* Desktop Top Header Bar */}
        <Header
          onExploreClick={() => navTo("explore")}
          onSearch={(q) => navTo("explore")}
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* Screen Scroll Container */}
        <main className="flex-1 overflow-y-auto pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto w-full">
            {screen === "home" && (
              <HomeScreen
                restaurants={restaurants}
                onRestaurantClick={openRestaurant}
                onExploreClick={() => navTo("explore")}
                onHiddenGemsClick={() => navTo("explore")}
              />
            )}
            {screen === "explore" && <ExploreScreen restaurants={restaurants} onRestaurantClick={openRestaurant} />}
            {screen === "feed" && (
              <FeedScreen
                onRestaurantClick={openRestaurant}
                onCreatePost={handleCreatePost}
              />
            )}
            {screen === "saved" && (
              <SavedScreen onRestaurantClick={openRestaurant} />
            )}
            {screen === "profile" && (
              <ProfileScreen
                user={user}
                onLoginClick={() => setIsAuthOpen(true)}
                onUpdateUser={(updated) => setUser((prev) => (prev ? { ...prev, ...updated } : updated))}
                onLogout={() => {
                  if (supabase) supabase.auth.signOut();
                  setUser(null);
                }}
              />
            )}
            {screen === "restaurant" && (
              <RestaurantScreen restaurants={restaurants} restaurantId={restaurantId} onBack={goBack} />
            )}
            {screen === "create-post" && (
              <CreatePostScreen restaurants={restaurants} onBack={goBack} onSuccess={() => navTo("feed")} />
            )}
          </div>
        </main>

        {/* Auth Modal Component */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onAuthSuccess={(u) => {
            setUser(u);
            setIsAuthOpen(false);
          }}
        />

        {/* Mobile Floating Bottom Navigation */}
        {screen !== "restaurant" && screen !== "create-post" && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 px-4 pb-6 pt-2 pointer-events-none z-30">
            <nav
              className="max-w-md mx-auto flex items-center bg-white/95 backdrop-blur-md rounded-[28px] px-3 py-2 pointer-events-auto border border-[#F5E9C8]/50"
              style={{
                boxShadow: "0 -4px 24px rgba(36,34,29,0.12), 0 8px 32px rgba(36,34,29,0.1)",
              }}
            >
              <NavButton
                icon={<HomeIcon size={22} />}
                label="Home"
                active={activeTab === "home" && screen === "home"}
                onClick={() => navTo("home")}
              />
              <NavButton
                icon={<CompassIcon size={22} />}
                label="Explore"
                active={activeTab === "explore" && screen === "explore"}
                onClick={() => navTo("explore")}
              />

              {/* Center Floating Post Button */}
              <div className="flex-1 flex justify-center">
                <button
                  onClick={() => navigate("create-post")}
                  className="w-13 h-13 rounded-full bg-[#FFC928] flex items-center justify-center -mt-4 active:scale-90 transition-transform shadow-lg"
                  style={{ boxShadow: "0 4px 20px rgba(255,201,40,0.5)" }}
                >
                  <PlusIcon size={24} className="text-[#24221D]" strokeWidth={2.5} />
                </button>
              </div>

              <NavButton
                icon={<BookmarkIcon size={22} />}
                label="Saved"
                active={activeTab === "saved" && screen === "saved"}
                onClick={() => navTo("saved")}
              />
              <NavButton
                icon={<UserIcon size={22} />}
                label="Profile"
                active={activeTab === "profile" && screen === "profile"}
                onClick={() => navTo("profile")}
              />
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}



function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-[16px] transition-all ${
        active ? "text-[#24221D]" : "text-[#C4BDB3]"
      }`}
    >
      <span className={`transition-all ${active ? "scale-110" : ""}`}>
        {active ? <span style={{ color: "#FFC928" }}>{icon}</span> : icon}
      </span>
      <span
        className={`text-[10px] font-display font-bold ${
          active ? "text-[#FFC928]" : "text-[#C4BDB3]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
