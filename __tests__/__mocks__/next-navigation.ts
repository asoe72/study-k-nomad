import { vi } from "vitest";

export const mockPush = vi.fn();
export const mockRedirect = vi.fn();
export const mockRevalidatePath = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: vi.fn() }),
  redirect: mockRedirect,
}));

vi.mock("next/cache", () => ({
  revalidatePath: mockRevalidatePath,
}));
