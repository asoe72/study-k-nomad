import { BUDGETS, REGIONS, ENVIRONMENTS, SEASONS, Budget, Region, Environment, Season } from "@/lib/data";

export type FilterValues = {
  budget: Budget | "전체";
  region: Region | "전체";
  environment: Environment | "전체";
  season: Season | "전체";
};

const FILTER_CATEGORIES = [
  { key: "budget", label: "예산", options: ["전체", ...BUDGETS] },
  { key: "region", label: "지역", options: ["전체", ...REGIONS] },
  { key: "environment", label: "환경", options: ["전체", ...ENVIRONMENTS] },
  { key: "season", label: "최고 계절", options: ["전체", ...SEASONS] },
] as const;

interface FilterBarProps {
  values: FilterValues;
  onChange: (key: keyof FilterValues, value: string) => void;
}

export default function FilterBar({ values, onChange }: FilterBarProps) {
  return (
    <div className="space-y-3 mb-6">
      {FILTER_CATEGORIES.map((category) => (
        <div key={category.key} className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs text-gray-500 w-16 shrink-0">{category.label}</span>
          {category.options.map((option) => {
            const isActive = values[category.key] === option;
            return (
              <button
                key={option}
                onClick={() => onChange(category.key, option)}
                className={`font-mono text-xs border px-3 py-1 transition-all ${
                  isActive
                    ? "border-[#00FF88] text-[#00FF88] bg-[#00FF88]/10"
                    : "border-[#333] text-gray-400 hover:border-gray-400"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
