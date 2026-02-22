"use client";

import { useState, useEffect } from "react";

const TERMINAL_LINES = [
  { text: "$ nomad --scan korea --sort score", type: "prompt", delay: 0 },
  { text: "> scanning 7 cities...", type: "output", delay: 600 },
  { text: "> loading real-time data...", type: "output", delay: 1200 },
  { text: "", type: "blank", delay: 1800 },
  { text: "  #1  제주시     score: 8.5/10", type: "highlight", delay: 2200 },
  { text: "  #2  부산       score: 8.1/10", type: "highlight", delay: 2600 },
  { text: "  #3  서울 홍대  score: 8.3/10", type: "highlight", delay: 3000 },
  { text: "  #4  대전       score: 7.9/10", type: "highlight", delay: 3400 },
  { text: "  #5  강릉       score: 7.8/10", type: "highlight", delay: 3800 },
  { text: "", type: "blank", delay: 4200 },
  { text: "  ✓  39,671 members online", type: "cyan", delay: 4600 },
  { text: "  ✓  460 new reviews this month", type: "cyan", delay: 5000 },
  { text: "", type: "blank", delay: 5400 },
  { text: "$ nomad --city jeju --review", type: "prompt", delay: 5800 },
];

export default function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    TERMINAL_LINES.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleLines(i + 1);
      }, TERMINAL_LINES[i].delay);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="terminal-window w-full max-w-md mx-auto">
      {/* 타이틀바 */}
      <div className="terminal-titlebar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="font-mono text-xs text-gray-500 ml-2">terminal — nomad.kr</span>
      </div>

      {/* 바디 */}
      <div className="terminal-body min-h-[320px]">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i}>
            {line.type === "blank" ? (
              <div className="h-4" />
            ) : (
              <div
                className={
                  line.type === "prompt"
                    ? "terminal-prompt"
                    : line.type === "highlight"
                    ? "terminal-highlight"
                    : line.type === "cyan"
                    ? "terminal-cyan"
                    : "terminal-output"
                }
              >
                {line.text}
                {i === visibleLines - 1 && line.type === "prompt" && (
                  <span className="terminal-cursor" />
                )}
              </div>
            )}
          </div>
        ))}
        {visibleLines < TERMINAL_LINES.length && visibleLines > 0 && (
          TERMINAL_LINES[visibleLines - 1].type !== "prompt" && (
            <span className="terminal-cursor" />
          )
        )}
      </div>
    </div>
  );
}
