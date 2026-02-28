"use client";

import { useState } from "react";
import { CITIES } from "@/lib/data";
import CityCard from "./CityCard";
import ReviewModal from "@/components/modals/ReviewModal";

export default function CitiesClient() {
  const [reviewCity, setReviewCity] = useState<string | null>(null);

  const filtered = CITIES;

  return (
    <div>
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

      {/* 리뷰 모달 */}
      <ReviewModal
        cityId={reviewCity}
        onClose={() => setReviewCity(null)}
      />
    </div>
  );
}
