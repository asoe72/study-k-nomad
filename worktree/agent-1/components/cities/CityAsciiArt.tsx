import { CITY_ASCII } from "@/lib/ascii-art";

interface CityAsciiArtProps {
  cityId: string;
  rank: number;
}

export default function CityAsciiArt({ cityId, rank }: CityAsciiArtProps) {
  const art = CITY_ASCII[cityId] ?? "";

  return (
    <div className="relative bg-[#050505] border-b border-[#1a1a1a] p-3 overflow-hidden">
      <pre
        className="font-mono text-[#00FF88] leading-tight select-none overflow-hidden"
        style={{ fontSize: "0.5rem", opacity: 0.7 }}
        aria-hidden="true"
      >
        {art}
      </pre>
      {/* 랭킹 뱃지 */}
      <div className="absolute top-2 right-2 font-mono text-xs font-bold text-[#080808] bg-[#00FF88] px-2 py-0.5">
        #{rank}
      </div>
    </div>
  );
}
