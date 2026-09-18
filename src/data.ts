export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  isSpicy: boolean;
  isAvailable: boolean;
  rating: number;
  isPopular: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  priceRange: "₹" | "₹₹" | "₹₹₹";
  avgPrice: number;
  distance: string;
  location: string;
  area: string;
  isOpen: boolean;
  openUntil: string;
  coverImage: string;
  tags: string[];
  isHiddenGem: boolean;
  gemDescription?: string;
  phone: string;
  menu: MenuCategory[];
}

export interface FoodPost {
  id: string;
  user: { name: string; username: string; avatarColor: string; initials: string };
  food: string;
  restaurant: string;
  restaurantId: string;
  location: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
  tags: string[];
  timeAgo: string;
}

export interface FoodCategory {
  id: string;
  label: string;
  emoji: string;
  filter: string;
}

const IMG = {
  biryani:
    "https://images.unsplash.com/photo-1722698030083-75d1d50cabe4?w=400&h=400&fit=crop&auto=format",
  chicken:
    "https://images.unsplash.com/photo-1515931215890-366d3990cf8d?w=400&h=400&fit=crop&auto=format",
  shawarma:
    "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=400&fit=crop&auto=format",
  dessert:
    "https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=400&h=400&fit=crop&auto=format",
  snack:
    "https://images.unsplash.com/photo-1788621138170-6854f17c9e2e?w=400&h=400&fit=crop&auto=format",
  streetSnack:
    "https://images.unsplash.com/photo-1760263051331-0e4d3dafc9ff?w=400&h=400&fit=crop&auto=format",
  cake: "https://images.unsplash.com/photo-1543773495-2cd9248a5bda?w=400&h=400&fit=crop&auto=format",
  restaurant1:
    "https://images.unsplash.com/photo-1526069631228-723c945bea6b?w=800&h=400&fit=crop&auto=format",
  restaurant2:
    "https://images.unsplash.com/photo-1605088576635-db443afdcab5?w=800&h=400&fit=crop&auto=format",
  restaurant3:
    "https://images.unsplash.com/photo-1651440204216-548382747b40?w=800&h=400&fit=crop&auto=format",
};

export const foodCategories: FoodCategory[] = [
  { id: "chicken", label: "Chicken", emoji: "🍗", filter: "chicken" },
  { id: "biryani", label: "Biriyani", emoji: "🍛", filter: "biryani" },
  { id: "shawarma", label: "Shawarma", emoji: "🌯", filter: "shawarma" },
  { id: "desserts", label: "Desserts", emoji: "🍮", filter: "desserts" },
  { id: "spicy", label: "Spicy 🔥", emoji: "🌶️", filter: "spicy" },
  { id: "budget", label: "Under ₹150", emoji: "💸", filter: "budget" },
  { id: "tea", label: "Tea & Chai", emoji: "☕", filter: "tea" },
  { id: "bakery", label: "Bakery", emoji: "🥐", filter: "bakery" },
  { id: "seafood", label: "Seafood", emoji: "🦐", filter: "seafood" },
  { id: "veg", label: "Pure Veg", emoji: "🥗", filter: "veg" },
];

