import { CityMetrics, metricToBlocks } from "@/lib/data";

interface CityMetricsSectionProps {
  metrics: CityMetrics;
}

const METRIC_LABELS: { key: keyof CityMetrics; label: string; icon: string }[] = [
  { key: "internet", label: "인터넷", icon: "📡" },
  { key: "cafe", label: "카페", icon: "☕" },
  { key: "transport", label: "교통", icon: "🚇" },
  { key: "nature", label: "자연", icon: "🌿" },
  { key: "nomadFriendly", label: "노마드친화도", icon: "💻" },
];

export default function CityMetricsSection({ metrics }: CityMetricsSectionProps) {
  return (
    <section className="border border-[#222] bg-[#0f0f0f]">
      {/* 터미널 헤더 */}
      <div className="px-5 py-2 border-b border-[#1a1a1a]">
        <span className="font-mono text-xs text-[#00FF88]">{"// METRICS"}</span>
      </div>

      <div className="p-5 space-y-3">
        {METRIC_LABELS.map(({ key, label, icon }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="text-sm">{icon}</span>
            <span className="font-mono text-xs text-gray-500 w-24 shrink-0">
              {label}
            </span>
            <span className="font-mono text-sm text-[#00E5FF] tracking-wider flex-1">
              {metricToBlocks(metrics[key])}
            </span>
            <span className="font-mono text-sm font-bold text-white w-8 text-right">
              {metrics[key]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
