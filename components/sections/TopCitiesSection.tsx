import CitiesClient from "@/components/cities/CitiesClient";

export default function TopCitiesSection() {
  return (
    <section id="cities" className="py-16 border-b border-[#1a1a1a]">
      <div className="mx-auto max-w-7xl px-4">
        {/* 섹션 헤더 */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="font-mono text-xs text-[#00FF88] mb-2 tracking-widest">
              {'// 04 CITIES'}
            </div>
            <h2 className="font-mono text-2xl md:text-3xl font-bold text-white">
              도시 리스트
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              7개 도시 · 좋아요 순 정렬
            </p>
          </div>
          <a
            href="#"
            className="font-mono text-xs text-gray-500 hover:text-[#00FF88] transition-colors"
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
