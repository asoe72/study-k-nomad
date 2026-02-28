import CitiesClient from "@/components/cities/CitiesClient";

export default function TopCitiesSection() {
  return (
    <section id="cities" className="py-16 bg-black"
      style={{ borderBottom: "1px solid rgba(255,45,120,0.2)" }}>
      <div className="mx-auto max-w-7xl px-4">
        {/* 섹션 헤더 */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="font-mono text-xs mb-2 tracking-widest"
              style={{ color: "#FF2D78", textShadow: "0 0 6px #FF2D78" }}>
              // 04 TOP_CITIES
            </div>
            <h2 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-wide"
              style={{ color: "#e0e0e0" }}>
              도시 랭킹
            </h2>
            <p className="text-[#444] text-sm mt-1 font-mono tracking-wide">
              7개 도시 · 5개 지표 · 실시간 업데이트
            </p>
          </div>
          <a
            href="#"
            className="font-mono text-xs text-[#444] hover:text-[#FF2D78] transition-colors uppercase tracking-widest"
            style={{ transition: "color 0.2s, text-shadow 0.2s" }}
          >
            전체보기 →
          </a>
        </div>

        {/* 도시 카드 (클라이언트 컴포넌트) */}
        <CitiesClient />
      </div>
    </section>
  );
}
