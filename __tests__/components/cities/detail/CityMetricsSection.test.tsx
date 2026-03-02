import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import CityMetricsSection from "@/components/cities/detail/CityMetricsSection";
import { CityMetrics } from "@/lib/data";

const mockMetrics: CityMetrics = {
  internet: 8.2,
  cafe: 9.0,
  transport: 7.5,
  nature: 9.8,
  nomadFriendly: 9.2,
};

describe("CityMetricsSection", () => {
  // 1. 5개 지표 라벨이 모두 렌더링되는지
  it("renders all 5 metric labels", () => {
    render(<CityMetricsSection metrics={mockMetrics} />);

    expect(screen.getByText("인터넷")).toBeInTheDocument();
    expect(screen.getByText("카페")).toBeInTheDocument();
    expect(screen.getByText("교통")).toBeInTheDocument();
    expect(screen.getByText("자연")).toBeInTheDocument();
    expect(screen.getByText("노마드친화도")).toBeInTheDocument();
  });

  // 2. 각 지표의 숫자 값이 올바르게 표시되는지
  it("displays correct numeric values for each metric", () => {
    render(<CityMetricsSection metrics={mockMetrics} />);

    expect(screen.getByText("8.2")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("7.5")).toBeInTheDocument();
    expect(screen.getByText("9.8")).toBeInTheDocument();
    expect(screen.getByText("9.2")).toBeInTheDocument();
  });

  // 3. // METRICS 헤더가 표시되는지
  it("renders the // METRICS header", () => {
    render(<CityMetricsSection metrics={mockMetrics} />);

    expect(screen.getByText("// METRICS")).toBeInTheDocument();
  });

  // 4. 모든 아이콘이 표시되는지
  it("displays all metric icons", () => {
    render(<CityMetricsSection metrics={mockMetrics} />);

    expect(screen.getByText("📡")).toBeInTheDocument();
    expect(screen.getByText("☕")).toBeInTheDocument();
    expect(screen.getByText("🚇")).toBeInTheDocument();
    expect(screen.getByText("🌿")).toBeInTheDocument();
    expect(screen.getByText("💻")).toBeInTheDocument();
  });
});
