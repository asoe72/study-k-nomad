import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CITIES } from "@/lib/data";
import CitiesClient from "@/components/cities/CitiesClient";

// ── Mock 설정 ──────────────────────────────────────────────────────────
const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/app/actions/vote", () => ({
  toggleVote: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/components/modals/ReviewModal", () => ({
  default: () => null,
}));

// ── 헬퍼 ──────────────────────────────────────────────────────────────
const defaultProps = {
  cities: CITIES,
  userVotes: {} as Record<string, "like" | "dislike">,
  userId: "user-123",
};

// 특정 도시 ID의 좋아요 버튼을 찾는 헬퍼
function getLikeButton(cityId: string) {
  // CityCard에서 좋아요 버튼은 ThumbsUp 아이콘을 포함한 버튼
  // 도시 카드들 안에서 순서대로 배치되므로 city 인덱스로 접근
  const city = CITIES.find((c) => c.id === cityId)!;
  const cityIndex = [...CITIES]
    .sort((a, b) => {
      const likeDiff = b.likes - a.likes;
      return likeDiff !== 0 ? likeDiff : a.id.localeCompare(b.id);
    })
    .findIndex((c) => c.id === cityId);

  const likeButtons = screen.getAllByRole("button", { name: /thumbsup/i });
  // ThumbsUp 버튼을 aria 이름으로 찾기 어려울 수 있으므로
  // likes 수치를 포함한 버튼을 찾는다
  const allLikeButtons = document.querySelectorAll(".city-card button");
  // 각 카드의 첫 번째 버튼(좋아요)
  const cards = document.querySelectorAll(".city-card");
  const card = cards[cityIndex];
  if (!card) throw new Error(`Card not found for cityId: ${cityId}`);
  const buttons = card.querySelectorAll("button");
  return buttons[0]; // 첫 번째 버튼 = 좋아요
}

// ── 테스트 ────────────────────────────────────────────────────────────
describe("CitiesClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("도시 카드 렌더링", () => {
    it("cities props가 주어지면 도시 카드들이 렌더링된다", () => {
      render(<CitiesClient {...defaultProps} />);

      // CITIES 배열의 모든 도시명이 화면에 표시되어야 함
      for (const city of CITIES) {
        expect(screen.getByText(city.name)).toBeInTheDocument();
      }
    });
  });

  describe("필터 기능", () => {
    it("예산 필터 '100만원 이하' 선택 시 해당 도시만 표시된다", async () => {
      const user = userEvent.setup();
      render(<CitiesClient {...defaultProps} />);

      await user.click(screen.getByRole("button", { name: "100만원 이하" }));

      // "100만원 이하" budget을 가진 도시들
      const budgetUnder100 = CITIES.filter((c) => c.budget === "100만원 이하");
      const budgetOther = CITIES.filter((c) => c.budget !== "100만원 이하");

      for (const city of budgetUnder100) {
        expect(screen.getByText(city.name)).toBeInTheDocument();
      }
      for (const city of budgetOther) {
        expect(screen.queryByText(city.name)).not.toBeInTheDocument();
      }
    });

    it("조건에 맞는 도시가 없을 때 'NO RESULTS' 텍스트가 표시된다", async () => {
      const user = userEvent.setup();
      render(<CitiesClient {...defaultProps} />);

      // 봄 + 여름 동시에 필터는 불가능하므로
      // 아무 도시도 없는 조건: 지역=수도권 + 환경=자연친화 (홍대는 도심선호/코워킹)
      // region=수도권 + season=여름 → 홍대는 여름도 포함하므로
      // 더 확실하게: 지역=강원도 + 예산=200만원 초과 → 강원도 도시는 모두 100만원 이하
      await user.click(screen.getByRole("button", { name: "강원도" }));
      await user.click(screen.getByRole("button", { name: "200만원 초과" }));

      expect(screen.getByText(/NO RESULTS/)).toBeInTheDocument();
    });
  });

  describe("좋아요 - 비로그인", () => {
    it("userId=null 상태에서 좋아요 클릭 시 /login으로 이동한다", async () => {
      const user = userEvent.setup();
      render(<CitiesClient {...defaultProps} userId={null} />);

      // 정렬된 첫 번째 카드의 좋아요 버튼 클릭
      const cards = document.querySelectorAll(".city-card");
      const firstCardLikeBtn = cards[0].querySelectorAll("button")[0];
      await user.click(firstCardLikeBtn);

      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  describe("좋아요 - 로그인", () => {
    it("userId 있을 때 좋아요 클릭 시 toggleVote(cityId, 'like')가 호출된다", async () => {
      const { toggleVote } = await import("@/app/actions/vote");
      const user = userEvent.setup();
      render(<CitiesClient {...defaultProps} />);

      // 정렬 기준: likes 내림차순 → 제주(128)가 첫 번째
      const cards = document.querySelectorAll(".city-card");
      const firstCardLikeBtn = cards[0].querySelectorAll("button")[0];
      await user.click(firstCardLikeBtn);

      // 정렬 후 첫 번째 도시 ID 계산
      const sorted = [...CITIES].sort((a, b) => {
        const likeDiff = b.likes - a.likes;
        return likeDiff !== 0 ? likeDiff : a.id.localeCompare(b.id);
      });
      expect(toggleVote).toHaveBeenCalledWith(sorted[0].id, "like");
    });

    it("좋아요 클릭 후 optimistic update: likes 수치가 즉시 +1 된다", async () => {
      const user = userEvent.setup();
      render(<CitiesClient {...defaultProps} />);

      // 정렬 후 첫 번째 도시 확인
      const sorted = [...CITIES].sort((a, b) => {
        const likeDiff = b.likes - a.likes;
        return likeDiff !== 0 ? likeDiff : a.id.localeCompare(b.id);
      });
      const firstCity = sorted[0];
      const originalLikes = firstCity.likes;

      const cards = document.querySelectorAll(".city-card");
      const firstCardLikeBtn = cards[0].querySelectorAll("button")[0];

      await act(async () => {
        await user.click(firstCardLikeBtn);
      });

      // 버튼 텍스트에 likes+1이 표시되어야 함
      expect(firstCardLikeBtn.textContent).toContain(String(originalLikes + 1));
    });

    it("이미 liked 상태에서 좋아요 클릭 시 likes 수치가 -1 된다 (토글)", async () => {
      const user = userEvent.setup();
      // jeju를 이미 liked 상태로 설정
      render(
        <CitiesClient
          {...defaultProps}
          userVotes={{ jeju: "like" }}
        />
      );

      // jeju는 liked=true인 상태로 렌더링됨
      // 정렬 후 jeju의 위치 확인 (userVotes로 liked=true이지만 likes 수치는 초기값 그대로)
      const sorted = [...CITIES].sort((a, b) => {
        const likeDiff = b.likes - a.likes;
        return likeDiff !== 0 ? likeDiff : a.id.localeCompare(b.id);
      });
      const jejuIndex = sorted.findIndex((c) => c.id === "jeju");
      const originalLikes = CITIES.find((c) => c.id === "jeju")!.likes;

      const cards = document.querySelectorAll(".city-card");
      const jejuLikeBtn = cards[jejuIndex].querySelectorAll("button")[0];

      await act(async () => {
        await user.click(jejuLikeBtn);
      });

      // likes가 -1 되어야 함
      expect(jejuLikeBtn.textContent).toContain(String(originalLikes - 1));
    });
  });
});