export const restaurants: Restaurant[] = [
  {
    id: "azad",
    name: "Azad Hotel",
    tagline: "Legendary biriyani since 1940 — worth every grain",
    cuisine: "Kerala · Biriyani · Mutton",
    rating: 4.7,
    reviewCount: 3841,
    priceRange: "₹₹",
    avgPrice: 180,
    distance: "1.2 km",
    location: "MG Road, Palayam",
    area: "Palayam",
    isOpen: true,
    openUntil: "10:30 PM",
    coverImage: IMG.restaurant1,
    tags: ["Famous", "Biriyani", "Mutton", "Local Legend"],
    isHiddenGem: false,
    phone: "+91 471 233 1234",
    menu: [
      {
        id: "biryani-cat",
        name: "Biriyani",
        items: [
          {
            id: "mb1",
            name: "Mutton Biriyani",
            description: "Slow-cooked Malabar mutton with fragrant Kerala spices and Kaima rice",
            price: 220,
            image: IMG.biryani,
            isVeg: false,
            isSpicy: true,
            isAvailable: true,
            rating: 4.8,
            isPopular: true,
          },
          {
            id: "cb1",
            name: "Chicken Biriyani",
            description: "Tender chicken pieces in aromatic Malabar-style biriyani",
            price: 180,
            image: IMG.biryani,
            isVeg: false,
            isSpicy: false,
            isAvailable: true,
            rating: 4.6,
            isPopular: true,
          },
          {
            id: "bb1",
            name: "Beef Biriyani",
            description: "Juicy beef in traditional Kerala masala with Jeerakasala rice",
            price: 200,
            image: IMG.biryani,
            isVeg: false,
            isSpicy: true,
            isAvailable: true,
            rating: 4.7,
            isPopular: false,
          },
        ],
      },
      {
        id: "sides-cat",
        name: "Sides & Extras",
        items: [
          {
            id: "s1",
            name: "Raita",
            description: "Cooling yogurt with cucumber and mint",
            price: 30,
            image: IMG.snack,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.2,
            isPopular: false,
          },
          {
            id: "s2",
            name: "Pappad",
            description: "Crispy fried pappad",
            price: 20,
            image: IMG.snack,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.0,
            isPopular: false,
          },
        ],
      },
    ],
  },
  {
    id: "buhari",
    name: "Buhari Hotel",
    tagline: "The iconic chicken fry that started it all",
    cuisine: "Kerala · Chicken · Non-veg",
    rating: 4.5,
    reviewCount: 2190,
    priceRange: "₹",
    avgPrice: 120,
    distance: "0.8 km",
    location: "East Fort, Thiruvananthapuram",
    area: "East Fort",
    isOpen: true,
    openUntil: "11:00 PM",
    coverImage: IMG.restaurant2,
    tags: ["Chicken Fry", "Budget", "Late Night", "Local Favourite"],
    isHiddenGem: false,
    phone: "+91 471 244 5678",
    menu: [
      {
        id: "chicken-cat",
        name: "Chicken Specials",
        items: [
          {
            id: "cf1",
            name: "Kerala Chicken Fry",
            description: "Crispy fried chicken with raw shallots and lime — the OG TVM recipe",
            price: 140,
            image: IMG.chicken,
            isVeg: false,
            isSpicy: true,
            isAvailable: true,
            rating: 4.9,
            isPopular: true,
          },
          {
            id: "cc1",
            name: "Chicken Curry",
            description: "Rich coconut-based Kerala chicken curry with roasted spices",
            price: 130,
            image: IMG.chicken,
            isVeg: false,
            isSpicy: true,
            isAvailable: true,
            rating: 4.6,
            isPopular: true,
          },
          {
            id: "cp1",
            name: "Chicken Porotta Combo",
            description: "Flaky layered porotta with chicken curry — the classic combo",
            price: 160,
            image: IMG.chicken,
            isVeg: false,
            isSpicy: false,
            isAvailable: true,
            rating: 4.7,
            isPopular: true,
          },
        ],
      },
      {
        id: "rice-cat",
        name: "Rice & Meals",
        items: [
          {
            id: "r1",
            name: "Kerala Meals",
            description: "Sadya-style rice with sambar, rasam, avial, pickle, and pappad",
            price: 110,
            image: IMG.biryani,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.4,
            isPopular: false,
          },
          {
            id: "r2",
            name: "Beef Fry Rice",
            description: "Kerala beef fry with ghee rice",
            price: 150,
            image: IMG.biryani,
            isVeg: false,
            isSpicy: true,
            isAvailable: true,
            rating: 4.5,
            isPopular: false,
          },
        ],
      },
    ],
  },
  {
    id: "sl-bakery",
    name: "SL Bakery",
    tagline: "Your neighbourhood bakery since 1985",
    cuisine: "Bakery · Snacks · Sweets",
    rating: 4.3,
    reviewCount: 987,
    priceRange: "₹",
    avgPrice: 60,
    distance: "0.4 km",
    location: "Kowdiar, Thiruvananthapuram",
    area: "Kowdiar",
    isOpen: true,
    openUntil: "9:00 PM",
    coverImage: IMG.restaurant3,
    tags: ["Bakery", "Tea & Snacks", "Budget", "Quick Bite"],
    isHiddenGem: false,
    phone: "+91 471 255 9012",
    menu: [
      {
        id: "bakery-cat",
        name: "Bakery Items",
        items: [
          {
            id: "bk1",
            name: "Pazham Pori",
            description: "Golden-fried banana fritters — the quintessential Kerala teatime snack",
            price: 12,
            image: IMG.snack,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.8,
            isPopular: true,
          },
          {
            id: "bk2",
            name: "Unniyappam",
            description: "Sweet rice and jaggery fritters — a Kerala classic",
            price: 15,
            image: IMG.dessert,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.6,
            isPopular: true,
          },
          {
            id: "bk3",
            name: "Egg Puffs",
            description: "Flaky pastry with spiced egg filling",
            price: 25,
            image: IMG.snack,
            isVeg: false,
            isSpicy: false,
            isAvailable: true,
            rating: 4.4,
            isPopular: true,
          },
          {
            id: "bk4",
            name: "Neyyappam",
            description: "Deep-fried rice and jaggery fritters in ghee",
            price: 18,
            image: IMG.dessert,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.5,
            isPopular: false,
          },
        ],
      },
      {
        id: "drinks-cat",
        name: "Beverages",
        items: [
          {
            id: "d1",
            name: "Sulaimani",
            description: "Black tea with lemon — the Malabar way",
            price: 20,
            image: IMG.snack,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.7,
            isPopular: true,
          },
          {
            id: "d2",
            name: "Chilled Milkshake",
            description: "Thick blended milkshake",
            price: 55,
            image: IMG.dessert,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.3,
            isPopular: false,
          },
        ],
      },
    ],
  },
  {
    id: "chai-chronicles",
    name: "Chai Chronicles",
    tagline: "A tiny chai corner that only locals know about",
    cuisine: "Tea · Snacks · Light bites",
    rating: 4.9,
    reviewCount: 212,
    priceRange: "₹",
    avgPrice: 40,
    distance: "2.1 km",
    location: "Near Padmanabhaswamy Temple Lane, Fort",
    area: "Fort",
    isOpen: true,
    openUntil: "8:00 PM",
    coverImage: IMG.restaurant2,
    tags: ["Hidden Gem", "Tea", "Budget", "Quiet", "Student Friendly"],
    isHiddenGem: true,
    gemDescription:
      "A tiny wooden tea stall tucked inside a temple lane. The masala chai here is brewed over slow fire since morning — locals swear it's the best in the city.",
    phone: "+91 94461 23456",
    menu: [
      {
        id: "chai-cat",
        name: "Chai & Drinks",
        items: [
          {
            id: "ch1",
            name: "Masala Chai",
            description: "Slow-brewed ginger masala chai — the house special",
            price: 15,
            image: IMG.streetSnack,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.9,
            isPopular: true,
          },
          {
            id: "ch2",
            name: "Black Tea",
            description: "Simple strong black tea",
            price: 10,
            image: IMG.streetSnack,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.5,
            isPopular: false,
          },
        ],
      },
      {
        id: "snacks-cat",
        name: "Snacks",
        items: [
          {
            id: "sn1",
            name: "Vada",
            description: "Crispy urad dal vada with chutney",
            price: 20,
            image: IMG.snack,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.7,
            isPopular: true,
          },
          {
            id: "sn2",
            name: "Medu Vada Sambar",
            description: "Soft vada soaked in sambar",
            price: 35,
            image: IMG.snack,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.6,
            isPopular: false,
          },
        ],
      },
    ],
  },
  {
    id: "shawarma-king",
    name: "Shawarma King",
    tagline: "TVM's most craved late-night wrap spot",
    cuisine: "Shawarma · Arabic · Rolls",
    rating: 4.4,
    reviewCount: 1560,
    priceRange: "₹",
    avgPrice: 90,
    distance: "1.5 km",
    location: "Statue Junction, Thiruvananthapuram",
    area: "Statue Junction",
    isOpen: true,
    openUntil: "2:00 AM",
    coverImage: IMG.restaurant1,
    tags: ["Shawarma", "Late Night", "Quick Bite", "Open Late"],
    isHiddenGem: false,
    phone: "+91 99477 56789",
    menu: [
      {
        id: "shawarma-cat",
        name: "Shawarma",
        items: [
          {
            id: "sw1",
            name: "Chicken Shawarma",
            description:
              "Marinated chicken strips with garlic sauce, pickles, and fresh veggies in pita",
            price: 80,
            image: IMG.shawarma,
            isVeg: false,
            isSpicy: false,
            isAvailable: true,
            rating: 4.6,
            isPopular: true,
          },
          {
            id: "sw2",
            name: "Spicy Shawarma",
            description: "Extra hot version with green chilli sauce and jalapeños",
            price: 90,
            image: IMG.shawarma,
            isVeg: false,
            isSpicy: true,
            isAvailable: true,
            rating: 4.5,
            isPopular: true,
          },
          {
            id: "sw3",
            name: "Shawarma Box",
            description: "Double portion shawarma with fries and garlic mayo",
            price: 160,
            image: IMG.shawarma,
            isVeg: false,
            isSpicy: false,
            isAvailable: true,
            rating: 4.7,
            isPopular: true,
          },
        ],
      },
      {
        id: "rolls-cat",
        name: "Rolls & Wraps",
        items: [
          {
            id: "rw1",
            name: "Beef Roll",
            description: "Spiced beef strips in a soft wrap with onions and chilli sauce",
            price: 100,
            image: IMG.shawarma,
            isVeg: false,
            isSpicy: true,
            isAvailable: true,
            rating: 4.4,
            isPopular: false,
          },
        ],
      },
    ],
  },
  {
    id: "arya-nivas",
    name: "Arya Nivas",
    tagline: "Pure veg traditional Kerala meals — a vegetarian institution",
    cuisine: "Kerala · Vegetarian · South Indian",
    rating: 4.4,
    reviewCount: 1780,
    priceRange: "₹",
    avgPrice: 100,
    distance: "0.6 km",
    location: "Kesavadasapuram, Thiruvananthapuram",
    area: "Kesavadasapuram",
    isOpen: true,
    openUntil: "9:30 PM",
    coverImage: IMG.restaurant3,
    tags: ["Pure Veg", "Meals", "Budget", "Traditional"],
    isHiddenGem: false,
    phone: "+91 471 272 3456",
    menu: [
      {
        id: "meals-cat",
        name: "Meals & Thali",
        items: [
          {
            id: "ml1",
            name: "Kerala Sadya",
            description: "Full banana leaf sadya with 22 dishes — available Sundays",
            price: 180,
            image: IMG.biryani,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.8,
            isPopular: true,
          },
          {
            id: "ml2",
            name: "Onam Sadya",
            description: "Seasonal special with extra dishes during festival time",
            price: 250,
            image: IMG.biryani,
            isVeg: true,
            isSpicy: false,
            isAvailable: false,
            rating: 5.0,
            isPopular: true,
          },
          {
            id: "ml3",
            name: "Daily Meals",
            description: "Rice with sambar, rasam, thoran, pickle, pappad, and payasam",
            price: 90,
            image: IMG.biryani,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.4,
            isPopular: true,
          },
        ],
      },
      {
        id: "breakfast-cat",
        name: "Breakfast",
        items: [
          {
            id: "bf1",
            name: "Puttu & Kadala",
            description: "Steamed rice puttu with spiced black chickpea curry",
            price: 60,
            image: IMG.snack,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.7,
            isPopular: true,
          },
          {
            id: "bf2",
            name: "Appam & Stew",
            description: "Lacy white appam with mild coconut vegetable stew",
            price: 70,
            image: IMG.snack,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.6,
            isPopular: true,
          },
          {
            id: "bf3",
            name: "Idli Sambar",
            description: "Soft idlis with sambar and coconut chutney",
            price: 50,
            image: IMG.snack,
            isVeg: true,
            isSpicy: false,
            isAvailable: true,
            rating: 4.3,
            isPopular: false,
          },
        ],
      },
    ],
  },
];

