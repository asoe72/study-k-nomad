import CitiesClient from "@/components/cities/CitiesClient";

export default function TopCitiesSection() {
  return (
    <section id="cities" className="py-20 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* 섹션 헤더 */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-px bg-blue-500" />
              <span className="text-xs font-medium text-blue-500 tracking-widest uppercase">
                Top Cities
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
              도시 랭킹
            </h2>
            <p className="text-gray-400 text-sm mt-1 font-light">
              7개 도시 · 5개 지표 · 실시간 업데이트
            </p>
          </div>
          <a
            href="#"
            className="text-xs font-light text-gray-400 hover:text-blue-500 transition-colors tracking-wide"
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
