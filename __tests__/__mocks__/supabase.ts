import { vi } from "vitest";

export const mockSelect = vi.fn();
export const mockInsert = vi.fn();
export const mockUpdate = vi.fn();
export const mockDelete = vi.fn();
export const mockEq = vi.fn();
export const mockMaybeSingle = vi.fn();
export const mockGetUser = vi.fn();
export const mockSignOut = vi.fn();

const mockFrom = vi.fn(() => ({
  select: mockSelect.mockReturnThis(),
  insert: mockInsert.mockReturnThis(),
  update: mockUpdate.mockReturnThis(),
  delete: mockDelete.mockReturnThis(),
  eq: mockEq.mockReturnThis(),
  maybeSingle: mockMaybeSingle,
}));

export const mockSupabaseClient = {
  auth: {
    getUser: mockGetUser,
    signOut: mockSignOut,
  },
  from: mockFrom,
};

vi.mock("@/utils/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue(mockSupabaseClient),
}));
