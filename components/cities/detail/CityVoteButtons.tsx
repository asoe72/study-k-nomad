"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface CityVoteButtonsProps {
  cityId: string;
  initialLikes: number;
  initialDislikes: number;
}

export default function CityVoteButtons({
  initialLikes,
  initialDislikes,
}: CityVoteButtonsProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
      if (disliked) {
        setDisliked(false);
        setDislikes((prev) => prev - 1);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikes((prev) => prev - 1);
    } else {
      setDisliked(true);
      setDislikes((prev) => prev + 1);
      if (liked) {
        setLiked(false);
        setLikes((prev) => prev - 1);
      }
    }
  };

  return (
    <section className="border border-[#222] bg-[#0f0f0f]">
      {/* 터미널 헤더 */}
      <div className="px-5 py-2 border-b border-[#1a1a1a]">
        <span className="font-mono text-xs text-[#00FF88]">{"// VOTE"}</span>
      </div>

      <div className="p-5 flex gap-3">
        <button
          onClick={handleLike}
          className={`flex-1 font-mono text-sm border py-3 transition-all flex items-center justify-center gap-2 ${
            liked
              ? "border-[#00FF88] text-[#00FF88] bg-[rgba(0,255,136,0.05)]"
              : "border-[#333] text-gray-400 hover:border-[#00FF88] hover:text-[#00FF88]"
          }`}
        >
          <ThumbsUp size={16} />
          <span>{likes}</span>
        </button>
        <button
          onClick={handleDislike}
          className={`flex-1 font-mono text-sm border py-3 transition-all flex items-center justify-center gap-2 ${
            disliked
              ? "border-red-500 text-red-400 bg-[rgba(239,68,68,0.05)]"
              : "border-[#333] text-gray-400 hover:border-red-500 hover:text-red-400"
          }`}
        >
          <ThumbsDown size={16} />
          <span>{dislikes}</span>
        </button>
      </div>
    </section>
  );
}
