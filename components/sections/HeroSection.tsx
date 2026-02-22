import AsciiTitle from "@/components/hero/AsciiTitle";
import TerminalWindow from "@/components/hero/TerminalWindow";
import AsciiRainBackground from "@/components/hero/AsciiRainBackground";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ASCII Rain 배경 */}
      <AsciiRainBackground />

      {/* 그라데이션 오버레이 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0,255,136,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(0,229,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 좌측: 타이틀 + CTA */}
          <div className="flex flex-col gap-8">
            <AsciiTitle />

            {/* CTA 버튼 */}
            <div className="flex flex-wrap gap-4 mt-4">
              <Button
                asChild
                className="font-mono text-sm bg-[#00FF88] text-[#080808] hover:bg-[#00cc6e] border-0 px-6 py-3 h-auto font-bold"
              >
                <a href="#cities">▶ 도시 랭킹 보기</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="font-mono text-sm border-[#00E5FF] text-[#00E5FF] bg-transparent hover:bg-[rgba(0,229,255,0.1)] px-6 py-3 h-auto"
              >
                <a href="#finder">내 도시 찾기 →</a>
              </Button>
            </div>

            {/* 통계 */}
            <div className="flex gap-8 mt-2">
              {[
                { label: "도시", value: "7" },
                { label: "멤버", value: "39,671" },
                { label: "리뷰", value: "460+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono text-2xl font-bold neon-text">{stat.value}</div>
                  <div className="font-mono text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 터미널 윈도우 */}
          <div className="flex justify-center lg:justify-end">
            <TerminalWindow />
          </div>
        </div>
      </div>

      {/* 하단 스크롤 힌트 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="font-mono text-xs text-gray-600">SCROLL DOWN</div>
        <div className="w-px h-10 bg-gradient-to-b from-[#00FF88] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
