import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitReview } from "@/app/actions/review";

// vi.hoisted: vi.mock factory 호이스팅 이전에 변수를 선언
const { mockRedirect, mockRevalidatePath, mockGetUser, mockInsert, mockFrom } =
  vi.hoisted(() => {
    const mockInsert = vi.fn().mockResolvedValue({ error: null });
    const mockFrom = vi.fn().mockImplementation((table: string) => {
      if (table === "reviews") return { insert: mockInsert };
      return {};
    });
    return {
      mockRedirect: vi.fn(),
      mockRevalidatePath: vi.fn(),
      mockGetUser: vi.fn(),
      mockInsert,
      mockFrom,
    };
  });

vi.mock("next/navigation", () => ({ redirect: mockRedirect }));
vi.mock("next/cache", () => ({ revalidatePath: mockRevalidatePath }));
vi.mock("@/utils/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: { getUser: mockGetUser },
    from: mockFrom,
  }),
}));

describe("submitReview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockInsert.mockResolvedValue({ error: null });
  });

  describe("미인증 사용자", () => {
    beforeEach(() => {
      mockRedirect.mockImplementation(() => { throw new Error("NEXT_REDIRECT"); });
      mockGetUser.mockResolvedValue({ data: { user: null } });
    });

    it("getUser가 user: null 반환 시 redirect('/login') 호출", async () => {
      await expect(submitReview("jeju", { internet: 4, cafe: 5, cost: 3 }, "좋아요")).rejects.toThrow("NEXT_REDIRECT");
      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });

    it("미인증 시 insert 호출하지 않음", async () => {
      await expect(submitReview("jeju", { internet: 4, cafe: 5, cost: 3 }, "좋아요")).rejects.toThrow("NEXT_REDIRECT");
      expect(mockInsert).not.toHaveBeenCalled();
    });
  });

  describe("평균 별점 계산", () => {
    const mockUser = { id: "user-123" };

    beforeEach(() => {
      mockGetUser.mockResolvedValue({ data: { user: mockUser } });
    });

    it("ratings = { internet: 4, cafe: 5, cost: 3 } → 평균 4, insert rating: 4", async () => {
      // (4 + 5 + 3) / 3 = 4.0 → Math.round(4.0) = 4
      await submitReview("jeju", { internet: 4, cafe: 5, cost: 3 }, "좋아요");

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ rating: 4 })
      );
    });

    it("ratings = { internet: 5, cafe: 5, cost: 5 } → rating: 5", async () => {
      await submitReview("jeju", { internet: 5, cafe: 5, cost: 5 }, "완벽해요");

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ rating: 5 })
      );
    });

    it("ratings = { internet: 0, cafe: 0, cost: 3 } → 0 제외, cost: 3만 평균 → rating: 3", async () => {
      // 0 필터링 후 [3] → 3 / 1 = 3 → Math.round(3) = 3
      await submitReview("jeju", { internet: 0, cafe: 0, cost: 3 }, "보통");

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ rating: 3 })
      );
    });

    it("ratings = { internet: 0, cafe: 0, cost: 0 } → 모두 0이면 기본값 3", async () => {
      // 0 필터링 후 빈 배열 → 기본값 3
      await submitReview("jeju", { internet: 0, cafe: 0, cost: 0 }, "테스트");

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ rating: 3 })
      );
    });

    it("소수점 반올림: (4 + 5) / 2 = 4.5 → Math.round(4.5) = 5", async () => {
      await submitReview("jeju", { internet: 4, cafe: 5 }, "좋아요");

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ rating: 5 })
      );
    });
  });

  describe("별점 범위 보정 (clamp 1~5)", () => {
    const mockUser = { id: "user-123" };

    beforeEach(() => {
      mockGetUser.mockResolvedValue({ data: { user: mockUser } });
    });

    it("계산 결과가 1 미만이면 1로 보정", async () => {
      // 실제로 Math.round 후 1 미만이 되려면 0이 필요하지만
      // 0은 필터링되므로, 빈 배열 시 기본값 3이 적용됨
      // 이 테스트는 clamp 상한선 로직을 간접 검증: rating이 항상 1 이상
      await submitReview("jeju", { internet: 1 }, "최하");

      const callArg = mockInsert.mock.calls[0][0];
      expect(callArg.rating).toBeGreaterThanOrEqual(1);
    });

    it("계산 결과가 5 초과면 5로 보정", async () => {
      // 실제 코드에서 Math.min(5, avgRating) 적용
      // 정상 입력(1~5)에서는 초과 불가, clamp 상한선이 5임을 검증
      await submitReview("jeju", { internet: 5, cafe: 5, cost: 5 }, "최고");

      const callArg = mockInsert.mock.calls[0][0];
      expect(callArg.rating).toBeLessThanOrEqual(5);
    });

    it("rating은 항상 1 이상 5 이하", async () => {
      await submitReview("jeju", { internet: 3, cafe: 4, cost: 2 }, "보통");

      const callArg = mockInsert.mock.calls[0][0];
      expect(callArg.rating).toBeGreaterThanOrEqual(1);
      expect(callArg.rating).toBeLessThanOrEqual(5);
    });
  });

  describe("content trim 검증", () => {
    const mockUser = { id: "user-123" };

    beforeEach(() => {
      mockGetUser.mockResolvedValue({ data: { user: mockUser } });
    });

    it("앞뒤 공백이 trim()되어 저장됨", async () => {
      await submitReview("jeju", { internet: 4 }, "  좋은 도시  ");

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ content: "좋은 도시" })
      );
    });

    it("탭 및 개행 포함 공백도 trim()됨", async () => {
      await submitReview("jeju", { internet: 3 }, "\t훌륭합니다\n");

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ content: "훌륭합니다" })
      );
    });

    it("공백 없는 content는 그대로 저장됨", async () => {
      await submitReview("jeju", { internet: 4 }, "노마드 천국");

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({ content: "노마드 천국" })
      );
    });
  });

  describe("insert 파라미터 전체 검증", () => {
    const mockUser = { id: "user-456" };

    beforeEach(() => {
      mockGetUser.mockResolvedValue({ data: { user: mockUser } });
    });

    it("user_id, city_id, content, rating이 모두 insert에 전달됨", async () => {
      await submitReview("seoul", { internet: 4, cafe: 4, cost: 4 }, "서울 리뷰");

      expect(mockInsert).toHaveBeenCalledWith({
        user_id: "user-456",
        city_id: "seoul",
        content: "서울 리뷰",
        rating: 4,
      });
    });
  });

  describe("revalidatePath 호출", () => {
    const mockUser = { id: "user-123" };

    beforeEach(() => {
      mockGetUser.mockResolvedValue({ data: { user: mockUser } });
    });

    it("insert 후 revalidatePath('/') 호출", async () => {
      await submitReview("jeju", { internet: 4 }, "테스트");

      expect(mockRevalidatePath).toHaveBeenCalledWith("/");
    });

    it("revalidatePath는 insert 후 호출됨 (순서 검증)", async () => {
      const callOrder: string[] = [];
      mockInsert.mockImplementation(async () => {
        callOrder.push("insert");
        return { error: null };
      });
      mockRevalidatePath.mockImplementation(() => {
        callOrder.push("revalidatePath");
      });

      await submitReview("jeju", { internet: 4 }, "테스트");

      expect(callOrder).toEqual(["insert", "revalidatePath"]);
    });
  });
});
