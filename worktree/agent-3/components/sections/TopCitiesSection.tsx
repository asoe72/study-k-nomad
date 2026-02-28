import CitiesClient from "@/components/cities/CitiesClient";

export default function TopCitiesSection() {
  return (
    <section id="cities" className="py-20 bg-[#F5F0E8]"
      style={{ borderBottom: "1px solid #D4C5A9" }}>
      <div className="mx-auto max-w-7xl px-6">
        {/* 섹션 헤더 */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-light tracking-widest"
                style={{ color: "#87A878", fontFamily: "Lora, Georgia, serif", fontStyle: "italic" }}>
                🌿 Top Cities
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-medium"
              style={{ color: "#1B4332", fontFamily: "Lora, Georgia, serif" }}>
              도시 랭킹
            </h2>
            <p className="text-sm font-light mt-1" style={{ color: "#6B7A6B" }}>
              7개 도시 · 5개 지표 · 실시간 업데이트
            </p>
          </div>
          <a
            href="#"
            className="text-xs font-light tracking-wide transition-colors"
            style={{ color: "#87A878" }}
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
