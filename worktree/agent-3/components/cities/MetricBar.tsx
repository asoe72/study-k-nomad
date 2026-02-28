import { metricToBlocks } from "@/lib/data";

interface MetricBarProps {
  icon: string;
  label: string;
  value: number;
  displayValue: string;
}

export default function MetricBar({ icon, label, value, displayValue }: MetricBarProps) {
  const blocks = metricToBlocks(value);
  const filled = Math.floor(value);

  return (
    <div className="flex items-center gap-2 text-xs font-mono">
      <span className="w-4">{icon}</span>
      <span className="text-gray-500 w-10 shrink-0">{label}</span>
      <span className="tracking-tight">
        {blocks.split("").map((char, i) => (
          <span
            key={i}
            className={i < filled ? "metric-bar-filled" : "metric-bar-empty"}
          >
            {char}
          </span>
        ))}
      </span>
      <span className="text-gray-400 ml-1">{displayValue}</span>
    </div>
  );
}
