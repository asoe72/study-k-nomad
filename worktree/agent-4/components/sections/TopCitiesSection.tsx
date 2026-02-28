import CitiesClient from "@/components/cities/CitiesClient";

export default function TopCitiesSection() {
  return (
    <section id="cities" className="py-20 bg-[#0A0A0A]"
      style={{ borderBottom: "1px solid #1A1A1A" }}>
      <div className="mx-auto max-w-7xl px-6">
        {/* 섹션 헤더 */}
        <div className="flex items-end justify-between mb-12">
          <div>
            {/* 골드 장식 라인 */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px"
                style={{ background: "linear-gradient(to right, #D4AF37, transparent)" }} />
              <span className="text-xs tracking-[0.3em] uppercase"
                style={{ color: "#D4AF37", fontFamily: "Cormorant Garamond, serif" }}>
                Premium Ranking
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide"
              style={{ color: "#F5F0E0", fontFamily: "Cormorant Garamond, Georgia, serif", letterSpacing: "0.05em" }}>
              도시 랭킹
            </h2>
            <p className="text-sm font-light mt-2 tracking-wide" style={{ color: "#444" }}>
              7개 도시 · 5개 지표 · 실시간 업데이트
            </p>
          </div>
          <a
            href="#"
            className="text-xs tracking-[0.15em] uppercase transition-colors"
            style={{ color: "#D4AF37", fontFamily: "Cormorant Garamond, serif" }}
          >
            전체 컬렉션 →
          </a>
        </div>

        {/* 도시 카드 (클라이언트 컴포넌트) */}
        <CitiesClient />
      </div>
    </section>
  );
}
