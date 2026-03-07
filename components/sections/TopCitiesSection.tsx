import CitiesClient from "@/components/cities/CitiesClient";
import { createClient } from "@/utils/supabase/server";
import { cityRowToCity } from "@/lib/database.types";
import type { CityRow, CityVoteCountRow } from "@/lib/database.types";
import type { City } from "@/lib/data";

export default async function TopCitiesSection() {
  const supabase = await createClient();

  // 도시 데이터 조회
  const { data: cityRows } = await supabase
    .from("cities")
    .select("*")
    .order("rank");

  // 투표 수 조회
  const { data: voteCounts } = await supabase
    .from("city_vote_counts")
    .select("*");

  // 투표 수 맵 생성
  const voteCountMap: Record<string, { likes: number; dislikes: number }> = {};
  (voteCounts as CityVoteCountRow[] | null)?.forEach((vc) => {
    voteCountMap[vc.city_id] = { likes: Number(vc.likes), dislikes: Number(vc.dislikes) };
  });

  // CityRow → City 변환
  const cities: City[] = (cityRows as CityRow[] | null)?.map((row) => {
    const counts = voteCountMap[row.id] ?? { likes: 0, dislikes: 0 };
    return cityRowToCity(row, counts.likes, counts.dislikes);
  }) ?? [];

  // 현재 사용자 투표 상태 조회
  const { data: { user } } = await supabase.auth.getUser();
  let userVotes: Record<string, "like" | "dislike"> = {};

  if (user) {
    const { data: votes } = await supabase
      .from("votes")
      .select("city_id, vote_type")
      .eq("user_id", user.id);

    votes?.forEach((v) => {
      userVotes[v.city_id] = v.vote_type as "like" | "dislike";
    });
  }

  return (
    <section id="cities" className="py-16 border-b border-[#1a1a1a]">
      <div className="mx-auto max-w-7xl px-4">
        {/* 섹션 헤더 */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="font-mono text-xs text-[#00FF88] mb-2 tracking-widest">
              {'// 04 CITIES'}
            </div>
            <h2 className="font-mono text-2xl md:text-3xl font-bold text-white">
              도시 리스트
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              7개 도시 · 좋아요 순 정렬
            </p>
          </div>
          <a
            href="#"
            className="font-mono text-xs text-gray-500 hover:text-[#00FF88] transition-colors"
          >
            전체보기 →
          </a>
        </div>

        {/* 도시 카드 (클라이언트 컴포넌트) */}
        <CitiesClient
          cities={cities}
          userVotes={userVotes}
          userId={user?.id ?? null}
        />
      </div>
    </section>
  );
}
