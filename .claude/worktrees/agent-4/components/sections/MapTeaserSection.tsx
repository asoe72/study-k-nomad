import MapCityPins from "@/components/map/MapCityPins";
import { CITIES, formatKRWShort } from "@/lib/data";
import { Button } from "@/components/ui/button";

const SYMBOL_LEGEND = [
  { symbol: "★", label: "TOP RATED" },
  { symbol: "◆", label: "수도권" },
  { symbol: "▲", label: "테크허브" },
  { symbol: "◈", label: "문화도시" },
  { symbol: "●", label: "자연" },
];

export default function MapTeaserSection() {
  return (
    <section id="map" className="py-16 border-b border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="font-mono text-xs text-[#00FF88] mb-2 tracking-widest">
            // 07 ASCII_MAP
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-white">
            한국 노마드 지도
          </h2>
          <p className="text-gray-500 text-sm mt-1">도시 핀에 마우스를 올려 정보를 확인하세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 지도 */}
          <div className="lg:col-span-2 bg-[#080808] border border-[#1a1a1a] p-4 relative overflow-x-auto">
            <div className="font-mono text-xs text-[#333] mb-2">
              ┌─ KOREA_NOMAD_MAP v1.0 ─────────────────┐
            </div>
            <MapCityPins />
            <div className="font-mono text-xs text-[#333] mt-2">
              └────────────────────────────────────────┘
            </div>

            {/* 범례 */}
            <div className="mt-4 flex flex-wrap gap-4">
              {SYMBOL_LEGEND.map((l) => (
                <span key={l.symbol} className="font-mono text-xs text-gray-500">
                  <span className="text-[#00FF88]">{l.symbol}</span> {l.label}
                </span>
              ))}
            </div>
          </div>

          {/* 도시 인덱스 */}
          <div className="bg-[#080808] border border-[#1a1a1a] p-4">
            <div className="font-mono text-xs text-[#00FF88] mb-4 tracking-widest">
              CITY_INDEX
            </div>
            <div className="space-y-3">
              {CITIES.map((city) => (
                <div
                  key={city.id}
                  className="flex items-center justify-between font-mono text-xs border-b border-[#1a1a1a] pb-3 hover:border-[#333] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#00E5FF]">{city.symbol}</span>
                    <span className="text-gray-300">{city.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[#00FF88]">{city.score}</div>
                    <div className="text-gray-600 text-[10px]">{formatKRWShort(city.monthlyCost)}/월</div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-4 font-mono text-xs border border-[#333] text-gray-500 bg-transparent hover:border-[#00FF88] hover:text-[#00FF88] transition-all"
            >
              풀 지도 보기 →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