export const socialPosts: FoodPost[] = [
  {
    id: "p1",
    user: {
      name: "Arjun Krishnan",
      username: "arjunk_tvpm",
      avatarColor: "#E84C3D",
      initials: "AK",
    },
    food: "Mutton Biriyani",
    restaurant: "Azad Hotel",
    restaurantId: "azad",
    location: "MG Road, Palayam",
    image: IMG.biryani,
    caption:
      "This biriyani hits different at 1pm on a weekday. The mutton was fall-off-the-bone soft. Azad never disappoints 🫶",
    likes: 342,
    comments: 28,
    isLiked: false,
    isSaved: false,
    tags: ["Must Try", "Local Legend"],
    timeAgo: "2h ago",
  },
  {
    id: "p2",
    user: {
      name: "Nithya Suresh",
      username: "nithya_eats",
      avatarColor: "#8B5CF6",
      initials: "NS",
    },
    food: "Chicken Shawarma",
    restaurant: "Shawarma King",
    restaurantId: "shawarma-king",
    location: "Statue Junction",
    image: IMG.shawarma,
    caption:
      "Late night cravings sorted 🌯 The spicy version is absolutely 🔥 Pro tip: add extra garlic sauce.",
    likes: 187,
    comments: 14,
    isLiked: true,
    isSaved: false,
    tags: ["Late Night", "Spicy", "Student Friendly"],
    timeAgo: "5h ago",
  },
  {
    id: "p3",
    user: { name: "Renjith Mohan", username: "renjith_m", avatarColor: "#10B981", initials: "RM" },
    food: "Masala Chai + Vada",
    restaurant: "Chai Chronicles",
    restaurantId: "chai-chronicles",
    location: "Fort Area",
    image: IMG.streetSnack,
    caption:
      "Found this tiny chai spot behind the temple. The masala chai here is something else. Best ₹15 you'll spend in TVM.",
    likes: 891,
    comments: 67,
    isLiked: false,
    isSaved: true,
    tags: ["Hidden Gem", "Cheap Eats", "Student Friendly"],
    timeAgo: "1d ago",
  },
  {
    id: "p4",
    user: {
      name: "Sreelakshmi V",
      username: "sree_foodie",
      avatarColor: "#F59E0B",
      initials: "SV",
    },
    food: "Pazham Pori",
    restaurant: "SL Bakery",
    restaurantId: "sl-bakery",
    location: "Kowdiar",
    image: IMG.snack,
    caption:
      "No evening in Trivandrum is complete without pazham pori and a cup of chai. Life is good ☕",
    likes: 456,
    comments: 33,
    isLiked: true,
    isSaved: false,
    tags: ["Cheap Eats", "Evening Snack"],
    timeAgo: "2d ago",
  },
  {
    id: "p5",
    user: {
      name: "Akash Pillai",
      username: "akash_p_tvpm",
      avatarColor: "#3B82F6",
      initials: "AP",
    },
    food: "Kerala Chicken Fry",
    restaurant: "Buhari Hotel",
    restaurantId: "buhari",
    location: "East Fort",
    image: IMG.chicken,
    caption:
      "Just moved back to TVM and this was the first thing I ate. Some things never change. Buhari remains undefeated 🍗",
    likes: 673,
    comments: 52,
    isLiked: false,
    isSaved: false,
    tags: ["Must Try", "Local Favourite"],
    timeAgo: "3d ago",
  },
];

