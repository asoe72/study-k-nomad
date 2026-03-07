import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterBar, { FilterValues } from "@/components/cities/FilterBar";

const defaultValues: FilterValues = {
  budget: "전체",
  region: "전체",
  environment: "전체",
  season: "전체",
};

describe("FilterBar", () => {
  describe("카테고리 레이블 렌더링", () => {
    it("예산 카테고리 레이블이 표시된다", () => {
      render(<FilterBar values={defaultValues} onChange={vi.fn()} />);
      expect(screen.getByText("예산")).toBeInTheDocument();
    });

    it("지역 카테고리 레이블이 표시된다", () => {
      render(<FilterBar values={defaultValues} onChange={vi.fn()} />);
      expect(screen.getByText("지역")).toBeInTheDocument();
    });

    it("환경 카테고리 레이블이 표시된다", () => {
      render(<FilterBar values={defaultValues} onChange={vi.fn()} />);
      expect(screen.getByText("환경")).toBeInTheDocument();
    });

    it("최고 계절 카테고리 레이블이 표시된다", () => {
      render(<FilterBar values={defaultValues} onChange={vi.fn()} />);
      expect(screen.getByText("최고 계절")).toBeInTheDocument();
    });
  });

  describe("전체 버튼 존재 확인", () => {
    it("각 카테고리마다 전체 버튼이 존재한다 (4개)", () => {
      render(<FilterBar values={defaultValues} onChange={vi.fn()} />);
      const allButtons = screen.getAllByText("전체");
      expect(allButtons).toHaveLength(4);
    });
  });

  describe("필터 버튼 클릭 시 onChange 호출", () => {
    it("예산 필터 클릭 시 onChange가 key='budget'으로 호출된다", async () => {
      const onChange = vi.fn();
      render(<FilterBar values={defaultValues} onChange={onChange} />);
      const user = userEvent.setup();

      await user.click(screen.getByRole("button", { name: "100만원 이하" }));
      expect(onChange).toHaveBeenCalledWith("budget", "100만원 이하");
    });

    it("예산 필터 클릭 시 onChange가 올바른 value로 호출된다", async () => {
      const onChange = vi.fn();
      render(<FilterBar values={defaultValues} onChange={onChange} />);
      const user = userEvent.setup();

      await user.click(screen.getByRole("button", { name: "100~200만원" }));
      expect(onChange).toHaveBeenCalledWith("budget", "100~200만원");
    });

    it("지역 필터 클릭 시 onChange가 key='region'으로 호출된다", async () => {
      const onChange = vi.fn();
      render(<FilterBar values={defaultValues} onChange={onChange} />);
      const user = userEvent.setup();

      await user.click(screen.getByRole("button", { name: "제주도" }));
      expect(onChange).toHaveBeenCalledWith("region", "제주도");
    });

    it("환경 필터 클릭 시 onChange가 key='environment'로 호출된다", async () => {
      const onChange = vi.fn();
      render(<FilterBar values={defaultValues} onChange={onChange} />);
      const user = userEvent.setup();

      await user.click(screen.getByRole("button", { name: "자연친화" }));
      expect(onChange).toHaveBeenCalledWith("environment", "자연친화");
    });

    it("계절 필터 클릭 시 onChange가 key='season'으로 호출된다", async () => {
      const onChange = vi.fn();
      render(<FilterBar values={defaultValues} onChange={onChange} />);
      const user = userEvent.setup();

      await user.click(screen.getByRole("button", { name: "봄" }));
      expect(onChange).toHaveBeenCalledWith("season", "봄");
    });

    it("전체 버튼 클릭 시 onChange가 해당 key와 '전체' value로 호출된다", async () => {
      const onChange = vi.fn();
      const activeValues: FilterValues = {
        budget: "100만원 이하",
        region: "전체",
        environment: "전체",
        season: "전체",
      };
      render(<FilterBar values={activeValues} onChange={onChange} />);
      const user = userEvent.setup();

      const allButtons = screen.getAllByText("전체");
      await user.click(allButtons[0]);
      expect(onChange).toHaveBeenCalledWith("budget", "전체");
    });
  });

  describe("활성 필터 스타일", () => {
    it("budget='100만원 이하'일 때 해당 버튼이 활성 스타일을 갖는다", () => {
      const activeValues: FilterValues = {
        budget: "100만원 이하",
        region: "전체",
        environment: "전체",
        season: "전체",
      };
      render(<FilterBar values={activeValues} onChange={vi.fn()} />);
      const activeButton = screen.getByRole("button", { name: "100만원 이하" });
      expect(activeButton.className).toContain("border-[#00FF88]");
    });
  });
});
