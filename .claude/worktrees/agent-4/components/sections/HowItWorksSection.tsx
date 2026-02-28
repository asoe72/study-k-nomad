import { HOW_IT_WORKS_STEPS } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function HowItWorksSection() {
  return (
    <section className="py-16 border-b border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4">
        {/* 헤더 */}
        <div className="mb-10 text-center">
          <div className="font-mono text-xs text-[#00FF88] mb-2 tracking-widest">
            // 05 HOW_IT_WORKS
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-white">
            어떻게 사용하나요?
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            4단계로 나에게 맞는 노마드 도시를 찾으세요
          </p>
        </div>

        {/* 스텝 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div key={step.step} className="flex items-stretch gap-2">
              <Card className="flex-1 bg-[#0f0f0f] border-[#222] p-5 hover:border-[#333] transition-colors relative overflow-hidden">
                {/* 배경 번호 */}
                <div
                  className="absolute top-2 right-3 font-mono text-5xl font-bold text-[#1a1a1a] select-none"
                  aria-hidden="true"
                >
                  {step.step}
                </div>

                {/* 내용 */}
                <div className="relative">
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] border-[#00FF88] text-[#00FF88] px-2 py-0 mb-3"
                  >
                    {step.step}
                  </Badge>
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h3 className="font-mono text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>

              {/* 커넥터 다이아몬드 (마지막 제외) */}
              {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="hidden xl:flex items-center">
                  <div
                    className="w-3 h-3 bg-[#333] rotate-45 shrink-0"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <Separator className="bg-[#1a1a1a] mt-10" />
      </div>
    </section>
  );
}
