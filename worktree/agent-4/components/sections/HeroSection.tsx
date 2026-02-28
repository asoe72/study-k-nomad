import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
      {/* 골드 그라디언트 배경 효과 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 60%, rgba(212,175,55,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 40%, rgba(212,175,55,0.04) 0%, transparent 50%)",
        }}
      />

      {/* 상단 골드 라인 */}
      <div className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(to right, transparent 10%, #D4AF37 50%, transparent 90%)" }} />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 좌측: 타이틀 + CTA */}
          <div className="flex flex-col gap-10">
            {/* 서브타이틀 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px" style={{ background: "linear-gradient(to right, #D4AF37, transparent)" }} />
                <span className="text-xs tracking-[0.3em] uppercase"
                  style={{ color: "#D4AF37", fontFamily: "Cormorant Garamond, serif" }}>
                  Exclusive Collection
                </span>
              </div>
            </div>

            {/* 메인 타이틀 */}
            <div>
              <h1 className="leading-tight"
                style={{
                  fontFamily: "Cormorant Garamond, Georgia, serif",
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                  color: "#F5F0E0",
                  lineHeight: 1.1,
                }}>
                세계 최고의
                <br />
                <span style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #F7E7CE 40%, #C9A84C 60%, #D4AF37 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}>
                  도시
                </span>에서
                <br />
                일하다
              </h1>

              <div className="mt-6 flex items-center gap-4">
                <div className="w-8 h-px" style={{ background: "#D4AF37" }} />
                <p className="text-sm font-light leading-relaxed"
                  style={{ color: "#666666", letterSpacing: "0.05em", lineHeight: "2" }}>
                  전 세계 프리미엄 노마드 도시를 엄선하여
                  <br />격조 있는 여정을 안내해드립니다.
                </p>
              </div>
            </div>

            {/* CTA 버튼 */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="text-xs tracking-[0.2em] uppercase px-8 py-3 h-auto font-light"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #B8960C)",
                  color: "#0A0A0A",
                  fontFamily: "Cormorant Garamond, serif",
                  letterSpacing: "0.2em",
                  boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
                }}
              >
                <a href="#cities">컬렉션 보기</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="text-xs tracking-[0.2em] uppercase px-8 py-3 h-auto font-light"
                style={{
                  borderColor: "rgba(212,175,55,0.4)",
                  color: "#D4AF37",
                  background: "transparent",
                  fontFamily: "Cormorant Garamond, serif",
                  letterSpacing: "0.2em",
                }}
              >
                <a href="#finder">나에게 맞는 도시 →</a>
              </Button>
            </div>

            {/* 골드 구분선 + 통계 */}
            <div className="pt-8" style={{ borderTop: "1px solid #1A1A1A" }}>
              <div className="flex gap-12">
                {[
                  { label: "CITIES", value: "7" },
                  { label: "MEMBERS", value: "39,671" },
                  { label: "REVIEWS", value: "460+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-light"
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        color: "#D4AF37",
                      }}>
                      {stat.value}
                    </div>
                    <div className="text-xs tracking-[0.15em] mt-1"
                      style={{ color: "#444", fontFamily: "Cormorant Garamond, serif" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 우측: 럭셔리 정보 카드 */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm relative"
              style={{ border: "1px solid #2A2A2A" }}>
              {/* 상단 골드 라인 */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, #D4AF37, transparent)" }} />

              {/* 카드 헤더 */}
              <div className="px-6 py-4 flex items-center justify-between"
                style={{ borderBottom: "1px solid #1A1A1A" }}>
                <span className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: "#444", fontFamily: "Cormorant Garamond, serif" }}>
                  Premium Cities
                </span>
                <span className="text-xs tracking-[0.1em]"
                  style={{ color: "#D4AF37", fontFamily: "Cormorant Garamond, serif" }}>
                  ◆ Live
                </span>
              </div>

              {/* 카드 바디 */}
              <div className="p-6 space-y-6">
                {[
                  { city: "두바이", region: "UAE", score: "98" },
                  { city: "싱가포르", region: "SG", score: "95" },
                  { city: "파리", region: "FR", score: "91" },
                  { city: "도쿄", region: "JP", score: "89" },
                ].map((item) => (
                  <div key={item.city} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-light" style={{ color: "#F5F0E0", fontFamily: "Cormorant Garamond, serif", letterSpacing: "0.05em" }}>
                        {item.city}
                      </div>
                      <div className="text-xs tracking-[0.1em]" style={{ color: "#444" }}>
                        {item.region}
                      </div>
                    </div>
                    <div className="text-xl font-light"
                      style={{
                        color: "#D4AF37",
                        fontFamily: "Cormorant Garamond, serif",
                      }}>
                      {item.score}
                    </div>
                  </div>
                ))}
              </div>

              {/* 카드 푸터 */}
              <div className="px-6 py-4" style={{ borderTop: "1px solid #1A1A1A" }}>
                <a href="#cities" className="text-xs tracking-[0.15em] uppercase" style={{ color: "#D4AF37", fontFamily: "Cormorant Garamond, serif" }}>
                  전체 컬렉션 →
                </a>
              </div>

              {/* 하단 골드 라인 */}
              <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, #D4AF37, transparent)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "#444", fontFamily: "Cormorant Garamond, serif" }}>
          Scroll
        </div>
        <div className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, #D4AF37, transparent)" }} />
      </div>
    </section>
  );
}
