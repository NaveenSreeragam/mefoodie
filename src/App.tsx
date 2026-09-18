import { useState } from "react";
import { HomeIcon, CompassIcon, PlusIcon, BookmarkIcon, UserIcon } from "./icons";
import HomeScreen from "./HomeScreen";
import ExploreScreen from "./ExploreScreen";
import CravingScreen from "./CravingScreen";
import FeedScreen from "./FeedScreen";
import ProfileScreen from "./ProfileScreen";
import RestaurantScreen from "./RestaurantScreen";
import CreatePostScreen from "./CreatePostScreen";
import SavedScreen from "./SavedScreen";

type Screen =
  | "home"
  | "explore"
  | "craving"
  | "feed"
  | "saved"
  | "profile"
  | "restaurant"
  | "create-post";
type NavTab = "home" | "explore" | "feed" | "saved" | "profile";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [prevScreen, setPrevScreen] = useState<Screen>("home");
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [restaurantId, setRestaurantId] = useState<string>("azad");

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#E8DEC8" }}>
      {/* Phone container — centered on desktop */}
      <div
        className="relative mx-auto bg-[#FFF9ED] min-h-screen overflow-hidden"
        style={{ maxWidth: "430px" }}
      >
        {/* Main Content */}
        <div className="h-screen overflow-y-auto">
          {screen === "home" && (
            <HomeScreen
              onRestaurantClick={openRestaurant}
              onExploreClick={() => navTo("explore")}
              onCravingClick={() => navigate("craving")}
              onHiddenGemsClick={() => navTo("explore")}
            />
          )}
          {screen === "explore" && <ExploreScreen onRestaurantClick={openRestaurant} />}
          {screen === "craving" && <CravingScreen onExploreClick={() => navTo("explore")} />}
          {screen === "feed" && (
            <FeedScreen
              onRestaurantClick={openRestaurant}
              onCreatePost={() => navigate("create-post")}
            />
          )}
          {screen === "saved" && <SavedScreen onRestaurantClick={openRestaurant} />}
          {screen === "profile" && <ProfileScreen />}
          {screen === "restaurant" && (
            <RestaurantScreen restaurantId={restaurantId} onBack={goBack} />
          )}
          {screen === "create-post" && (
            <CreatePostScreen onBack={goBack} onSuccess={() => navTo("feed")} />
          )}
        </div>

        {/* Floating Bottom Navigation */}
        {screen !== "restaurant" && screen !== "create-post" && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-6 pt-2 pointer-events-none">
            <nav
              className="flex items-center bg-white rounded-[28px] px-3 py-2 pointer-events-auto"
              style={{
                boxShadow: "0 -4px 24px rgba(36,34,29,0.12), 0 8px 32px rgba(36,34,29,0.1)",
              }}
            >
              {/* Home */}
              <NavButton
                icon={<HomeIcon size={22} />}
                label="Home"
                active={activeTab === "home" && screen === "home"}
                onClick={() => navTo("home")}
              />
              {/* Explore */}
              <NavButton
                icon={<CompassIcon size={22} />}
                label="Explore"
                active={activeTab === "explore" && screen === "explore"}
                onClick={() => navTo("explore")}
              />

              {/* Center Create Button */}
              <div className="flex-1 flex justify-center">
                <button
                  onClick={() => navigate("create-post")}
                  className="w-14 h-14 rounded-full bg-[#FFC928] flex items-center justify-center -mt-4 active:scale-90 transition-transform"
                  style={{ boxShadow: "0 4px 20px rgba(255,201,40,0.5)" }}
                >
                  <PlusIcon size={26} className="text-[#24221D]" strokeWidth={2.5} />
                </button>
              </div>

              {/* Saved */}
              <NavButton
                icon={<BookmarkIcon size={22} />}
                label="Saved"
                active={activeTab === "saved" && screen === "saved"}
                onClick={() => navTo("saved")}
              />
              {/* Profile */}
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
      className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-[16px] transition-all ${active ? "text-[#24221D]" : "text-[#C4BDB3]"}`}
    >
      <span className={`transition-all ${active ? "scale-110" : ""}`}>
        {active ? <span style={{ color: "#FFC928" }}>{icon}</span> : icon}
      </span>
      <span
        className={`text-[10px] font-display font-700 ${active ? "text-[#FFC928]" : "text-[#C4BDB3]"}`}
      >
        {label}
      </span>
    </button>
  );
}
