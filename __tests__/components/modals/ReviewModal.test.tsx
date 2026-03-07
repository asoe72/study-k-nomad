import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReviewModal from "@/components/modals/ReviewModal";

// ── Mock 설정 ──────────────────────────────────────────────────────────
const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/app/actions/review", () => ({
  submitReview: vi.fn().mockResolvedValue(undefined),
}));

// ── Props 기본값 ──────────────────────────────────────────────────────
const defaultProps = {
  cityId: "jeju" as string | null,
  cityName: "제주시" as string | null,
  cityNameEn: "JEJU" as string | null,
  userId: "user-123" as string | null,
  onClose: vi.fn(),
};

// ── 테스트 ────────────────────────────────────────────────────────────
describe("ReviewModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("cityId=null 케이스", () => {
    it("cityId=null이면 아무것도 렌더링되지 않는다 (null 반환)", () => {
      const { container } = render(
        <ReviewModal {...defaultProps} cityId={null} cityName={null} />
      );
      // null 반환 시 컨테이너가 비어있어야 함
      expect(container.firstChild).toBeNull();
    });
  });

  describe("cityId 있음 + 비로그인 케이스", () => {
    it("userId=null이면 로그인 유도 UI가 표시된다 ('로그인' 텍스트 포함)", () => {
      render(<ReviewModal {...defaultProps} userId={null} />);

      // 로그인 관련 텍스트가 1개 이상 존재 (본문 + 버튼 모두 포함)
      expect(screen.getAllByText(/로그인/).length).toBeGreaterThan(0);
    });

    it("'로그인하기' 버튼 클릭 시 router.push('/login')이 호출된다", async () => {
      const user = userEvent.setup();
      render(<ReviewModal {...defaultProps} userId={null} />);

      const loginBtn = screen.getByRole("button", { name: /로그인하기/ });
      await user.click(loginBtn);

      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  describe("cityId 있음 + 로그인 케이스", () => {
    it("userId가 있으면 별점 입력 폼이 표시된다 (카테고리명 확인)", () => {
      render(<ReviewModal {...defaultProps} />);

      // REVIEW_CATEGORIES의 label 확인
      expect(screen.getByText("인터넷 속도")).toBeInTheDocument();
      expect(screen.getByText("카페·코워킹")).toBeInTheDocument();
      expect(screen.getByText("생활비 만족도")).toBeInTheDocument();
    });

    it("모든 별점이 0이면 제출 버튼이 disabled 상태이다", () => {
      render(<ReviewModal {...defaultProps} />);

      const submitBtn = screen.getByRole("button", { name: /SUBMIT_REVIEW/ });
      expect(submitBtn).toBeDisabled();
    });

    it("별점 1개 이상 입력하면 제출 버튼이 활성화된다", async () => {
      const user = userEvent.setup();
      render(<ReviewModal {...defaultProps} />);

      // 첫 번째 카테고리(인터넷 속도)의 별점 버튼들 중 첫 번째(★1) 클릭
      const starButtons = screen.getAllByRole("button", { name: "★" });
      // 각 카테고리별로 5개 별점 버튼이 있음 (3 * 5 = 15개)
      // 첫 번째 카테고리의 첫 번째 별(인터넷 속도 1점) 클릭
      await user.click(starButtons[0]);

      const submitBtn = screen.getByRole("button", { name: /SUBMIT_REVIEW/ });
      expect(submitBtn).not.toBeDisabled();
    });

    it("제출 버튼 클릭 시 submitReview(cityId, ratings, text)가 호출된다", async () => {
      const { submitReview } = await import("@/app/actions/review");
      const user = userEvent.setup();
      render(<ReviewModal {...defaultProps} />);

      // 별점 입력 (인터넷 속도 3점, 나머지는 0)
      const starButtons = screen.getAllByRole("button", { name: "★" });
      // 첫 번째 카테고리(internet)의 3번째 별 클릭 (0-based index: 2)
      await user.click(starButtons[2]);

      const submitBtn = screen.getByRole("button", { name: /SUBMIT_REVIEW/ });

      await act(async () => {
        await user.click(submitBtn);
      });

      expect(submitReview).toHaveBeenCalledWith(
        "jeju",
        expect.objectContaining({ internet: 3 }),
        expect.any(String)
      );
    });
  });
});
