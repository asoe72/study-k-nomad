import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CityReviewsSection from "@/components/cities/detail/CityReviewsSection";

const MOCK_REVIEWS = vi.hoisted(() => [
  { handle: "@user1", rating: 5, text: "최고의 도시!", cityName: "제주시", cityId: "jeju" },
  { handle: "@user2", rating: 4, text: "좋아요", cityName: "제주시", cityId: "jeju" },
  { handle: "@user3", rating: 3, text: "부산 괜찮아요", cityName: "부산", cityId: "busan" },
]);

vi.mock("@/lib/data", () => ({
  REVIEWS: MOCK_REVIEWS,
}));

vi.mock("@/components/modals/ReviewModal", () => ({
  default: ({ cityId, onClose }: { cityId: string | null; onClose: () => void }) => (
    <div data-testid="review-modal" data-city-id={cityId} onClick={onClose}>
      MockReviewModal
    </div>
  ),
}));

describe("CityReviewsSection", () => {
  describe("리뷰 필터링 및 표시", () => {
    it("해당 도시의 리뷰만 필터링하여 표시한다", () => {
      render(<CityReviewsSection cityId="jeju" />);

      expect(screen.getByText("최고의 도시!")).toBeInTheDocument();
      expect(screen.getByText("좋아요")).toBeInTheDocument();
      expect(screen.queryByText("부산 괜찮아요")).not.toBeInTheDocument();
    });

    it("리뷰 개수가 헤더에 올바르게 표시된다", () => {
      render(<CityReviewsSection cityId="jeju" />);

      expect(screen.getByText("// REVIEWS (2)")).toBeInTheDocument();
    });

    it("리뷰가 1개인 도시의 리뷰 개수가 올바르게 표시된다", () => {
      render(<CityReviewsSection cityId="busan" />);

      expect(screen.getByText("// REVIEWS (1)")).toBeInTheDocument();
      expect(screen.getByText("부산 괜찮아요")).toBeInTheDocument();
    });
  });

  describe("리뷰가 없는 도시", () => {
    it('리뷰가 없으면 "[ NO REVIEWS YET ]"이 표시된다', () => {
      render(<CityReviewsSection cityId="seoul" />);

      expect(screen.getByText("[ NO REVIEWS YET ]")).toBeInTheDocument();
      expect(screen.getByText("첫 번째 리뷰를 작성해보세요")).toBeInTheDocument();
    });

    it("리뷰가 없으면 헤더에 개수가 0으로 표시된다", () => {
      render(<CityReviewsSection cityId="seoul" />);

      expect(screen.getByText("// REVIEWS (0)")).toBeInTheDocument();
    });
  });

  describe("StarDisplay", () => {
    it("rating 5인 리뷰는 별 5개 모두 활성화 색상으로 렌더링된다", () => {
      render(<CityReviewsSection cityId="jeju" />);

      // @user1의 rating은 5 - 모든 별이 활성화 색상(text-[#00FF88])이어야 함
      const allStars = screen.getAllByText("★");
      // jeju 리뷰 2개 (rating 5, rating 4) = 별 10개
      expect(allStars).toHaveLength(10);

      // 첫 번째 리뷰 (rating 5): 별 5개 모두 활성화
      for (let i = 0; i < 5; i++) {
        expect(allStars[i]).toHaveClass("text-[#00FF88]");
      }
    });

    it("rating 4인 리뷰는 별 4개만 활성화 색상으로 렌더링된다", () => {
      render(<CityReviewsSection cityId="jeju" />);

      const allStars = screen.getAllByText("★");

      // 두 번째 리뷰 (rating 4): 별 4개 활성화, 1개 비활성화
      for (let i = 5; i < 9; i++) {
        expect(allStars[i]).toHaveClass("text-[#00FF88]");
      }
      expect(allStars[9]).toHaveClass("text-[#333]");
    });

    it("rating 3인 리뷰는 별 3개만 활성화 색상으로 렌더링된다", () => {
      render(<CityReviewsSection cityId="busan" />);

      const allStars = screen.getAllByText("★");
      expect(allStars).toHaveLength(5);

      for (let i = 0; i < 3; i++) {
        expect(allStars[i]).toHaveClass("text-[#00FF88]");
      }
      for (let i = 3; i < 5; i++) {
        expect(allStars[i]).toHaveClass("text-[#333]");
      }
    });
  });

  describe("리뷰 정보 표시", () => {
    it("리뷰 핸들(@user)이 표시된다", () => {
      render(<CityReviewsSection cityId="jeju" />);

      expect(screen.getByText("@user1")).toBeInTheDocument();
      expect(screen.getByText("@user2")).toBeInTheDocument();
    });

    it("리뷰 텍스트가 표시된다", () => {
      render(<CityReviewsSection cityId="jeju" />);

      expect(screen.getByText("최고의 도시!")).toBeInTheDocument();
      expect(screen.getByText("좋아요")).toBeInTheDocument();
    });
  });

  describe("리뷰 작성 버튼 및 모달", () => {
    it('"리뷰 작성" 버튼이 존재한다', () => {
      render(<CityReviewsSection cityId="jeju" />);

      const button = screen.getByRole("button", { name: /리뷰 작성/ });
      expect(button).toBeInTheDocument();
    });

    it("리뷰 작성 버튼 클릭 전에는 ReviewModal에 cityId가 null로 전달된다", () => {
      render(<CityReviewsSection cityId="jeju" />);

      const modal = screen.getByTestId("review-modal");
      expect(modal).not.toHaveAttribute("data-city-id");
    });

    it("리뷰 작성 버튼 클릭 시 ReviewModal에 cityId가 전달된다", () => {
      render(<CityReviewsSection cityId="jeju" />);

      const button = screen.getByRole("button", { name: /리뷰 작성/ });
      fireEvent.click(button);

      const modal = screen.getByTestId("review-modal");
      expect(modal).toHaveAttribute("data-city-id", "jeju");
    });
  });
});
