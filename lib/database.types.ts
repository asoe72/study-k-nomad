import type { City } from "./data";

// ─── DB Row 타입 ─────────────────────────────────────────────

export interface CityRow {
  id: string;
  rank: number;
  name: string;
  name_en: string;
  region: string;
  score: number;
  monthly_cost: number;
  monthly_rent: number;
  internet_speed: number;
  weather: string;
  aqi: number;
  symbol: string;
  map_x: number;
  map_y: number;
  tags: string[];
  environment: string[];
  budget: string;
  season: string[];
  metrics: {
    internet: number;
    cafe: number;
    transport: number;
    nature: number;
    nomadFriendly: number;
  };
}

export interface ProfileRow {
  id: string;
  username: string;
}

export interface VoteRow {
  id: string;
  user_id: string;
  city_id: string;
  vote_type: "like" | "dislike";
  created_at: string;
}

export interface ReviewRow {
  id: string;
  user_id: string;
  city_id: string;
  content: string;
  rating: number;
  created_at: string;
}

export interface CityVoteCountRow {
  city_id: string;
  likes: number;
  dislikes: number;
}

// ─── DB → City 매퍼 ──────────────────────────────────────────

export function cityRowToCity(row: CityRow, likes = 0, dislikes = 0): City {
  return {
    id: row.id,
    rank: row.rank,
    name: row.name,
    nameEn: row.name_en,
    region: row.region as City["region"],
    score: row.score,
    monthlyCost: row.monthly_cost,
    monthlyRent: row.monthly_rent,
    metrics: row.metrics,
    tags: row.tags,
    environment: row.environment as City["environment"],
    budget: row.budget as City["budget"],
    season: row.season as City["season"],
    likes,
    dislikes,
    internetSpeed: row.internet_speed,
    weather: row.weather,
    aqi: row.aqi,
    symbol: row.symbol,
    mapX: row.map_x,
    mapY: row.map_y,
  };
}

// ─── Supabase Database 인터페이스 ─────────────────────────────

export interface Database {
  public: {
    Tables: {
      cities: { Row: CityRow; Insert: Omit<CityRow, never>; Update: Partial<CityRow> };
      profiles: { Row: ProfileRow; Insert: ProfileRow; Update: Partial<ProfileRow> };
      votes: { Row: VoteRow; Insert: Omit<VoteRow, "id" | "created_at">; Update: Partial<VoteRow> };
      reviews: { Row: ReviewRow; Insert: Omit<ReviewRow, "id" | "created_at">; Update: Partial<ReviewRow> };
    };
    Views: {
      city_vote_counts: { Row: CityVoteCountRow };
    };
  };
}
