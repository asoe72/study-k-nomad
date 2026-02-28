import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FAFAF7]">
      {/* 자연 느낌 그라디언트 배경 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(135,168,120,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(45,106,79,0.08) 0%, transparent 60%)",
        }}
      />

      {/* 잎 패턴 장식 (우측 상단) */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 80% 20%, #2D6A4F 1px, transparent 1px), radial-gradient(circle at 60% 40%, #87A878 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 좌측: 타이틀 + CTA */}
          <div className="flex flex-col gap-8">
            {/* 태그라인 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: "#87A878" }} />
              <span className="text-sm font-light tracking-widest"
                style={{ color: "#87A878", fontFamily: "Lora, Georgia, serif" }}>
                자연이 있는 곳에서 일하다
              </span>
            </div>

            {/* 메인 타이틀 */}
            <div>
              <h1 className="text-5xl md:text-6xl leading-tight"
                style={{
                  fontFamily: "Lora, Georgia, serif",
                  fontWeight: 400,
                  color: "#1B4332",
                }}>
                당신이 꿈꾸는
                <br />
                <em style={{ color: "#2D6A4F", fontStyle: "italic" }}>자연</em> 속에서
                <br />
                <span style={{ fontWeight: 500 }}>일하세요</span>
              </h1>
              <p className="mt-6 text-base font-light leading-relaxed"
                style={{ color: "#6B7A6B", maxWidth: "400px", lineHeight: "1.9" }}>
                세계 각지의 아름다운 자연환경 속 도시를 경험한
                디지털 노마드들의 솔직한 리뷰를 만나보세요.
              </p>
            </div>

            {/* CTA 버튼 */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="text-sm px-8 py-3 h-auto font-light"
                style={{
                  background: "#2D6A4F",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  letterSpacing: "0.05em",
                }}
              >
                <a href="#cities">도시 탐색하기</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="text-sm px-8 py-3 h-auto font-light"
                style={{
                  borderColor: "#D4C5A9",
                  color: "#2D6A4F",
                  background: "transparent",
                  borderRadius: "8px",
                  letterSpacing: "0.05em",
                }}
              >
                <a href="#finder">내 도시 찾기 →</a>
              </Button>
            </div>

            {/* 통계 */}
            <div className="flex gap-10 pt-6" style={{ borderTop: "1px solid #D4C5A9" }}>
              {[
                { label: "추천 도시", value: "7" },
                { label: "노마드 멤버", value: "39,671" },
                { label: "리뷰", value: "460+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-medium" style={{ color: "#2D6A4F", fontFamily: "Lora, serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-light mt-1 tracking-wide" style={{ color: "#87A878" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 네이처 정보 카드 */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-md"
              style={{ background: "#FFFFFF", border: "1px solid #D4C5A9" }}>
              {/* 카드 헤더 */}
              <div className="px-6 py-4 flex items-center justify-between"
                style={{ background: "#F5F0E8", borderBottom: "1px solid #D4C5A9" }}>
                <span className="text-sm font-light" style={{ color: "#6B7A6B", fontFamily: "Lora, serif" }}>
                  자연 지수 랭킹
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "#87A878" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
              </div>
              {/* 카드 바디 */}
              <div className="p-6 space-y-5">
                {[
                  { city: "치앙마이", emoji: "🌿", score: 94 },
                  { city: "발리", emoji: "🌴", score: 91 },
                  { city: "포르토", emoji: "🌊", score: 86 },
                  { city: "메데진", emoji: "🌺", score: 83 },
                ].map((item, i) => (
                  <div key={item.city} className="flex items-center gap-4">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-sm font-light flex-1" style={{ color: "#2D3A2E" }}>
                      {item.city}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full overflow-hidden"
                        style={{ background: "#E9D8A6" }}>
                        <div className="h-full rounded-full"
                          style={{ width: `${item.score}%`, background: "#2D6A4F" }} />
                      </div>
                      <span className="text-xs w-7 text-right" style={{ color: "#87A878" }}>
                        {item.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4" style={{ borderTop: "1px solid #E9D8A6" }}>
                <a href="#cities" className="text-xs font-light" style={{ color: "#2D6A4F" }}>
                  전체 목록 보기 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 물결 구분선 */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="#F5F0E8" />
        </svg>
      </div>

      {/* 스크롤 힌트 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="text-xs font-light tracking-widest" style={{ color: "#87A878" }}>
          scroll
        </div>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, #87A878, transparent)" }} />
      </div>
    </section>
  );
}
