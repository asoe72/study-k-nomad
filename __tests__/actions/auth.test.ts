import { describe, it, expect, vi, beforeEach } from "vitest";
import { signOut } from "@/app/actions/auth";

const { mockRedirect, mockSignOut } = vi.hoisted(() => ({
  mockRedirect: vi.fn(),
  mockSignOut: vi.fn().mockResolvedValue({ error: null }),
}));

vi.mock("next/navigation", () => ({ redirect: mockRedirect }));
vi.mock("@/utils/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: { signOut: mockSignOut },
  }),
}));

describe("signOut", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignOut.mockResolvedValue({ error: null });
  });

  it("supabase.auth.signOut() 호출됨", async () => {
    await signOut();

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  it("redirect('/') 호출됨", async () => {
    await signOut();

    expect(mockRedirect).toHaveBeenCalledWith("/");
    expect(mockRedirect).toHaveBeenCalledTimes(1);
  });

  it("signOut 먼저 호출되고 redirect가 나중에 호출됨 (순서 검증)", async () => {
    const callOrder: string[] = [];

    mockSignOut.mockImplementation(async () => {
      callOrder.push("signOut");
      return { error: null };
    });

    mockRedirect.mockImplementation(() => {
      callOrder.push("redirect");
    });

    await signOut();

    expect(callOrder).toEqual(["signOut", "redirect"]);
  });

  it("signOut과 redirect 모두 호출됨", async () => {
    await signOut();

    expect(mockSignOut).toHaveBeenCalled();
    expect(mockRedirect).toHaveBeenCalled();
  });
});
