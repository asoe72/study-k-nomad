import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("lucide-react", () => ({
  ThumbsUp: ({ size, ...props }: { size?: number }) => (
    <span data-testid="thumbs-up" {...props} />
  ),
  ThumbsDown: ({ size, ...props }: { size?: number }) => (
    <span data-testid="thumbs-down" {...props} />
  ),
}));

import CityVoteButtons from "@/components/cities/detail/CityVoteButtons";

describe("CityVoteButtons", () => {
  const defaultProps = {
    cityId: "city-1",
    initialLikes: 10,
    initialDislikes: 3,
  };

  // 1. 초기 렌더링: likes/dislikes 값이 올바르게 표시되는지
  it("renders initial likes and dislikes counts", () => {
    render(<CityVoteButtons {...defaultProps} />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  // 2. 좋아요 클릭: 좋아요 수가 1 증가하는지
  it("increments likes by 1 when like button is clicked", () => {
    render(<CityVoteButtons {...defaultProps} />);

    const likeButton = screen.getByText("10").closest("button")!;
    fireEvent.click(likeButton);

    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  // 3. 좋아요 다시 클릭(토글): 좋아요 수가 원래로 돌아가는지
  it("decrements likes back to initial when like button is toggled", () => {
    render(<CityVoteButtons {...defaultProps} />);

    const likeButton = screen.getByText("10").closest("button")!;
    fireEvent.click(likeButton);
    expect(screen.getByText("11")).toBeInTheDocument();

    fireEvent.click(likeButton);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  // 4. 싫어요 클릭: 싫어요 수가 1 증가하는지
  it("increments dislikes by 1 when dislike button is clicked", () => {
    render(<CityVoteButtons {...defaultProps} />);

    const dislikeButton = screen.getByText("3").closest("button")!;
    fireEvent.click(dislikeButton);

    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  // 5. 싫어요 다시 클릭(토글): 싫어요 수가 원래로 돌아가는지
  it("decrements dislikes back to initial when dislike button is toggled", () => {
    render(<CityVoteButtons {...defaultProps} />);

    const dislikeButton = screen.getByText("3").closest("button")!;
    fireEvent.click(dislikeButton);
    expect(screen.getByText("4")).toBeInTheDocument();

    fireEvent.click(dislikeButton);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  // 6. 좋아요 상태에서 싫어요 클릭: 좋아요 -1, 싫어요 +1 (상호 배타)
  it("removes like and adds dislike when dislike is clicked while liked", () => {
    render(<CityVoteButtons {...defaultProps} />);

    const likeButton = screen.getByText("10").closest("button")!;
    fireEvent.click(likeButton);
    expect(screen.getByText("11")).toBeInTheDocument();

    const dislikeButton = screen.getByText("3").closest("button")!;
    fireEvent.click(dislikeButton);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  // 7. 싫어요 상태에서 좋아요 클릭: 싫어요 -1, 좋아요 +1 (상호 배타)
  it("removes dislike and adds like when like is clicked while disliked", () => {
    render(<CityVoteButtons {...defaultProps} />);

    const dislikeButton = screen.getByText("3").closest("button")!;
    fireEvent.click(dislikeButton);
    expect(screen.getByText("4")).toBeInTheDocument();

    const likeButton = screen.getByText("10").closest("button")!;
    fireEvent.click(likeButton);

    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  // 8. 연속 클릭 시 상태가 올바른지
  it("maintains correct state after a sequence of clicks", () => {
    render(<CityVoteButtons {...defaultProps} />);

    const likeButton = screen.getByText("10").closest("button")!;
    const dislikeButton = screen.getByText("3").closest("button")!;

    // 좋아요 클릭 -> likes: 11, dislikes: 3
    fireEvent.click(likeButton);
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    // 싫어요 클릭 (상호 배타) -> likes: 10, dislikes: 4
    fireEvent.click(dislikeButton);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();

    // 싫어요 토글 해제 -> likes: 10, dislikes: 3
    fireEvent.click(dislikeButton);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    // 좋아요 클릭 -> likes: 11, dislikes: 3
    fireEvent.click(likeButton);
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    // 좋아요 토글 해제 -> likes: 10, dislikes: 3
    fireEvent.click(likeButton);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  // 9. // VOTE 헤더가 렌더링되는지
  it("renders the // VOTE header", () => {
    render(<CityVoteButtons {...defaultProps} />);

    expect(screen.getByText("// VOTE")).toBeInTheDocument();
  });
});
