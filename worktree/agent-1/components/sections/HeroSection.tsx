import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-white">
      {/* 서브틀한 그리드 패턴 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(to right, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 좌측: 타이틀 + CTA */}
          <div className="flex flex-col gap-8">
            {/* 태그라인 */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-blue-500" />
              <span className="text-xs font-medium text-blue-500 tracking-widest uppercase">
                Digital Nomad Hub
              </span>
            </div>

            {/* 메인 타이틀 */}
            <div>
              <h1 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight tracking-tight">
                나에게 맞는
                <br />
                <span className="font-semibold text-blue-500">도시</span>를
                <br />
                찾아보세요
              </h1>
              <p className="mt-6 text-lg font-light text-gray-500 leading-relaxed max-w-md">
                전 세계 디지털 노마드들의 실제 경험을 바탕으로
                당신에게 최적화된 도시를 추천해드립니다.
              </p>
            </div>

            {/* CTA 버튼 */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="text-sm bg-blue-500 text-white hover:bg-blue-600 border-0 px-8 py-3 h-auto font-medium"
              >
                <a href="#cities">도시 랭킹 보기</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="text-sm border-gray-200 text-gray-600 bg-transparent hover:bg-gray-50 hover:border-gray-300 px-8 py-3 h-auto font-light"
              >
                <a href="#finder">내 도시 찾기 →</a>
              </Button>
            </div>

            {/* 통계 */}
            <div className="flex gap-12 pt-4 border-t border-gray-100">
              {[
                { label: "추천 도시", value: "7" },
                { label: "멤버", value: "39,671" },
                { label: "리뷰", value: "460+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                  <div className="text-xs font-light text-gray-400 mt-1 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 클린한 정보 카드 */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-white border border-gray-100 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                  실시간 현황
                </span>
                <span className="flex items-center gap-1.5 text-xs text-green-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="space-y-4">
                {[
                  { city: "치앙마이", score: 92, label: "노마드 지수" },
                  { city: "발리", score: 88, label: "노마드 지수" },
                  { city: "리스본", score: 85, label: "노마드 지수" },
                  { city: "바르셀로나", score: 82, label: "노마드 지수" },
                ].map((item, i) => (
                  <div key={item.city} className="flex items-center gap-4">
                    <span className="text-xs text-gray-300 w-4">{i + 1}</span>
                    <span className="text-sm font-medium text-gray-700 flex-1">{item.city}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-400 rounded-full"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-8 text-right">{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50">
                <a href="#cities" className="text-xs text-blue-500 hover:text-blue-600 transition-colors">
                  전체 랭킹 보기 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 스크롤 힌트 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="text-xs font-light text-gray-300 tracking-widest uppercase">Scroll</div>
        <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
      </div>
    </section>
  );
}
