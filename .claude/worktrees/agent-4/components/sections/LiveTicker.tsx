"use client";

import { TICKER_ITEMS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function LiveTicker() {
  // 두 배로 복제해서 무한 루프 구현
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="border-y border-[#1a1a1a] bg-[#0a0a0a] py-3 overflow-hidden">
      <div className="flex items-center">
        {/* LIVE 뱃지 (고정) */}
        <div className="flex-shrink-0 flex items-center gap-2 px-4 border-r border-[#1a1a1a] mr-4 z-10 bg-[#0a0a0a]">
          <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
          <Badge
            variant="outline"
            className="font-mono text-[10px] border-[#00FF88] text-[#00FF88] px-2 py-0"
          >
            LIVE
          </Badge>
        </div>

        {/* 티커 트랙 */}
        <div className="overflow-hidden flex-1">
          <div className="ticker-track">
            {doubled.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2 px-6 font-mono text-sm text-gray-400 whitespace-nowrap"
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-gray-500">{item.text}</span>
                <span
                  className={
                    item.trend === "up"
                      ? "text-[#00FF88]"
                      : item.trend === "down"
                      ? "text-red-400"
                      : "text-[#00E5FF]"
                  }
                >
                  {item.value}
                </span>
                <span className="text-[#333] mx-2">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
