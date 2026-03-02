import { notFound } from "next/navigation";
import Link from "next/link";
import { CITIES } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CityDetailHero from "@/components/cities/detail/CityDetailHero";
import CityMetricsSection from "@/components/cities/detail/CityMetricsSection";
import CityInfoSection from "@/components/cities/detail/CityInfoSection";
import CityVoteButtons from "@/components/cities/detail/CityVoteButtons";
import CityReviewsSection from "@/components/cities/detail/CityReviewsSection";

interface CityDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CityDetailPage({ params }: CityDetailPageProps) {
  const { id } = await params;
  const city = CITIES.find((c) => c.id === id);

  if (!city) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-8">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-[#00FF88] transition-colors mb-6"
        >
          <span>&larr;</span>
          <span>BACK_TO_HOME</span>
        </Link>

        <div className="space-y-4">
          {/* 히어로: ASCII 아트 + 도시 기본 정보 */}
          <CityDetailHero city={city} />

          {/* 지표 차트 */}
          <CityMetricsSection metrics={city.metrics} />

          {/* 도시 상세 정보 */}
          <CityInfoSection city={city} />

          {/* 좋아요/싫어요 */}
          <CityVoteButtons
            cityId={city.id}
            initialLikes={city.likes}
            initialDislikes={city.dislikes}
          />

          {/* 리뷰 */}
          <CityReviewsSection cityId={city.id} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
