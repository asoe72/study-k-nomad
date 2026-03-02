import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

vi.mock("@/components/cities/CityAsciiArt", () => ({
  default: () => <div data-testid="city-ascii-art" />,
}));

vi.mock("lucide-react", () => ({
  ThumbsUp: ({ size, ...props }: { size?: number }) => (
    <span data-testid="thumbs-up" {...props} />
  ),
  ThumbsDown: ({ size, ...props }: { size?: number }) => (
    <span data-testid="thumbs-down" {...props} />
  ),
}));

import CityCard from "@/components/cities/CityCard";
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

describe("CityCard", () => {
  const defaultProps = {
    city: mockCity,
    rank: 1,
    liked: false,
    disliked: false,
    likes: 128,
    dislikes: 12,
    onLike: vi.fn(),
    onDislike: vi.fn(),
    onReview: vi.fn(),
  };

  // 1. Link가 /cities/{city.id}로 렌더링되는지
  it("renders Link with correct href /cities/{city.id}", () => {
    render(<CityCard {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/cities/jeju");
  });

  // 2. 도시명, 영문명, 지역이 표시되는지
  it("displays city name, English name, and region", () => {
    render(<CityCard {...defaultProps} />);

    expect(screen.getByText("제주시")).toBeInTheDocument();
    expect(screen.getByText(/JEJU/)).toBeInTheDocument();
    // "제주도"는 서브타이틀과 정보 필드 두 곳에 표시됨
    const regionElements = screen.getAllByText(/제주도/);
    expect(regionElements.length).toBeGreaterThanOrEqual(1);
  });

  // 3. 태그가 모두 렌더링되는지
  it("renders all tags", () => {
    render(<CityCard {...defaultProps} />);

    expect(screen.getByText("바다")).toBeInTheDocument();
    expect(screen.getByText("자연")).toBeInTheDocument();
    expect(screen.getByText("감성카페")).toBeInTheDocument();
  });

  // 4. 좋아요/싫어요 수가 표시되는지
  it("displays likes and dislikes counts", () => {
    render(<CityCard {...defaultProps} />);

    expect(screen.getByText("128")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  // 5. 좋아요 버튼 클릭 시 onLike가 호출되는지
  it("calls onLike with city id when like button is clicked", () => {
    const onLike = vi.fn();
    render(<CityCard {...defaultProps} onLike={onLike} />);

    const likeButton = screen.getByText("128").closest("button")!;
    fireEvent.click(likeButton);

    expect(onLike).toHaveBeenCalledWith("jeju");
    expect(onLike).toHaveBeenCalledTimes(1);
  });

  // 6. 싫어요 버튼 클릭 시 onDislike가 호출되는지
  it("calls onDislike with city id when dislike button is clicked", () => {
    const onDislike = vi.fn();
    render(<CityCard {...defaultProps} onDislike={onDislike} />);

    const dislikeButton = screen.getByText("12").closest("button")!;
    fireEvent.click(dislikeButton);

    expect(onDislike).toHaveBeenCalledWith("jeju");
    expect(onDislike).toHaveBeenCalledTimes(1);
  });

  // 7. 리뷰 버튼 클릭 시 onReview가 호출되는지
  it("calls onReview with city id when review button is clicked", () => {
    const onReview = vi.fn();
    render(<CityCard {...defaultProps} onReview={onReview} />);

    const reviewButton = screen.getByText(/리뷰/).closest("button")!;
    fireEvent.click(reviewButton);

    expect(onReview).toHaveBeenCalledWith("jeju");
    expect(onReview).toHaveBeenCalledTimes(1);
  });

  // 8. 버튼 클릭 시 stopPropagation과 preventDefault가 호출되는지
  it("calls stopPropagation and preventDefault on button clicks", () => {
    render(<CityCard {...defaultProps} />);

    const likeButton = screen.getByText("128").closest("button")!;
    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, "preventDefault");
    const stopPropagationSpy = vi.spyOn(clickEvent, "stopPropagation");

    fireEvent(likeButton, clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});
