import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/layout/Navbar";

// next/link를 간단한 앵커 태그로 mock
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// signOut server action을 mock
vi.mock("@/app/actions/auth", () => ({
  signOut: vi.fn(),
}));

describe("Navbar", () => {
  describe("비로그인 상태 (user=null)", () => {
    it("'로그인' 텍스트가 표시된다", () => {
      render(<Navbar user={null} />);
      expect(screen.getAllByText("로그인").length).toBeGreaterThan(0);
    });

    it("'JOIN' 텍스트가 표시된다", () => {
      render(<Navbar user={null} />);
      expect(screen.getAllByText(/JOIN/).length).toBeGreaterThan(0);
    });

    it("'로그아웃' 버튼이 표시되지 않는다", () => {
      render(<Navbar user={null} />);
      expect(screen.queryByText("로그아웃")).not.toBeInTheDocument();
    });
  });

  describe("로그인 상태 (user 있음)", () => {
    it("username이 있을 때 username('tester')이 표시된다", () => {
      render(<Navbar user={{ email: "test@test.com", username: "tester" }} />);
      expect(screen.getAllByText("tester").length).toBeGreaterThan(0);
    });

    it("username이 없을 때 email('test@test.com')이 표시된다", () => {
      render(<Navbar user={{ email: "test@test.com", username: undefined }} />);
      expect(screen.getAllByText("test@test.com").length).toBeGreaterThan(0);
    });

    it("'로그아웃' 버튼이 표시된다", () => {
      render(<Navbar user={{ email: "test@test.com", username: "tester" }} />);
      expect(screen.getAllByText("로그아웃").length).toBeGreaterThan(0);
    });

    it("데스크톱 영역에 '로그인' 링크가 없다", () => {
      render(<Navbar user={{ email: "test@test.com", username: "tester" }} />);
      // 로그인 링크(/login href)가 존재하지 않아야 한다
      const loginLinks = screen.queryAllByRole("link", { name: "로그인" });
      expect(loginLinks).toHaveLength(0);
    });
  });

  describe("로고 렌더링", () => {
    it("'NOMAD' 텍스트가 포함된 로고가 표시된다", () => {
      render(<Navbar user={null} />);
      expect(screen.getByText(/NOMAD/)).toBeInTheDocument();
    });
  });
});
