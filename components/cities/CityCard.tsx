import { City, scoreToBlocks, formatKRW, formatKRWShort } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CityAsciiArt from "./CityAsciiArt";
import MetricBar from "./MetricBar";

interface CityCardProps {
  city: City;
  onReview?: (cityId: string) => void;
}

const METRIC_ICONS: Record<keyof City["metrics"], string> = {
  internet: "📡",
  cafe: "☕",
  transport: "🚇",
  nature: "🌿",
  nomadFriendly: "👥",
};

const METRIC_LABELS: Record<keyof City["metrics"], string> = {
  internet: "인터넷",
  cafe: "카페",
  transport: "교통",
  nature: "자연",
  nomadFriendly: "친화도",
};

const METRIC_DISPLAY: (city: City) => Record<keyof City["metrics"], string> = (city) => ({
  internet: `${city.internetSpeed}Mbps`,
  cafe: city.metrics.cafe.toFixed(1),
  transport: city.metrics.transport.toFixed(1),
  nature: city.metrics.nature.toFixed(1),
  nomadFriendly: city.metrics.nomadFriendly.toFixed(1),
});

export default function CityCard({ city, onReview }: CityCardProps) {
  const scoreBlocks = scoreToBlocks(city.score);
  const displayValues = METRIC_DISPLAY(city);
  const aqiColor = city.aqi < 30 ? "#00FF88" : city.aqi < 60 ? "#00E5FF" : "#ffbd2e";

  return (
    <Card className="city-card bg-[#0f0f0f] border-[#222] flex flex-col w-72 shrink-0 overflow-hidden cursor-pointer">
      {/* ASCII 아트 + 랭킹 */}
      <CityAsciiArt cityId={city.id} rank={city.rank} />

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

      {/* 지표 바 */}
      <div className="px-4 py-3 border-b border-[#1a1a1a] space-y-1.5">
        {(Object.keys(city.metrics) as (keyof City["metrics"])[]).map((key) => (
          <MetricBar
            key={key}
            icon={METRIC_ICONS[key]}
            label={METRIC_LABELS[key]}
            value={city.metrics[key]}
            displayValue={displayValues[key]}
          />
        ))}
      </div>

      {/* 스코어 + 비용 */}
      <div className="px-4 py-3 border-b border-[#1a1a1a]">
        <div className="font-mono text-xs mb-2">
          <span className="text-gray-500">SCORE: </span>
          <span className="text-[#00FF88] tracking-tight">{scoreBlocks}</span>
          <span className="text-[#00FF88] ml-1 font-bold">{city.score}/10</span>
        </div>
        <div className="font-mono text-xs text-gray-400">
          <span className="text-[#00E5FF]">💵</span> {formatKRWShort(city.monthlyCost)}/월
          <span className="text-gray-600 ml-2">원룸 {formatKRWShort(city.monthlyRent)}</span>
        </div>
        <div className="font-mono text-xs text-gray-600 mt-1">
          {city.weather} ·{" "}
          <span style={{ color: aqiColor }}>AQI {city.aqi}</span>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="px-4 py-3 flex gap-2">
        <button className="flex-1 font-mono text-xs border border-[#333] text-gray-400 hover:border-[#00FF88] hover:text-[#00FF88] py-1.5 transition-all">
          ▲ GOOD
        </button>
        <button className="flex-1 font-mono text-xs border border-[#333] text-gray-400 hover:border-red-500 hover:text-red-400 py-1.5 transition-all">
          ▼ BAD
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
