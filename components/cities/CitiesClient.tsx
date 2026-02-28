"use client";

import { useState } from "react";
import { CITIES } from "@/lib/data";
import CityCard from "./CityCard";
import ReviewModal from "@/components/modals/ReviewModal";
import FilterBar, { FilterValues } from "./FilterBar";

const INITIAL_FILTERS: FilterValues = {
  budget: "전체",
  region: "전체",
  environment: "전체",
  season: "전체",
};

export default function CitiesClient() {
  const [reviewCity, setReviewCity] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>(INITIAL_FILTERS);

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filtered = CITIES.filter((city) => {
    if (filters.budget !== "전체" && city.budget !== filters.budget) return false;
    if (filters.region !== "전체" && city.region !== filters.region) return false;
    if (filters.environment !== "전체" && !city.environment.includes(filters.environment)) return false;
    if (filters.season !== "전체" && !city.season.includes(filters.season)) return false;
    return true;
  });

  return (
    <div>
      <FilterBar values={filters} onChange={handleFilterChange} />

      {/* 카드 그리드 (가로 스크롤) */}
      {filtered.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "thin" }}>
          {filtered.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              onReview={(id) => setReviewCity(id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="font-mono text-2xl text-gray-600 mb-2">[ NO RESULTS ]</p>
          <p className="font-mono text-sm text-gray-500">선택한 조건에 맞는 도시가 없습니다.</p>
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