export const savedCollections = [
  { id: "c1", name: "Best Chicken", count: 12, emoji: "🍗", color: "#FFF3CD" },
  { id: "c2", name: "Biriyani Spots", count: 8, emoji: "🍛", color: "#FFE4E1" },
  { id: "c3", name: "Tea Spots", count: 6, emoji: "☕", color: "#E8F5E9" },
  { id: "c4", name: "Late Night", count: 9, emoji: "🌙", color: "#E8EAF6" },
  { id: "c5", name: "Under ₹150", count: 15, emoji: "💸", color: "#FFF9ED" },
  { id: "c6", name: "Hidden Gems", count: 4, emoji: "✦", color: "#FFF3CD" },
];

export const cravingTypes = [
  {
    id: "spicy",
    label: "Spicy & Hot",
    emoji: "🌶️",
    desc: "Fiery food that makes your eyes water",
    color: "#FF5733",
    bg: "#FFF0ED",
  },
  {
    id: "meaty",
    label: "Meaty & Rich",
    emoji: "🍖",
    desc: "Tender slow-cooked meat dishes",
    color: "#8B4513",
    bg: "#FDF0E6",
  },
  {
    id: "sweet",
    label: "Something Sweet",
    emoji: "🍮",
    desc: "Desserts, halwa, payasam & more",
    color: "#D4A017",
    bg: "#FFFAED",
  },
  {
    id: "light",
    label: "Light & Fresh",
    emoji: "🥗",
    desc: "Salads, soups, and healthy bites",
    color: "#27AE60",
    bg: "#F0FFF4",
  },
  {
    id: "comfort",
    label: "Comfort Food",
    emoji: "🍲",
    desc: "Warm, homey curries and rice dishes",
    color: "#E67E22",
    bg: "#FFF5ED",
  },
  {
    id: "cheap",
    label: "Cheap & Good",
    emoji: "💸",
    desc: "Great food under ₹150",
    color: "#2980B9",
    bg: "#EFF8FF",
  },
  {
    id: "late-night",
    label: "Late Night Fix",
    emoji: "🌙",
    desc: "Still open past midnight",
    color: "#8E44AD",
    bg: "#F5F0FF",
  },
  {
    id: "biryani",
    label: "Biryani Mood",
    emoji: "🍛",
    desc: "Fragrant rice and meat dishes",
    color: "#C0392B",
    bg: "#FFF0EE",
  },
];

