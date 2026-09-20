import type { Restaurant } from "../data";
import { supabase } from "../lib/supabase";

type RestaurantRow = {
  id: string;
  name: string;
  rating: number | string | null;
  review_count: number | null;
  cuisine: string[] | null;
  area: string;
  image: string;
  avg_price: number | null;
  is_hidden_gem: boolean | null;
  bio: string | null;
  phone: string | null;
  tags: string[] | null;
  location_url?: string | null;
  menu_available?: boolean | null;
};

const toRestaurant = (row: RestaurantRow): Restaurant => ({
  id: row.id,
  name: row.name,
  tagline: row.bio?.trim() || `A local ${row.cuisine?.[0]?.toLowerCase() || "food"} spot in ${row.area}`,
  cuisine: row.cuisine?.join(" · ") || "Local food",
  rating: Number(row.rating ?? 4.5),
  reviewCount: row.review_count ?? 0,
  priceRange: "₹₹",
  avgPrice: row.avg_price ?? 0,
  distance: "",
  location: row.area,
  area: row.area,
  isOpen: true,
  openUntil: "Check with restaurant",
  coverImage: row.image,
  tags: [...(row.tags ?? []), ...(row.menu_available ? ["Menu available"] : [])],
  isHiddenGem: row.is_hidden_gem ?? false,
  phone: row.phone ?? "",
  locationUrl: row.location_url ?? undefined,
  menuAvailable: row.menu_available ?? false,
  menu: [],
});

export async function fetchRestaurants(): Promise<Restaurant[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("restaurants").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data as RestaurantRow[]).map(toRestaurant);
}
