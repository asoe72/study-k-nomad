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

type VoteState = { liked: boolean; disliked: boolean; likes: number; dislikes: number };
type VoteStateMap = Record<string, VoteState>;

const INITIAL_VOTE_STATES: VoteStateMap = Object.fromEntries(
  CITIES.map((c) => [c.id, { liked: false, disliked: false, likes: c.likes, dislikes: c.dislikes }])
);

export default function CitiesClient() {
  const [reviewCity, setReviewCity] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>(INITIAL_FILTERS);
  const [voteStates, setVoteStates] = useState<VoteStateMap>(INITIAL_VOTE_STATES);

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleLike = (cityId: string) => {
    setVoteStates((prev) => {
      const cur = prev[cityId];
      return cur.liked
        ? { ...prev, [cityId]: { ...cur, liked: false, likes: cur.likes - 1 } }
        : { ...prev, [cityId]: { ...cur, liked: true, disliked: false, likes: cur.likes + 1, dislikes: cur.disliked ? cur.dislikes - 1 : cur.dislikes } };
    });
  };

  const handleDislike = (cityId: string) => {
    setVoteStates((prev) => {
      const cur = prev[cityId];
      return cur.disliked
        ? { ...prev, [cityId]: { ...cur, disliked: false, dislikes: cur.dislikes - 1 } }
        : { ...prev, [cityId]: { ...cur, disliked: true, liked: false, dislikes: cur.dislikes + 1, likes: cur.liked ? cur.likes - 1 : cur.likes } };
    });
  };

  const filtered = CITIES.filter((city) => {
    if (filters.budget !== "전체" && city.budget !== filters.budget) return false;
    if (filters.region !== "전체" && city.region !== filters.region) return false;
    if (filters.environment !== "전체" && !city.environment.includes(filters.environment)) return false;
    if (filters.season !== "전체" && !city.season.includes(filters.season)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const likeDiff = voteStates[b.id].likes - voteStates[a.id].likes;
    return likeDiff !== 0 ? likeDiff : a.id.localeCompare(b.id);
  });

  return (
    <div>
      <FilterBar values={filters} onChange={handleFilterChange} />

      {/* 카드 그리드 (가로 스크롤) */}
      {sorted.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "thin" }}>
          {sorted.map((city, index) => (
            <CityCard
              key={city.id}
              city={city}
              rank={index + 1}
              liked={voteStates[city.id].liked}
              disliked={voteStates[city.id].disliked}
              likes={voteStates[city.id].likes}
              dislikes={voteStates[city.id].dislikes}
              onLike={handleLike}
              onDislike={handleDislike}
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
