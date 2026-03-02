import { City, scoreToBlocks } from "@/lib/data";
import { CITY_ASCII } from "@/lib/ascii-art";
import { Badge } from "@/components/ui/badge";

interface CityDetailHeroProps {
  city: City;
}

export default function CityDetailHero({ city }: CityDetailHeroProps) {
  const ascii = CITY_ASCII[city.id] ?? "";

  return (
    <section className="border border-[#222] bg-[#0f0f0f]">
      {/* 터미널 헤더 */}
      <div className="px-5 py-2 border-b border-[#1a1a1a] flex items-center gap-2">
        <span className="font-mono text-xs text-[#00FF88]">{"// CITY_PROFILE"}</span>
        <span className="font-mono text-xs text-gray-600 ml-auto">
          {city.id}.dat
        </span>
      </div>

      {/* ASCII 아트 */}
      <div className="relative bg-[#050505] border-b border-[#1a1a1a] p-6 overflow-hidden">
        <pre
          className="font-mono text-[#00FF88] leading-tight select-none text-center"
          style={{ fontSize: "0.65rem", opacity: 0.8 }}
          aria-hidden="true"
        >
          {ascii}
        </pre>
        {/* 랭킹 뱃지 */}
        <div className="absolute top-3 right-3 font-mono text-sm font-bold text-[#080808] bg-[#00FF88] px-3 py-1">
          #{city.rank}
        </div>
      </div>

      {/* 도시 정보 */}
      <div className="p-5 space-y-4">
        {/* 도시명 */}
        <div>
          <h1 className="font-mono text-3xl font-bold text-white">
            {city.name}
          </h1>
          <p className="font-mono text-sm text-gray-500 mt-1">
            {city.nameEn} &middot; {city.region}
          </p>
        </div>

        {/* 종합 점수 */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gray-500 w-20 shrink-0">
            종합점수
          </span>
          <span className="font-mono text-sm text-[#00FF88] tracking-wider">
            {scoreToBlocks(city.score)}
          </span>
          <span className="font-mono text-lg font-bold text-[#00FF88]">
            {city.score}
          </span>
        </div>

        {/* 날씨 + AQI */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-gray-500">날씨</span>
            <span className="font-mono text-sm text-gray-300">
              {city.weather}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-gray-500">AQI</span>
            <span
              className={`font-mono text-sm font-bold ${
                city.aqi <= 30
                  ? "text-[#00FF88]"
                  : city.aqi <= 50
                    ? "text-yellow-400"
                    : "text-orange-400"
              }`}
            >
              {city.aqi}
            </span>
            <span className="font-mono text-xs text-gray-600">
              {city.aqi <= 30 ? "(최상)" : city.aqi <= 50 ? "(좋음)" : "(보통)"}
            </span>
          </div>
        </div>

        {/* 태그 */}
        <div className="flex gap-2 flex-wrap">
          {city.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="font-mono text-xs border-[#333] text-gray-400 px-2 py-0.5"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
