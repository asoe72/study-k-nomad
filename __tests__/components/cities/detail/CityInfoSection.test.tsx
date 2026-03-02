import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import CityInfoSection from "@/components/cities/detail/CityInfoSection";
import { City } from "@/lib/data";

const mockCity: City = {
  id: "jeju",
  rank: 1,
  name: "제주시",
  nameEn: "JEJU",
  region: "제주도",
  score: 8.5,
  monthlyCost: 1580000,
  monthlyRent: 550000,
  metrics: { internet: 8.2, cafe: 9.0, transport: 7.5, nature: 9.8, nomadFriendly: 9.2 },
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

describe("CityInfoSection", () => {
  // 1. 6개 라벨이 모두 렌더링되는지
  it("renders all 6 info labels", () => {
    render(<CityInfoSection city={mockCity} />);

    expect(screen.getByText("월 생활비")).toBeInTheDocument();
    expect(screen.getByText("원룸 월세")).toBeInTheDocument();
    expect(screen.getByText("인터넷 속도")).toBeInTheDocument();
    expect(screen.getByText("예산 분류")).toBeInTheDocument();
    expect(screen.getByText("추천 계절")).toBeInTheDocument();
    expect(screen.getByText("작업 환경")).toBeInTheDocument();
  });

  // 2. 월 생활비가 KRW 포맷으로 표시되는지
  it("displays monthly cost in KRW format", () => {
    render(<CityInfoSection city={mockCity} />);

    expect(screen.getByText("₩1,580,000")).toBeInTheDocument();
  });

  // 3. 원룸 월세가 KRW 포맷으로 표시되는지
  it("displays monthly rent in KRW format", () => {
    render(<CityInfoSection city={mockCity} />);

    expect(screen.getByText("₩550,000")).toBeInTheDocument();
  });

  // 4. 인터넷 속도가 Mbps 형식으로 표시되는지
  it("displays internet speed in Mbps format", () => {
    render(<CityInfoSection city={mockCity} />);

    expect(screen.getByText("82Mbps")).toBeInTheDocument();
  });

  // 5. 예산 분류가 올바르게 표시되는지
  it("displays budget category correctly", () => {
    render(<CityInfoSection city={mockCity} />);

    expect(screen.getByText("100~200만원")).toBeInTheDocument();
  });

  // 6. 추천 계절이 쉼표로 구분되어 표시되는지
  it("displays recommended seasons joined by comma", () => {
    render(<CityInfoSection city={mockCity} />);

    expect(screen.getByText("봄, 가을")).toBeInTheDocument();
  });

  // 7. 작업 환경이 쉼표로 구분되어 표시되는지
  it("displays work environments joined by comma", () => {
    render(<CityInfoSection city={mockCity} />);

    expect(screen.getByText("자연친화, 카페작업")).toBeInTheDocument();
  });

  // 8. // CITY_INFO 헤더가 표시되는지
  it("renders the // CITY_INFO header", () => {
    render(<CityInfoSection city={mockCity} />);

    expect(screen.getByText("// CITY_INFO")).toBeInTheDocument();
  });
});
