import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { City } from "@/lib/data";

// --- Mocks -----------------------------------------------------------

vi.mock("@/lib/ascii-art", () => ({
  CITY_ASCII: {
    jeju: "MOCK_JEJU_ASCII_ART",
  } as Record<string, string>,
}));

vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children, ...props }: React.ComponentProps<"span">) => (
    <span data-testid="badge" {...props}>
      {children}
    </span>
  ),
}));

import CityDetailHero from "@/components/cities/detail/CityDetailHero";

// --- Mock Data -------------------------------------------------------

const mockCity: City = {
  id: "jeju",
  rank: 1,
  name: "제주시",
  nameEn: "JEJU",
  region: "제주도",
  score: 8.5,
  monthlyCost: 1580000,
  monthlyRent: 550000,
  metrics: {
    internet: 8.2,
    cafe: 9.0,
    transport: 7.5,
    nature: 9.8,
    nomadFriendly: 9.2,
  },
  tags: ["바다", "자연", "감성카페"],
  environment: ["자연친화", "카페작업"],
  budget: "100~200만원",
  season: ["봄", "가을"],
  likes: 128,
  dislikes: 12,
  internetSpeed: 82,
  weather: "맑음 18°C",
  aqi: 32,
  symbol: "★",
  mapX: 28,
  mapY: 82,
};

const cityAqiBest: City = {
  ...mockCity,
  id: "gangneung",
  name: "강릉시",
  nameEn: "GANGNEUNG",
  aqi: 25,
};

const cityAqiGood: City = {
  ...mockCity,
  id: "busan",
  name: "부산시",
  nameEn: "BUSAN",
  aqi: 45,
};

const cityAqiNormal: City = {
  ...mockCity,
  id: "seoul",
  name: "서울특별시",
  nameEn: "SEOUL",
  aqi: 60,
};

// --- Tests -----------------------------------------------------------

describe("CityDetailHero", () => {
  it("도시명(한글)과 영문명/지역이 렌더링된다", () => {
    render(<CityDetailHero city={mockCity} />);

    expect(screen.getByText("제주시")).toBeInTheDocument();
    expect(screen.getByText("JEJU · 제주도")).toBeInTheDocument();
  });

  it("랭킹 뱃지(#N)가 표시된다", () => {
    render(<CityDetailHero city={mockCity} />);

    expect(screen.getByText("#1")).toBeInTheDocument();
  });

  it("종합 점수가 표시된다", () => {
    render(<CityDetailHero city={mockCity} />);

    expect(screen.getByText("8.5")).toBeInTheDocument();
    // scoreToBlocks(8.5) => "████████▒░"
    expect(screen.getByText("████████▒░")).toBeInTheDocument();
  });

  it("날씨 정보가 표시된다", () => {
    render(<CityDetailHero city={mockCity} />);

    expect(screen.getByText("맑음 18°C")).toBeInTheDocument();
  });

  describe("AQI 정보 및 범위별 텍스트", () => {
    it("AQI <= 30 이면 값과 (최상) 텍스트가 표시된다", () => {
      render(<CityDetailHero city={cityAqiBest} />);

      expect(screen.getByText("25")).toBeInTheDocument();
      expect(screen.getByText("(최상)")).toBeInTheDocument();
    });

    it("30 < AQI <= 50 이면 값과 (좋음) 텍스트가 표시된다", () => {
      render(<CityDetailHero city={cityAqiGood} />);

      expect(screen.getByText("45")).toBeInTheDocument();
      expect(screen.getByText("(좋음)")).toBeInTheDocument();
    });

    it("AQI > 50 이면 값과 (보통) 텍스트가 표시된다", () => {
      render(<CityDetailHero city={cityAqiNormal} />);

      expect(screen.getByText("60")).toBeInTheDocument();
      expect(screen.getByText("(보통)")).toBeInTheDocument();
    });

    it("mockCity(aqi=32)는 (좋음)으로 표시된다", () => {
      render(<CityDetailHero city={mockCity} />);

      expect(screen.getByText("32")).toBeInTheDocument();
      expect(screen.getByText("(좋음)")).toBeInTheDocument();
    });
  });

  it("태그들이 모두 렌더링된다", () => {
    render(<CityDetailHero city={mockCity} />);

    const badges = screen.getAllByTestId("badge");
    expect(badges).toHaveLength(3);
    expect(screen.getByText("바다")).toBeInTheDocument();
    expect(screen.getByText("자연")).toBeInTheDocument();
    expect(screen.getByText("감성카페")).toBeInTheDocument();
  });

  it("ASCII 아트가 렌더링된다", () => {
    render(<CityDetailHero city={mockCity} />);

    expect(screen.getByText("MOCK_JEJU_ASCII_ART")).toBeInTheDocument();
  });

  it("터미널 헤더(// CITY_PROFILE)가 표시된다", () => {
    render(<CityDetailHero city={mockCity} />);

    expect(screen.getByText("// CITY_PROFILE")).toBeInTheDocument();
  });

  it("파일명 헤더(city.id.dat)가 표시된다", () => {
    render(<CityDetailHero city={mockCity} />);

    expect(screen.getByText("jeju.dat")).toBeInTheDocument();
  });

  it("존재하지 않는 도시 ID의 경우 ASCII 아트가 빈 문자열이다", () => {
    const unknownCity: City = {
      ...mockCity,
      id: "unknown-city",
    };

    const { container } = render(<CityDetailHero city={unknownCity} />);

    const preElement = container.querySelector("pre");
    expect(preElement).toBeInTheDocument();
    expect(preElement!.textContent).toBe("");
  });
});