export function getTimeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}

export function getTimePeriod(): "morning" | "lunch" | "evening" | "night" {
  const h = new Date().getHours();
  if (h >= 6 && h < 11) return "morning";
  if (h >= 11 && h < 16) return "lunch";
  if (h >= 16 && h < 21) return "evening";
  return "night";
}

export function getTimeRecommendations() {
  const period = getTimePeriod();
  const map = {
    morning: {
      label: "🌅 Good Morning Bites",
      desc: "Start your day the Kerala way",
      items: ["Puttu & Kadala", "Appam & Stew", "Idli Sambar", "Pazham Pori"],
    },
    lunch: {
      label: "☀️ Lunch Time",
      desc: "Hearty midday meals near you",
      items: ["Kerala Meals", "Chicken Biriyani", "Beef Fry Rice", "Mutton Biriyani"],
    },
    evening: {
      label: "🌇 Evening Cravings",
      desc: "Tea & snacks time in TVM",
      items: ["Masala Chai + Vada", "Pazham Pori", "Egg Puffs", "Unniyappam"],
    },
    night: {
      label: "🌙 Late Night Cravings",
      desc: "Open late, still delicious",
      items: ["Chicken Shawarma", "Porotta + Beef", "Spicy Shawarma", "Kerala Chicken Fry"],
    },
  };
  return map[period];
}
