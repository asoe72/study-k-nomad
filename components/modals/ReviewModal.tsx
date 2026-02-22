"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CITIES } from "@/lib/data";

interface ReviewModalProps {
  cityId: string | null;
  onClose: () => void;
}

const REVIEW_CATEGORIES = [
  { key: "internet", icon: "📡", label: "인터넷 속도" },
  { key: "cafe", icon: "☕", label: "카페·코워킹" },
  { key: "cost", icon: "💵", label: "생활비 만족도" },
];

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
          className={`text-lg transition-colors ${
            star <= (hover || value) ? "text-[#00FF88]" : "text-[#333]"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewModal({ cityId, onClose }: ReviewModalProps) {
  const city = CITIES.find((c) => c.id === cityId);
  const [ratings, setRatings] = useState<Record<string, number>>({
    internet: 0,
    cafe: 0,
    cost: 0,
  });
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setRatings({ internet: 0, cafe: 0, cost: 0 });
      setText("");
    }, 1500);
  };

  if (!city) return null;

  return (
    <Dialog open={!!cityId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#0f0f0f] border border-[#333] max-w-md font-mono p-0">
        {/* 헤더 */}
        <DialogHeader className="p-5 pb-0">
          <div className="text-xs text-[#00FF88] mb-1">// WRITE_REVIEW</div>
          <DialogTitle className="text-white font-mono text-lg font-bold">
            {city.name}
            <span className="text-gray-500 text-sm ml-2 font-normal">
              {city.nameEn}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="p-5 space-y-5">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">✓</div>
              <div className="text-[#00FF88] font-bold">REVIEW SUBMITTED</div>
              <div className="text-gray-500 text-xs mt-1">감사합니다!</div>
            </div>
          ) : (
            <>
              {/* 별점 */}
              {REVIEW_CATEGORIES.map((cat) => (
                <div
                  key={cat.key}
                  className="flex items-center justify-between border-b border-[#1a1a1a] pb-3"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </div>
                  <StarRating
                    value={ratings[cat.key]}
                    onChange={(v) => setRatings((r) => ({ ...r, [cat.key]: v }))}
                  />
                </div>
              ))}

              {/* 텍스트 입력 */}
              <div>
                <div className="text-xs text-gray-500 mb-2">✍ 한 줄 리뷰 (선택, 최대 200자)</div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 200))}
                  placeholder="예: 제주 카페 와이파이 진짜 빠름..."
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-[#333] text-gray-300 text-sm p-3 resize-none outline-none focus:border-[#00FF88] transition-colors placeholder:text-gray-700 font-mono"
                />
                <div className="text-right text-xs text-gray-600 mt-1">
                  {text.length}/200
                </div>
              </div>

              {/* 제출 버튼 */}
              <Button
                onClick={handleSubmit}
                disabled={Object.values(ratings).every((v) => v === 0)}
                className="w-full font-mono text-sm bg-[#00FF88] text-[#080808] hover:bg-[#00cc6e] font-bold disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ▶▶ SUBMIT_REVIEW
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
