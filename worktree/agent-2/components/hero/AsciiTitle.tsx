import { ASCII_TITLE } from "@/lib/ascii-art";

export default function AsciiTitle() {
  return (
    <div className="section-fade-up">
      <pre
        className="ascii-art neon-text font-mono leading-tight select-none"
        style={{ fontSize: "clamp(0.45rem, 1.2vw, 1rem)" }}
        aria-label="NOMAD.KR"
      >
        {ASCII_TITLE}
      </pre>
      <p className="mt-6 text-gray-400 text-base md:text-lg font-sans">
        한국 디지털 노마드를 위한 도시 랭킹 플랫폼
      </p>
      <p className="mt-2 font-mono text-xs text-gray-600">
        <span className="text-[#00FF88]">7개 도시</span> · <span className="text-[#00E5FF]">5개 지표</span> · <span className="text-gray-500">실시간 데이터</span>
      </p>
    </div>
  );
}
