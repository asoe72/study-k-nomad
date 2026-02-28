"use client";

import { useState } from "react";
import { CITIES, getFilteredCities } from "@/lib/data";
import CityCard from "./CityCard";
import ReviewModal from "@/components/modals/ReviewModal";

const FILTERS = ["all", "수도권", "제주", "바다", "산·자연", "저비용"] as const;

const FILTER_LABELS: Record<string, string> = {
  all: "전체",
  수도권: "수도권",
  제주: "제주",
  바다: "바다",
  "산·자연": "산·자연",
  저비용: "저비용",
};

export default function CitiesClient() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [reviewCity, setReviewCity] = useState<string | null>(null);

  const filtered = getFilteredCities(activeFilter);

  return (
    <div>
      {/* 필터 버튼 */}
      <div className="flex gap-2 flex-wrap mb-6">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`font-mono text-xs px-4 py-2 border transition-all ${
              activeFilter === filter
                ? "border-[#00FF88] text-[#00FF88] bg-[rgba(0,255,136,0.1)]"
                : "border-[#333] text-gray-500 hover:border-[#555] hover:text-gray-400"
            }`}
          >
            {FILTER_LABELS[filter]}
          </button>
        ))}
      </div>

      {/* 카드 그리드 (가로 스크롤) */}
      <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "thin" }}>
        {filtered.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            onReview={(id) => setReviewCity(id)}
          />
        ))}
      </div>

      {/* 결과 없음 */}
      {filtered.length === 0 && (
        <div className="text-center py-16 font-mono text-gray-600">
          <div className="text-2xl mb-2">░░░</div>
          <div>해당 조건의 도시가 없습니다.</div>
        </div>
      )}

      {/* 리뷰 모달 */}
      <ReviewModal
        cityId={reviewCity}
        onClose={() => setReviewCity(null)}
      />
    </div>
  );
}
