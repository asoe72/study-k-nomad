import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CityCard from "@/components/cities/CityCard";
import { CITIES } from "@/lib/data";

// CITIES[0] = 제주시 데이터를 사용
const jeju = CITIES[0];

const defaultProps = {
  city: jeju,
  rank: 1,
  liked: false,
  disliked: false,
  likes: jeju.likes,
  dislikes: jeju.dislikes,
  onLike: vi.fn(),
  onDislike: vi.fn(),
  onReview: vi.fn(),
};

// CityAsciiArt 내부의 ascii-art 모듈을 mock (jsdom에서 문제 없이 렌더링)
vi.mock("@/lib/ascii-art", () => ({
  CITY_ASCII: {},
}));

describe("CityCard (제주시 데이터 기반)", () => {
  describe("기본 정보 렌더링", () => {
    it("도시명 '제주시'가 표시된다", () => {
      render(<CityCard {...defaultProps} />);
      expect(screen.getByText("제주시")).toBeInTheDocument();
    });

    it("영문명 'JEJU'가 표시된다", () => {
      render(<CityCard {...defaultProps} />);
      expect(screen.getByText(/JEJU/)).toBeInTheDocument();
    });

    it("likes 숫자(128)가 표시된다", () => {
      render(<CityCard {...defaultProps} likes={128} />);
      expect(screen.getByText("128")).toBeInTheDocument();
    });

    it("dislikes 숫자(12)가 표시된다", () => {
      render(<CityCard {...defaultProps} dislikes={12} />);
      expect(screen.getByText("12")).toBeInTheDocument();
    });
  });

  describe("liked 상태 스타일", () => {
    it("liked=true일 때 좋아요 버튼에 border-[#00FF88] 클래스가 적용된다", () => {
      render(<CityCard {...defaultProps} liked={true} />);
      const buttons = screen.getAllByRole("button");
      // 첫 번째 버튼이 좋아요 버튼
      const likeButton = buttons[0];
      expect(likeButton.className).toContain("border-[#00FF88]");
    });

    it("liked=false일 때 좋아요 버튼에 border-[#00FF88] 클래스가 없다", () => {
      render(<CityCard {...defaultProps} liked={false} />);
      const buttons = screen.getAllByRole("button");
      const likeButton = buttons[0];
      // 공백으로 split하여 hover: 접두사 없는 정확한 클래스만 확인
      const classes = likeButton.className.split(/\s+/);
      expect(classes).not.toContain("border-[#00FF88]");
    });
  });

  describe("disliked 상태 스타일", () => {
    it("disliked=true일 때 싫어요 버튼에 border-red-500 클래스가 적용된다", () => {
      render(<CityCard {...defaultProps} disliked={true} />);
      const buttons = screen.getAllByRole("button");
      // 두 번째 버튼이 싫어요 버튼
      const dislikeButton = buttons[1];
      expect(dislikeButton.className).toContain("border-red-500");
    });

    it("disliked=false일 때 싫어요 버튼에 border-red-500 클래스가 없다", () => {
      render(<CityCard {...defaultProps} disliked={false} />);
      const buttons = screen.getAllByRole("button");
      const dislikeButton = buttons[1];
      const classes = dislikeButton.className.split(/\s+/);
      expect(classes).not.toContain("border-red-500");
    });
  });

  describe("액션 버튼 클릭 콜백", () => {
    it("좋아요 버튼 클릭 시 onLike('jeju')가 호출된다", async () => {
      const onLike = vi.fn();
      render(<CityCard {...defaultProps} onLike={onLike} />);
      const user = userEvent.setup();

      const buttons = screen.getAllByRole("button");
      await user.click(buttons[0]);
      expect(onLike).toHaveBeenCalledWith("jeju");
    });

    it("싫어요 버튼 클릭 시 onDislike('jeju')가 호출된다", async () => {
      const onDislike = vi.fn();
      render(<CityCard {...defaultProps} onDislike={onDislike} />);
      const user = userEvent.setup();

      const buttons = screen.getAllByRole("button");
      await user.click(buttons[1]);
      expect(onDislike).toHaveBeenCalledWith("jeju");
    });

    it("리뷰 버튼 클릭 시 onReview('jeju')가 호출된다", async () => {
      const onReview = vi.fn();
      render(<CityCard {...defaultProps} onReview={onReview} />);
      const user = userEvent.setup();

      const reviewButton = screen.getByRole("button", { name: /리뷰/ });
      await user.click(reviewButton);
      expect(onReview).toHaveBeenCalledWith("jeju");
    });

    it("onReview가 없어도 리뷰 버튼 클릭 시 에러가 발생하지 않는다", async () => {
      render(<CityCard {...defaultProps} onReview={undefined} />);
      const user = userEvent.setup();

      const reviewButton = screen.getByRole("button", { name: /리뷰/ });
      await expect(user.click(reviewButton)).resolves.not.toThrow();
    });
  });
});
