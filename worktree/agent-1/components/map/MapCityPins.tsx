"use client";

import { useState } from "react";
import { MAP_PINS, formatKRWShort } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function MapCityPins() {
  return (
    <div className="relative w-full" style={{ minHeight: "320px" }}>
      {/* 한반도 ASCII 지도 배경 */}
      <pre
        className="font-mono text-[#1e3a2a] leading-tight select-none overflow-x-auto"
        style={{ fontSize: "clamp(0.5rem, 1.1vw, 0.75rem)" }}
        aria-hidden="true"
      >
{`
          ┌──────────────────────────────────────┐
          │                                      │
          │                                      │
          │                                      │
          │                                      │
          │                                      │
          │                                      │
          │                                      │
          │                                      │
          │                                      │
          │                                      │
          └──────────────────────────────────────┘
                   ╔════════════╗
                   ║            ║
                   ╚════════════╝`}
      </pre>

      {/* 도시 핀들 */}
      {MAP_PINS.map((pin) => (
        <Tooltip key={pin.cityId}>
          <TooltipTrigger asChild>
            <button
              className="absolute font-mono text-sm font-bold transition-all hover:scale-125 hover:z-10"
              style={{
                top: pin.top,
                left: pin.left,
                color: pin.cityId === "jeju" ? "#00FF88" : "#00E5FF",
                textShadow: `0 0 8px currentColor`,
              }}
              aria-label={pin.name}
            >
              {pin.symbol}
            </button>
          </TooltipTrigger>
          <TooltipContent
            className="bg-[#0f0f0f] border border-[#333] font-mono p-3"
            side="top"
          >
            <div className="text-[#00FF88] font-bold text-xs">{pin.label} {pin.name}</div>
            <div className="text-gray-400 text-[10px]">스코어: {pin.score}/10</div>
            <div className="text-gray-400 text-[10px]">생활비: {formatKRWShort(pin.cost)}/월</div>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
