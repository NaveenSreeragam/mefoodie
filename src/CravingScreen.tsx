import { useState } from "react";
import { cravingTypes } from "./data";
import { SparkleIcon } from "./icons";

interface Props {
  onExploreClick: () => void;
}

const surpriseResults = [
  {
    emoji: "🍛",
    name: "Mutton Biriyani",
    place: "Azad Hotel",
    price: "₹220",
    reason: "Because it's lunchtime and this is always the right answer",
  },
  {
    emoji: "🍗",
    name: "Kerala Chicken Fry",
    place: "Buhari Hotel",
    price: "₹140",
    reason: "Crispy, spicy, perfect — need we say more?",
  },
  {
    emoji: "🌯",
    name: "Spicy Shawarma",
    place: "Shawarma King",
    price: "₹90",
    reason: "Late night energy with maximum flavour",
  },
  {
    emoji: "☕",
    name: "Masala Chai + Vada",
    place: "Chai Chronicles",
    price: "₹35",
    reason: "The hidden gem that always surprises first-timers",
  },
  {
    emoji: "🥐",
    name: "Pazham Pori & Chai",
    place: "SL Bakery",
    price: "₹27",
    reason: "The most Kerala thing you can do right now",
  },
];

export default function CravingScreen({ onExploreClick }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [surprise, setSurprise] = useState<(typeof surpriseResults)[0] | null>(null);
  const [shaking, setShaking] = useState(false);

  const handleSurprise = () => {
    setShaking(true);
    setTimeout(() => {
      setSurprise(surpriseResults[Math.floor(Math.random() * surpriseResults.length)]);
      setShaking(false);
    }, 600);
  };

  return (
    <div className="pb-28 screen-enter">
      {/* Header */}
      <div className="px-4 pt-12 pb-5">
        <h1 className="font-display font-900 text-[#24221D] text-2xl leading-tight">
          What's your <span className="text-[#FFC928]">craving</span>?
        </h1>
        <p className="text-[#8B8578] text-sm font-body mt-1.5">
          Pick a mood and MeFoodie will find your perfect match
        </p>
      </div>

      {/* Craving Type Cards */}
      <div className="grid grid-cols-2 gap-3 px-4 mb-6">
        {cravingTypes.map((craving) => (
          <button
            key={craving.id}
            onClick={() => setSelected(selected === craving.id ? null : craving.id)}
            className={`p-4 rounded-[20px] text-left transition-all active:scale-[0.96] ${selected === craving.id ? "ring-2 ring-[#FFC928] scale-[1.02]" : ""}`}
            style={{
              backgroundColor: selected === craving.id ? craving.color : craving.bg,
              boxShadow:
                selected === craving.id
                  ? `0 6px 24px ${craving.color}40`
                  : "0 2px 8px rgba(36,34,29,0.06)",
            }}
          >
            <span className="text-3xl block mb-2">{craving.emoji}</span>
            <p
              className={`font-display font-800 text-sm leading-tight ${selected === craving.id ? "text-white" : "text-[#24221D]"}`}
            >
              {craving.label}
            </p>
            <p
              className={`text-xs font-body mt-1 leading-relaxed ${selected === craving.id ? "text-white/80" : "text-[#8B8578]"}`}
            >
              {craving.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Find Food CTA */}
      {selected && (
        <div className="px-4 mb-6 fade-in">
          <button
            onClick={onExploreClick}
            className="w-full bg-[#FFC928] text-[#24221D] rounded-full py-4 font-display font-900 text-base active:scale-[0.97] transition-transform"
            style={{ boxShadow: "0 6px 24px rgba(255,201,40,0.4)" }}
          >
            Find {cravingTypes.find((c) => c.id === selected)?.label} food →
          </button>
        </div>
      )}

      {/* Surprise Me Section */}
      <div className="px-4 mb-6">
        <div
          className="bg-[#24221D] rounded-[24px] p-5"
          style={{ boxShadow: "0 8px 32px rgba(36,34,29,0.2)" }}
        >
          <div className="text-center mb-4">
            <p className="font-display font-900 text-white text-lg">Can't decide?</p>
            <p className="text-white/60 text-sm font-body mt-1">Trust MeFoodie to pick for you</p>
          </div>

          <button
            onClick={handleSurprise}
            className={`w-full bg-[#FFC928] text-[#24221D] rounded-full py-4 font-display font-900 text-lg flex items-center justify-center gap-2 active:scale-[0.97] transition-transform ${shaking ? "animate-bounce" : ""}`}
            style={{ boxShadow: "0 6px 24px rgba(255,201,40,0.4)" }}
          >
            <SparkleIcon size={20} />
            SURPRISE ME
            <SparkleIcon size={20} />
          </button>

          {surprise && (
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-[16px] p-4 fade-in">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{surprise.emoji}</span>
                <div className="flex-1">
                  <p className="font-display font-800 text-white text-base">{surprise.name}</p>
                  <p className="text-[#FFC928] text-sm font-body">{surprise.place}</p>
                  <p className="text-white/60 text-xs font-body mt-1">{surprise.price}</p>
                </div>
              </div>
              <p className="text-white/70 text-xs font-body mt-3 italic leading-relaxed">
                "{surprise.reason}"
              </p>
              <button
                onClick={onExploreClick}
                className="mt-3 w-full bg-[#FFC928] text-[#24221D] rounded-full py-2.5 font-display font-700 text-sm"
              >
                Take me there →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Popular Craving Combos */}
      <div className="px-4">
        <h3 className="font-display font-800 text-[#24221D] text-base mb-3">
          Popular craving combos 🔥
        </h3>
        <div className="flex flex-col gap-2">
          {[
            { combo: "Spicy + Late Night", result: "Shawarma King after 11 PM", emoji: "🌯🌙" },
            { combo: "Budget + Filling", result: "Arya Nivas daily meals", emoji: "🍽💸" },
            { combo: "Sweet + Quick", result: "SL Bakery pazham pori", emoji: "🥐⚡" },
            { combo: "Hidden + Unique", result: "Chai Chronicles masala chai", emoji: "☕✦" },
          ].map(({ combo, result, emoji }) => (
            <button
              key={combo}
              onClick={onExploreClick}
              className="flex items-center gap-3 bg-white rounded-[14px] px-4 py-3 text-left active:scale-[0.98] transition-transform"
              style={{ boxShadow: "0 2px 8px rgba(36,34,29,0.06)" }}
            >
              <span className="text-xl">{emoji}</span>
              <div className="flex-1">
                <p className="font-display font-700 text-[#24221D] text-sm">{combo}</p>
                <p className="text-[#8B8578] text-xs font-body">{result}</p>
              </div>
              <span className="text-[#FFC928] text-lg">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
