import { describe, it, expect } from "vitest";
import {
  scoreToBlocks,
  metricToBlocks,
  formatKRW,
  formatKRWShort,
} from "@/lib/data";

describe("scoreToBlocks", () => {
  it("score=8.5 → 8개 █, 1개 ▒, 1개 ░", () => {
    expect(scoreToBlocks(8.5)).toBe("████████▒░");
  });

  it("score=10 → 10개 █ (half 없음, empty 없음)", () => {
    expect(scoreToBlocks(10)).toBe("██████████");
  });

  it("score=0 → 10개 ░", () => {
    expect(scoreToBlocks(0)).toBe("░░░░░░░░░░");
  });

  it("score=7.0 → 7개 █, half 없음, 3개 ░", () => {
    expect(scoreToBlocks(7.0)).toBe("███████░░░");
  });

  it("score=5.5 → 5개 █, 1개 ▒, 4개 ░", () => {
    expect(scoreToBlocks(5.5)).toBe("█████▒░░░░");
  });

  it("소수점 0.5 미만이면 half 없음 (score=6.4 → 6개 █, 4개 ░)", () => {
    expect(scoreToBlocks(6.4)).toBe("██████░░░░");
  });

  it("소수점 정확히 0.5이면 half 포함 (score=3.5 → 3개 █, 1개 ▒, 6개 ░)", () => {
    expect(scoreToBlocks(3.5)).toBe("███▒░░░░░░");
  });

  it("반환 문자열은 항상 길이 10", () => {
    expect(scoreToBlocks(8.5).length).toBe(10);
    expect(scoreToBlocks(10).length).toBe(10);
    expect(scoreToBlocks(0).length).toBe(10);
    expect(scoreToBlocks(5.5).length).toBe(10);
  });
});

describe("metricToBlocks", () => {
  it("value=7 → 7개 █, 3개 ░", () => {
    expect(metricToBlocks(7)).toBe("███████░░░");
  });

  it("value=10 → 10개 █", () => {
    expect(metricToBlocks(10)).toBe("██████████");
  });

  it("value=0 → 10개 ░", () => {
    expect(metricToBlocks(0)).toBe("░░░░░░░░░░");
  });

  it("소수점 값 → floor 적용 (value=8.2 → 8개 █, 2개 ░)", () => {
    expect(metricToBlocks(8.2)).toBe("████████░░");
  });

  it("▒(half 블록) 미사용 — value=9.5에서도 ▒ 없음", () => {
    const result = metricToBlocks(9.5);
    expect(result).not.toContain("▒");
    expect(result).toBe("█████████░");
  });

  it("반환 문자열은 항상 길이 10", () => {
    expect(metricToBlocks(7).length).toBe(10);
    expect(metricToBlocks(10).length).toBe(10);
    expect(metricToBlocks(0).length).toBe(10);
  });
});

describe("formatKRW", () => {
  it("1580000 → ₩1,580,000", () => {
    expect(formatKRW(1580000)).toBe("₩1,580,000");
  });

  it("0 → ₩0", () => {
    expect(formatKRW(0)).toBe("₩0");
  });

  it("980000 → ₩980,000", () => {
    expect(formatKRW(980000)).toBe("₩980,000");
  });

  it("₩ 기호로 시작", () => {
    expect(formatKRW(500000).startsWith("₩")).toBe(true);
  });
});

describe("formatKRWShort", () => {
  it("1580000 → ₩158만", () => {
    expect(formatKRWShort(1580000)).toBe("₩158만");
  });

  it("980000 → ₩98만", () => {
    expect(formatKRWShort(980000)).toBe("₩98만");
  });

  it("10000 → ₩1만", () => {
    expect(formatKRWShort(10000)).toBe("₩1만");
  });

  it("Math.round 적용 (15000 → ₩2만)", () => {
    expect(formatKRWShort(15000)).toBe("₩2만");
  });

  it("'만' 으로 끝남", () => {
    expect(formatKRWShort(100000).endsWith("만")).toBe(true);
  });
});
