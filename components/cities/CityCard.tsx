import { City } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CityAsciiArt from "./CityAsciiArt";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface CityCardProps {
  city: City;
  rank: number;
  liked: boolean;
  disliked: boolean;
  likes: number;
  dislikes: number;
  onLike: (cityId: string) => void;
  onDislike: (cityId: string) => void;
  onReview?: (cityId: string) => void;
}

const CITY_INFO_FIELDS: { label: string; getValue: (city: City) => string }[] = [
  { label: "예산", getValue: (city) => city.budget },
  { label: "지역", getValue: (city) => city.region },
  { label: "환경", getValue: (city) => city.environment.join(", ") },
  { label: "최고 계절", getValue: (city) => city.season.join(", ") },
];

export default function CityCard({ city, rank, liked, disliked, likes, dislikes, onLike, onDislike, onReview }: CityCardProps) {
  return (
    <Card className="city-card bg-[#0f0f0f] border-[#222] flex flex-col w-72 shrink-0 overflow-hidden cursor-pointer">
      {/* ASCII 아트 + 랭킹 */}
      <CityAsciiArt cityId={city.id} rank={rank} />

      {/* 도시명 */}
      <div className="px-4 py-3 border-b border-[#1a1a1a]">
        <div className="font-mono text-base font-bold text-white">{city.name}</div>
        <div className="font-mono text-xs text-gray-500">
          {city.nameEn} · {city.region}
        </div>
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {city.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="font-mono text-[10px] border-[#333] text-gray-500 px-1.5 py-0"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Key-Value 정보 */}
      <div className="px-4 py-3 border-b border-[#1a1a1a] space-y-1.5">
        {CITY_INFO_FIELDS.map(({ label, getValue }) => (
          <div key={label} className="flex font-mono text-xs">
            <span className="text-gray-500 w-20 shrink-0">{label}</span>
            <span className="text-gray-300">{getValue(city)}</span>
          </div>
        ))}
      </div>

      {/* 액션 버튼 */}
      <div className="px-4 py-3 flex gap-2">
        <button
          onClick={() => onLike(city.id)}
          className={`flex-1 font-mono text-xs border py-1.5 transition-all flex items-center justify-center gap-1 ${
            liked
              ? "border-[#00FF88] text-[#00FF88]"
              : "border-[#333] text-gray-400 hover:border-[#00FF88] hover:text-[#00FF88]"
          }`}
        >
          <ThumbsUp size={12} />
          {likes}
        </button>
        <button
          onClick={() => onDislike(city.id)}
          className={`flex-1 font-mono text-xs border py-1.5 transition-all flex items-center justify-center gap-1 ${
            disliked
              ? "border-red-500 text-red-400"
              : "border-[#333] text-gray-400 hover:border-red-500 hover:text-red-400"
          }`}
        >
          <ThumbsDown size={12} />
          {dislikes}
        </button>
        <button
          onClick={() => onReview?.(city.id)}
          className="flex-1 font-mono text-xs border border-[#333] text-gray-400 hover:border-[#00E5FF] hover:text-[#00E5FF] py-1.5 transition-all"
        >
          ✎ 리뷰
        </button>
      </div>
    </Card>
  );
}
