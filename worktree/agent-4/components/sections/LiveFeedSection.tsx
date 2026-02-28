import { TRAVELING_NOMADS, MEETUPS, REVIEWS } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="font-mono text-xs">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "star-filled" : "star-empty"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function LiveFeedSection() {
  return (
    <section id="live-feed" className="py-16 border-b border-[#1a1a1a]">
      <div className="mx-auto max-w-7xl px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="font-mono text-xs text-[#00FF88] mb-2 tracking-widest">
            // 06 LIVE_FEED
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-white">
            라이브 피드
          </h2>
          <p className="text-gray-500 text-sm mt-1">지금 이 순간 노마드들의 이야기</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* 패널 1: 지금 여행 중 */}
          <Card className="bg-[#0f0f0f] border-[#222] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a]">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="font-mono text-xs font-bold text-[#00FF88]">🛩 지금 여행 중</span>
              <span className="font-mono text-xs text-gray-600 ml-auto">{TRAVELING_NOMADS.length}명</span>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {TRAVELING_NOMADS.map((nomad) => (
                <div
                  key={nomad.handle}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#141414] transition-colors"
                >
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback className="bg-[#1a1a1a] text-[#00FF88] font-mono text-xs">
                      {nomad.avatarText}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-white truncate">{nomad.handle}</div>
                    <div className="font-mono text-[10px] text-gray-500">{nomad.job}</div>
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] border-[#333] text-[#00E5FF] whitespace-nowrap"
                  >
                    {nomad.cityName}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* 패널 2: 다가오는 밋업 */}
          <Card className="bg-[#0f0f0f] border-[#222] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a]">
              <span className="font-mono text-xs font-bold text-[#00E5FF]">🥥 다가오는 밋업</span>
              <span className="font-mono text-xs text-gray-600 ml-auto">{MEETUPS.length}건</span>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {MEETUPS.map((meetup, i) => (
                <div key={i} className="px-4 py-4 hover:bg-[#141414] transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="font-mono text-[10px] text-[#00FF88] mb-1">
                        {meetup.dayOfWeek} {meetup.date} · {meetup.cityName}
                      </div>
                      <div className="font-mono text-xs text-white">{meetup.title}</div>
                      <div className="font-mono text-[10px] text-gray-600 mt-0.5">{meetup.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-gray-500">
                      👥 {meetup.attendees}명 참가
                    </span>
                    <Button
                      size="sm"
                      className="font-mono text-[10px] h-6 px-3 bg-transparent border border-[#00E5FF] text-[#00E5FF] hover:bg-[rgba(0,229,255,0.1)]"
                    >
                      RSVP →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 패널 3: 최신 리뷰 */}
          <Card className="bg-[#0f0f0f] border-[#222] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a]">
              <span className="font-mono text-xs font-bold text-gray-300">✍ 최신 리뷰</span>
              <span className="font-mono text-xs text-gray-600 ml-auto">460건/월</span>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {REVIEWS.map((review, i) => (
                <div key={i} className="px-4 py-4 hover:bg-[#141414] transition-colors">
                  <StarDisplay rating={review.rating} />
                  <p className="font-mono text-xs text-gray-300 mt-2 leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-[10px] text-gray-600">{review.handle}</span>
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] border-[#333] text-gray-500"
                    >
                      {review.cityName}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
