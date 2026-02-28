"use client";

import { useState } from "react";
import { CITIES, formatKRWShort } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const ENV_TAGS = [
  { key: "바다", icon: "🌊", label: "바다" },
  { key: "산", icon: "🏔", label: "산" },
  { key: "도시", icon: "🏙", label: "도시" },
  { key: "문화", icon: "🏯", label: "문화" },
] as const;

const PRIORITY_TAGS = [
  { key: "internet", icon: "📡", label: "빠른 인터넷" },
  { key: "cost", icon: "💰", label: "저비용" },
  { key: "cafe", icon: "☕", label: "카페 많음" },
  { key: "transport", icon: "🚇", label: "교통" },
] as const;

interface RecommendedCity {
  name: string;
  score: number;
  cost: number;
}

export default function CityFinderForm() {
  const [income, setIncome] = useState<string>("300");
  const [budgetRatio, setBudgetRatio] = useState<number[]>([50]);
  const [selectedEnvs, setSelectedEnvs] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [results, setResults] = useState<RecommendedCity[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const toggleEnv = (key: string) => {
    setSelectedEnvs((prev) =>
      prev.includes(key) ? prev.filter((e) => e !== key) : [...prev, key]
    );
  };

  const togglePriority = (key: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(key) ? prev.filter((e) => e !== key) : [...prev, key]
    );
  };

  const handleFinder = () => {
    setIsRunning(true);
    const maxBudget = (parseInt(income) || 300) * 10000 * (budgetRatio[0] / 100);

    // 조건 기반 점수 계산
    const scored = CITIES.map((city) => {
      let bonus = 0;
      if (selectedEnvs.length === 0 || selectedEnvs.some((e) => (city.environment as string[]).includes(e))) bonus += 2;
      if (selectedPriorities.includes("internet")) bonus += city.metrics.internet * 0.3;
      if (selectedPriorities.includes("cost") && city.monthlyCost < 1200000) bonus += 2;
      if (selectedPriorities.includes("cafe")) bonus += city.metrics.cafe * 0.2;
      if (selectedPriorities.includes("transport")) bonus += city.metrics.transport * 0.2;
      return { city, totalScore: city.score + bonus };
    });

    const affordable = scored
      .filter((s) => s.city.monthlyCost <= maxBudget || maxBudget <= 0)
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 3)
      .map((s) => ({ name: s.city.name, score: s.city.score, cost: s.city.monthlyCost }));

    setTimeout(() => {
      setResults(affordable.length > 0 ? affordable : CITIES.slice(0, 3).map((c) => ({ name: c.name, score: c.score, cost: c.monthlyCost })));
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 폼 */}
      <div className="bg-[#080808] border border-[#1a1a1a] p-6 font-mono">
        <div className="text-xs text-[#00FF88] mb-6">// CITY_FINDER.exe</div>

        {/* 월 수입 */}
        <div className="mb-6">
          <label className="text-xs text-gray-400 mb-2 block">
            💵 월 수입 (만원)
          </label>
          <Input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="300"
            className="bg-[#1a1a1a] border-[#333] text-white font-mono text-sm h-10 focus:border-[#00FF88] focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* 예산 비율 슬라이더 */}
        <div className="mb-6">
          <label className="text-xs text-gray-400 mb-2 block">
            생활비 비율: <span className="text-[#00FF88]">{budgetRatio[0]}%</span>
            <span className="text-gray-600 ml-2">
              (약 {formatKRWShort((parseInt(income) || 300) * 10000 * budgetRatio[0] / 100)}/월)
            </span>
          </label>
          <Slider
            value={budgetRatio}
            onValueChange={setBudgetRatio}
            min={20}
            max={100}
            step={5}
            className="[&>[role=slider]]:bg-[#00FF88] [&>[role=slider]]:border-0"
          />
        </div>

        {/* 선호 환경 */}
        <div className="mb-6">
          <label className="text-xs text-gray-400 mb-3 block">🌿 선호 환경</label>
          <div className="flex flex-wrap gap-2">
            {ENV_TAGS.map((tag) => (
              <button
                key={tag.key}
                onClick={() => toggleEnv(tag.key)}
                className={`text-xs px-3 py-1.5 border transition-all ${
                  selectedEnvs.includes(tag.key)
                    ? "border-[#00FF88] text-[#00FF88] bg-[rgba(0,255,136,0.1)]"
                    : "border-[#333] text-gray-500 hover:border-[#555]"
                }`}
              >
                {tag.icon} {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* 최우선 조건 */}
        <div className="mb-8">
          <label className="text-xs text-gray-400 mb-3 block">⚡ 최우선 조건</label>
          <div className="flex flex-wrap gap-2">
            {PRIORITY_TAGS.map((tag) => (
              <button
                key={tag.key}
                onClick={() => togglePriority(tag.key)}
                className={`text-xs px-3 py-1.5 border transition-all ${
                  selectedPriorities.includes(tag.key)
                    ? "border-[#00E5FF] text-[#00E5FF] bg-[rgba(0,229,255,0.1)]"
                    : "border-[#333] text-gray-500 hover:border-[#555]"
                }`}
              >
                {tag.icon} {tag.label}
                {selectedPriorities.includes(tag.key) && " ✓"}
              </button>
            ))}
          </div>
        </div>

        {/* 실행 버튼 */}
        <Button
          onClick={handleFinder}
          disabled={isRunning}
          className="w-full font-mono text-sm bg-[#00FF88] text-[#080808] hover:bg-[#00cc6e] font-bold h-11"
        >
          {isRunning ? "▶▶ 분석 중..." : "▶▶ 도시 찾기 실행"}
        </Button>
      </div>

      {/* 결과 */}
      <div className="bg-[#080808] border border-[#1a1a1a] p-6 font-mono">
        <div className="text-xs text-[#00FF88] mb-6">{">"} 결과</div>

        {results === null ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-700">
            <div className="text-4xl mb-3 opacity-20">◈</div>
            <div className="text-xs">조건을 입력하고 실행 버튼을 눌러주세요</div>
          </div>
        ) : isRunning ? (
          <div className="flex flex-col items-center justify-center h-48">
            <div className="text-[#00FF88] text-xs animate-pulse">
              {">"} 7개 도시 분석 중...
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((city, i) => (
              <div
                key={city.name}
                className="flex items-center justify-between border border-[#1a1a1a] p-4 hover:border-[#333] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#00FF88] text-lg font-bold">✓</span>
                  <div>
                    <div className="text-xs text-[#00FF88]">#{i + 1}</div>
                    <div className="text-sm text-white font-bold">{city.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#00E5FF] text-sm">{formatKRWShort(city.cost)}/월</div>
                  <div className="text-gray-500 text-xs">{city.score}점</div>
                </div>
              </div>
            ))}
            <p className="text-gray-600 text-xs mt-4">
              * 입력 조건 기반 추천. 실제 비용은 다를 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
