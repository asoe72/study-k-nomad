import { Button } from "@/components/ui/button";
import AsciiRainBackground from "@/components/hero/AsciiRainBackground";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* ASCII Rain 배경 */}
      <AsciiRainBackground />

      {/* 핑크/시안 그라디언트 오버레이 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(255,45,120,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(0,255,255,0.05) 0%, transparent 55%)",
        }}
      />

      {/* 상단 사이버 라인 */}
      <div className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, #FF2D78, transparent)" }} />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 좌측: 타이틀 + CTA */}
          <div className="flex flex-col gap-8">
            {/* 시스템 태그 */}
            <div className="font-mono text-xs tracking-widest"
              style={{ color: "#00FFFF", textShadow: "0 0 8px #00FFFF" }}>
              {">"} SYSTEM.NOMAD_FINDER v2.0 // ONLINE
            </div>

            {/* 메인 타이틀 */}
            <div>
              <div className="font-mono text-xs text-[#555] mb-2 tracking-widest">// LOCATE YOUR CITY</div>
              <h1 className="font-mono text-4xl md:text-5xl font-bold leading-tight tracking-tight uppercase"
                style={{
                  color: "#FF2D78",
                  textShadow: "0 0 10px #FF2D78, 0 0 30px #FF2D78",
                }}>
                NOMAD
                <br />
                <span style={{
                  color: "#00FFFF",
                  textShadow: "0 0 10px #00FFFF, 0 0 30px #00FFFF",
                }}>FINDER</span>
                <br />
                <span className="text-2xl font-light text-[#e0e0e0]"
                  style={{ textShadow: "none" }}>
                  당신의 도시를 찾아라
                </span>
              </h1>
            </div>

            {/* CTA 버튼 */}
            <div className="flex flex-wrap gap-4 mt-2">
              <Button
                asChild
                className="font-mono text-sm uppercase tracking-widest border-0 px-6 py-3 h-auto font-bold text-black"
                style={{
                  background: "#FF2D78",
                  boxShadow: "0 0 20px rgba(255,45,120,0.7)",
                }}
              >
                <a href="#cities">▶ 도시 랭킹 접속</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="font-mono text-sm uppercase tracking-widest bg-transparent px-6 py-3 h-auto"
                style={{
                  border: "1px solid #00FFFF",
                  color: "#00FFFF",
                  textShadow: "0 0 8px #00FFFF",
                  boxShadow: "0 0 10px rgba(0,255,255,0.3)",
                }}
              >
                <a href="#finder">내 도시 스캔 →</a>
              </Button>
            </div>

            {/* 통계 */}
            <div className="flex gap-8 mt-2 pt-4 border-t border-[#1a1a1a]">
              {[
                { label: "CITIES", value: "7" },
                { label: "NOMADS", value: "39,671" },
                { label: "REVIEWS", value: "460+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono text-2xl font-bold"
                    style={{ color: "#FF2D78", textShadow: "0 0 8px #FF2D78" }}>
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-[#444] tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 사이버 터미널 */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md terminal-window">
              <div className="terminal-titlebar">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="font-mono text-xs text-[#444] ml-2 tracking-widest">
                  NOMAD.SYSTEM // LIVE
                </span>
              </div>
              <div className="terminal-body">
                <div className="space-y-1">
                  <p><span className="terminal-prompt">$</span> <span className="text-[#e0e0e0]">scan --global --nomad</span></p>
                  <p className="terminal-output">Scanning 7 cities...</p>
                  <p className="terminal-output">━━━━━━━━━━━━━━━━━━━━</p>
                  {[
                    { city: "치앙마이", score: "92", rank: "01" },
                    { city: "발리", score: "88", rank: "02" },
                    { city: "리스본", score: "85", rank: "03" },
                    { city: "바르셀로나", score: "82", rank: "04" },
                  ].map((item) => (
                    <p key={item.city}>
                      <span className="terminal-cyan">[{item.rank}]</span>{" "}
                      <span className="terminal-highlight">{item.city}</span>{" "}
                      <span className="terminal-output">score:</span>{" "}
                      <span style={{ color: "#FF2D78", textShadow: "0 0 4px #FF2D78" }}>
                        {item.score}
                      </span>
                    </p>
                  ))}
                  <p className="terminal-output">━━━━━━━━━━━━━━━━━━━━</p>
                  <p>
                    <span className="terminal-prompt">$</span>{" "}
                    <span className="text-[#e0e0e0]">status</span>{" "}
                    <span className="terminal-highlight">READY</span>
                    <span className="terminal-cursor" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 사이버 라인 */}
      <div className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, #00FFFF, transparent)" }} />

      {/* 스크롤 힌트 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="font-mono text-xs text-[#333] tracking-widest">SCROLL_DOWN</div>
        <div className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, #FF2D78, transparent)" }} />
      </div>
    </section>
  );
}
