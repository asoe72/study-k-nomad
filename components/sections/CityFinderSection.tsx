import CityFinderForm from "@/components/finder/CityFinderForm";

export default function CityFinderSection() {
  return (
    <section id="finder" className="py-16 border-b border-[#1a1a1a]">
      <div className="mx-auto max-w-7xl px-4">
        {/* 헤더 */}
        <div className="mb-10 text-center">
          <div className="font-mono text-xs text-[#00FF88] mb-2 tracking-widest">
            // 08 CITY_FINDER
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-white">
            내 도시 찾기
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            수입과 선호 조건을 입력하면 맞춤 도시를 추천해드립니다
          </p>
        </div>

        <CityFinderForm />
      </div>
    </section>
  );
}
