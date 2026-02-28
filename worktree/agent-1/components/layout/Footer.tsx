import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = {
  CITIES: ["제주시", "부산", "서울 홍대", "대전", "강릉", "전주", "춘천"],
  COMMUNITY: ["밋업 일정", "리뷰 게시판", "동행 구하기", "질문 & 답변"],
  TOOLS: ["도시 계산기", "비용 비교표", "인터넷 속도 지도", "코워킹 DB"],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a] mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* 상단 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* 브랜드 */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-mono text-2xl font-bold neon-text mb-3">
              NOMAD<span className="text-[#00E5FF]">.</span>KR
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              한국 디지털 노마드를 위한<br />
              도시 랭킹 플랫폼
            </p>
            <div className="flex gap-3 mt-4">
              {["𝕏", "📘", "📸"].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 border border-[#333] text-gray-500 hover:border-[#00FF88] hover:text-[#00FF88] transition-colors font-mono text-xs flex items-center justify-center"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* 링크들 */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-mono text-xs text-[#00FF88] mb-3 tracking-widest">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 text-xs hover:text-gray-300 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-[#1a1a1a] mb-6" />

        {/* 하단 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-gray-600">
            © 2025 NOMAD.KR — Made with ♥ for Korean Digital Nomads
          </p>
          <div className="flex gap-6">
            {["개인정보처리방침", "이용약관", "문의하기"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* 터미널 스타일 하단 메시지 */}
        <div className="mt-6 font-mono text-xs text-gray-700">
          <span className="text-[#00FF88]">$</span> nomad --version 1.0.0 --status online --cities 7 --members 39671
        </div>
      </div>
    </footer>
  );
}
