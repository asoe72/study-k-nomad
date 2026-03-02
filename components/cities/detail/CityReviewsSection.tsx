"use client";

import { useState } from "react";
import { REVIEWS } from "@/lib/data";
import ReviewModal from "@/components/modals/ReviewModal";

interface CityReviewsSectionProps {
  cityId: string;
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="font-mono text-sm">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rating ? "text-[#00FF88]" : "text-[#333]"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function CityReviewsSection({ cityId }: CityReviewsSectionProps) {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const cityReviews = REVIEWS.filter((r) => r.cityId === cityId);

  return (
    <section className="border border-[#222] bg-[#0f0f0f]">
      {/* 터미널 헤더 */}
      <div className="px-5 py-2 border-b border-[#1a1a1a] flex items-center justify-between">
        <span className="font-mono text-xs text-[#00FF88]">
          {"// REVIEWS ("}{cityReviews.length}{")"}
        </span>
        <button
          onClick={() => setReviewModalOpen(true)}
          className="font-mono text-xs border border-[#333] text-gray-400 hover:border-[#00E5FF] hover:text-[#00E5FF] px-3 py-1 transition-all"
        >
          ✎ 리뷰 작성
        </button>
      </div>

      <div className="p-5">
        {cityReviews.length > 0 ? (
          <div className="space-y-4">
            {cityReviews.map((review, index) => (
              <div
                key={index}
                className="border-b border-[#1a1a1a] pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-3 mb-2">
                  <StarDisplay rating={review.rating} />
                  <span className="font-mono text-xs text-[#00E5FF]">
                    {review.handle}
                  </span>
                </div>
                <p className="font-mono text-sm text-gray-300 leading-relaxed">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="font-mono text-sm text-gray-600">
              [ NO REVIEWS YET ]
            </p>
            <p className="font-mono text-xs text-gray-700 mt-1">
              첫 번째 리뷰를 작성해보세요
            </p>
          </div>
        )}
      </div>

      {/* 리뷰 모달 */}
      <ReviewModal
        cityId={reviewModalOpen ? cityId : null}
        onClose={() => setReviewModalOpen(false)}
      />
    </section>
  );
}
