import { describe, it, expect, vi, beforeEach } from "vitest";
import { toggleVote } from "@/app/actions/vote";

// vi.hoisted: vi.mock factory 호이스팅 이전에 변수를 선언
const {
  mockRedirect,
  mockRevalidatePath,
  mockGetUser,
  mockMaybeSingle,
  mockDeleteEq,
  mockDelete,
  mockUpdateEq,
  mockUpdate,
  mockInsert,
  mockSelectEq2,
  mockSelectEq1,
  mockSelect,
  mockFrom,
} = vi.hoisted(() => {
  const mockMaybeSingle = vi.fn();
  const mockDeleteEq = vi.fn().mockResolvedValue({ error: null });
  const mockDelete = vi.fn().mockReturnValue({ eq: mockDeleteEq });
  const mockUpdateEq = vi.fn().mockResolvedValue({ error: null });
  const mockUpdate = vi.fn().mockReturnValue({ eq: mockUpdateEq });
  const mockInsert = vi.fn().mockResolvedValue({ error: null });
  const mockSelectEq2 = vi.fn().mockReturnValue({ maybeSingle: mockMaybeSingle });
  const mockSelectEq1 = vi.fn().mockReturnValue({ eq: mockSelectEq2 });
  const mockSelect = vi.fn().mockReturnValue({ eq: mockSelectEq1 });
  const mockFrom = vi.fn().mockImplementation((table: string) => {
    if (table === "votes") {
      return { select: mockSelect, delete: mockDelete, update: mockUpdate, insert: mockInsert };
    }
    return {};
  });
  return {
    mockRedirect: vi.fn(),
    mockRevalidatePath: vi.fn(),
    mockGetUser: vi.fn(),
    mockMaybeSingle,
    mockDeleteEq,
    mockDelete,
    mockUpdateEq,
    mockUpdate,
    mockInsert,
    mockSelectEq2,
    mockSelectEq1,
    mockSelect,
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

describe("toggleVote", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDelete.mockReturnValue({ eq: mockDeleteEq });
    mockUpdate.mockReturnValue({ eq: mockUpdateEq });
    mockInsert.mockResolvedValue({ error: null });
    mockDeleteEq.mockResolvedValue({ error: null });
    mockUpdateEq.mockResolvedValue({ error: null });
    mockSelect.mockReturnValue({ eq: mockSelectEq1 });
    mockSelectEq1.mockReturnValue({ eq: mockSelectEq2 });
    mockSelectEq2.mockReturnValue({ maybeSingle: mockMaybeSingle });
  });

  describe("미인증 사용자", () => {
    beforeEach(() => {
      // redirect()는 Next.js 내부에서 예외를 throw해 실행 중단 — mock도 동일하게 동작
      mockRedirect.mockImplementation(() => { throw new Error("NEXT_REDIRECT"); });
      mockGetUser.mockResolvedValue({ data: { user: null } });
    });

    it("getUser가 user: null 반환 시 redirect('/login') 호출", async () => {
      await expect(toggleVote("jeju", "like")).rejects.toThrow("NEXT_REDIRECT");
      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });

    it("미인증 시 DB 조회를 수행하지 않음", async () => {
      await expect(toggleVote("jeju", "like")).rejects.toThrow("NEXT_REDIRECT");
      expect(mockMaybeSingle).not.toHaveBeenCalled();
    });
  });

  describe("같은 타입 투표 존재 시 (취소)", () => {
    const mockUser = { id: "user-123" };

    beforeEach(() => {
      mockGetUser.mockResolvedValue({ data: { user: mockUser } });
      mockMaybeSingle.mockResolvedValue({
        data: { id: "vote-1", vote_type: "like" },
      });
    });

    it("toggleVote('jeju', 'like') 호출 시 delete().eq('id', 'vote-1') 호출", async () => {
      await toggleVote("jeju", "like");

      expect(mockDelete).toHaveBeenCalled();
      expect(mockDeleteEq).toHaveBeenCalledWith("id", "vote-1");
    });

    it("revalidatePath('/') 호출", async () => {
      await toggleVote("jeju", "like");

      expect(mockRevalidatePath).toHaveBeenCalledWith("/");
    });

    it("update는 호출되지 않음", async () => {
      await toggleVote("jeju", "like");

      expect(mockUpdate).not.toHaveBeenCalled();
    });
  });

  describe("다른 타입 투표 존재 시 (변경)", () => {
    const mockUser = { id: "user-123" };

    beforeEach(() => {
      mockGetUser.mockResolvedValue({ data: { user: mockUser } });
      mockMaybeSingle.mockResolvedValue({
        data: { id: "vote-1", vote_type: "dislike" },
      });
    });

    it("toggleVote('jeju', 'like') 호출 시 update({ vote_type: 'like' }).eq('id', 'vote-1') 호출", async () => {
      await toggleVote("jeju", "like");

      expect(mockUpdate).toHaveBeenCalledWith({ vote_type: "like" });
      expect(mockUpdateEq).toHaveBeenCalledWith("id", "vote-1");
    });

    it("delete는 호출되지 않음", async () => {
      await toggleVote("jeju", "like");

      expect(mockDelete).not.toHaveBeenCalled();
    });

    it("revalidatePath('/') 호출", async () => {
      await toggleVote("jeju", "like");

      expect(mockRevalidatePath).toHaveBeenCalledWith("/");
    });
  });

  describe("신규 투표 (기존 투표 없음)", () => {
    const mockUser = { id: "user-123" };

    beforeEach(() => {
      mockGetUser.mockResolvedValue({ data: { user: mockUser } });
      mockMaybeSingle.mockResolvedValue({ data: null });
    });

    it("toggleVote('jeju', 'like') 호출 시 insert({ user_id, city_id, vote_type }) 호출", async () => {
      await toggleVote("jeju", "like");

      expect(mockInsert).toHaveBeenCalledWith({
        user_id: "user-123",
        city_id: "jeju",
        vote_type: "like",
      });
    });

    it("revalidatePath('/') 호출", async () => {
      await toggleVote("jeju", "like");

      expect(mockRevalidatePath).toHaveBeenCalledWith("/");
    });

    it("delete, update는 호출되지 않음", async () => {
      await toggleVote("jeju", "like");

      expect(mockDelete).not.toHaveBeenCalled();
      expect(mockUpdate).not.toHaveBeenCalled();
    });
  });

  describe("조회 체인 파라미터 검증", () => {
    const mockUser = { id: "user-abc" };

    beforeEach(() => {
      mockGetUser.mockResolvedValue({ data: { user: mockUser } });
      mockMaybeSingle.mockResolvedValue({ data: null });
    });

    it("select('id, vote_type') 호출", async () => {
      await toggleVote("busan", "dislike");

      expect(mockSelect).toHaveBeenCalledWith("id, vote_type");
    });

    it("첫 번째 eq에 user_id 전달", async () => {
      await toggleVote("busan", "dislike");

      expect(mockSelectEq1).toHaveBeenCalledWith("user_id", "user-abc");
    });

    it("두 번째 eq에 city_id 전달", async () => {
      await toggleVote("busan", "dislike");

      expect(mockSelectEq2).toHaveBeenCalledWith("city_id", "busan");
    });
  });
});
