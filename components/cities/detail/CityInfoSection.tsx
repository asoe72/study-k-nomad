import { City, formatKRW } from "@/lib/data";

interface CityInfoSectionProps {
  city: City;
}

const INFO_FIELDS: { label: string; getValue: (city: City) => string }[] = [
  { label: "월 생활비", getValue: (city) => formatKRW(city.monthlyCost) },
  { label: "원룸 월세", getValue: (city) => formatKRW(city.monthlyRent) },
  { label: "인터넷 속도", getValue: (city) => `${city.internetSpeed}Mbps` },
  { label: "예산 분류", getValue: (city) => city.budget },
  { label: "추천 계절", getValue: (city) => city.season.join(", ") },
  { label: "작업 환경", getValue: (city) => city.environment.join(", ") },
];

export default function CityInfoSection({ city }: CityInfoSectionProps) {
  return (
    <section className="border border-[#222] bg-[#0f0f0f]">
      {/* 터미널 헤더 */}
      <div className="px-5 py-2 border-b border-[#1a1a1a]">
        <span className="font-mono text-xs text-[#00FF88]">{"// CITY_INFO"}</span>
      </div>

      <div className="p-5 space-y-3">
        {INFO_FIELDS.map(({ label, getValue }) => (
          <div key={label} className="flex font-mono text-sm">
            <span className="text-gray-500 w-28 shrink-0">{label}</span>
            <span className="text-gray-300">{getValue(city)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
