import { describe, it, expect } from "vitest";
import {
  scoreToBlocks,
  metricToBlocks,
  formatKRW,
  formatKRWShort,
  CITIES,
} from "@/lib/data";
import type { CityMetrics } from "@/lib/data";

// ─── scoreToBlocks ──────────────────────────────────────────

describe("scoreToBlocks", () => {
  it("정수 점수 7 → 채워진 7칸 + 빈 3칸", () => {
    expect(scoreToBlocks(7)).toBe("███████░░░");
  });

  it("소수 점수 >= 0.5 (7.5) → 채워진 7칸 + 반 1칸 + 빈 2칸", () => {
    expect(scoreToBlocks(7.5)).toBe("███████▒░░");
  });

  it("소수 점수 < 0.5 (7.3) → 채워진 7칸 + 빈 3칸 (반 블록 없음)", () => {
    expect(scoreToBlocks(7.3)).toBe("███████░░░");
  });

  it("최대값 10 → 모든 칸 채워짐", () => {
    expect(scoreToBlocks(10)).toBe("██████████");
  });

  it("최소값 0 → 모든 칸 비어있음", () => {
    expect(scoreToBlocks(0)).toBe("░░░░░░░░░░");
  });

  it("결과 문자열 길이는 항상 10 (filled + half + empty = 10)", () => {
    const testValues = [0, 1, 2.3, 3.5, 4.9, 5, 6.5, 7.8, 8.5, 9.5, 10];
    for (const value of testValues) {
      const result = scoreToBlocks(value);
      expect(result).toHaveLength(10);
    }
  });

  it("정확히 0.5인 소수 부분은 반 블록으로 표시", () => {
    expect(scoreToBlocks(0.5)).toBe("▒░░░░░░░░░");
  });

  it("0.49 소수 부분은 반 블록 없이 표시", () => {
    expect(scoreToBlocks(0.49)).toBe("░░░░░░░░░░");
  });

  it("9.5 → 채워진 9칸 + 반 1칸", () => {
    expect(scoreToBlocks(9.5)).toBe("█████████▒");
  });

  it("소수 부분이 정확히 0.99일 때 반 블록 표시", () => {
    expect(scoreToBlocks(5.99)).toBe("█████▒░░░░");
  });
});

// ─── metricToBlocks ─────────────────────────────────────────

describe("metricToBlocks", () => {
  it("정수 값 8 → 채워진 8칸 + 빈 2칸", () => {
    expect(metricToBlocks(8)).toBe("████████░░");
  });

  it("소수 값 8.2 → 소수점 버림하여 채워진 8칸 + 빈 2칸", () => {
    expect(metricToBlocks(8.2)).toBe("████████░░");
  });

  it("최대값 10 → 모든 칸 채워짐", () => {
    expect(metricToBlocks(10)).toBe("██████████");
  });

  it("최소값 0 → 모든 칸 비어있음", () => {
    expect(metricToBlocks(0)).toBe("░░░░░░░░░░");
  });

  it("결과 문자열 길이는 항상 10", () => {
    const testValues = [0, 1, 2.3, 3.7, 4.99, 5, 6, 7.1, 8.9, 9, 10];
    for (const value of testValues) {
      const result = metricToBlocks(value);
      expect(result).toHaveLength(10);
    }
  });

  it("소수 값 9.9 → 소수점 버림하여 채워진 9칸 + 빈 1칸", () => {
    expect(metricToBlocks(9.9)).toBe("█████████░");
  });

  it("소수 값 0.1 → 소수점 버림하여 빈 10칸", () => {
    expect(metricToBlocks(0.1)).toBe("░░░░░░░░░░");
  });
});

// ─── formatKRW ──────────────────────────────────────────────

describe("formatKRW", () => {
  it("일반 금액 1580000 → ₩ 접두사 + 천 단위 구분", () => {
    const result = formatKRW(1580000);
    expect(result).toBe("₩" + (1580000).toLocaleString("ko-KR"));
  });

  it("0 → ₩0", () => {
    expect(formatKRW(0)).toBe("₩0");
  });

  it("큰 금액 2800000 → ₩ 접두사 + 천 단위 구분", () => {
    const result = formatKRW(2800000);
    expect(result).toBe("₩" + (2800000).toLocaleString("ko-KR"));
  });

  it("결과가 ₩ 접두사로 시작", () => {
    expect(formatKRW(100)).toMatch(/^₩/);
  });

  it("작은 금액 100 → ₩100", () => {
    expect(formatKRW(100)).toBe("₩100");
  });
});

// ─── formatKRWShort ─────────────────────────────────────────

describe("formatKRWShort", () => {
  it("일반 금액 1580000 → ₩158만", () => {
    expect(formatKRWShort(1580000)).toBe("₩158만");
  });

  it("반올림 확인: 1585000 → ₩159만 (올림)", () => {
    expect(formatKRWShort(1585000)).toBe("₩159만");
  });

  it("작은 금액 980000 → ₩98만", () => {
    expect(formatKRWShort(980000)).toBe("₩98만");
  });

  it("정확한 만 단위 1000000 → ₩100만", () => {
    expect(formatKRWShort(1000000)).toBe("₩100만");
  });

  it("0 → ₩0만", () => {
    expect(formatKRWShort(0)).toBe("₩0만");
  });

  it("반올림 경계값: 10004999 → ₩1000만 (버림)", () => {
    expect(formatKRWShort(10004999)).toBe("₩1000만");
  });

  it("반올림 경계값: 10005000 → ₩1001만 (올림)", () => {
    expect(formatKRWShort(10005000)).toBe("₩1001만");
  });
});

// ─── CITIES 상수 ────────────────────────────────────────────

describe("CITIES", () => {
  it("7개 도시가 있어야 한다", () => {
    expect(CITIES).toHaveLength(7);
  });

  it("각 도시에 고유한 id가 있어야 한다", () => {
    const ids = CITIES.map((city) => city.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(CITIES.length);
  });

  it("각 도시에 고유한 rank가 있어야 한다", () => {
    const ranks = CITIES.map((city) => city.rank);
    const uniqueRanks = new Set(ranks);
    expect(uniqueRanks.size).toBe(CITIES.length);
  });

  it("모든 도시에 필수 필드가 있어야 한다", () => {
    const requiredKeys: (keyof (typeof CITIES)[0])[] = [
      "id",
      "rank",
      "name",
      "nameEn",
      "region",
      "score",
      "monthlyCost",
      "monthlyRent",
      "metrics",
      "tags",
      "environment",
      "budget",
      "season",
      "likes",
      "dislikes",
      "internetSpeed",
      "weather",
      "aqi",
      "symbol",
      "mapX",
      "mapY",
    ];

    for (const city of CITIES) {
      for (const key of requiredKeys) {
        expect(city).toHaveProperty(key);
      }
    }
  });

  it("모든 도시의 score가 0-10 범위여야 한다", () => {
    for (const city of CITIES) {
      expect(city.score).toBeGreaterThanOrEqual(0);
      expect(city.score).toBeLessThanOrEqual(10);
    }
  });

  it("모든 도시의 metrics 각 항목이 0-10 범위여야 한다", () => {
    const metricKeys: (keyof CityMetrics)[] = [
      "internet",
      "cafe",
      "transport",
      "nature",
      "nomadFriendly",
    ];

    for (const city of CITIES) {
      for (const key of metricKeys) {
        expect(city.metrics[key]).toBeGreaterThanOrEqual(0);
        expect(city.metrics[key]).toBeLessThanOrEqual(10);
      }
    }
  });

  it("모든 도시의 id는 빈 문자열이 아니어야 한다", () => {
    for (const city of CITIES) {
      expect(city.id.length).toBeGreaterThan(0);
    }
  });

  it("모든 도시의 name은 빈 문자열이 아니어야 한다", () => {
    for (const city of CITIES) {
      expect(city.name.length).toBeGreaterThan(0);
    }
  });

  it("모든 도시의 nameEn은 대문자로 구성되어야 한다", () => {
    for (const city of CITIES) {
      expect(city.nameEn).toBe(city.nameEn.toUpperCase());
    }
  });

  it("모든 도시의 monthlyCost가 양수여야 한다", () => {
    for (const city of CITIES) {
      expect(city.monthlyCost).toBeGreaterThan(0);
    }
  });

  it("모든 도시의 monthlyRent가 양수여야 한다", () => {
    for (const city of CITIES) {
      expect(city.monthlyRent).toBeGreaterThan(0);
    }
  });

  it("모든 도시에 최소 1개의 태그가 있어야 한다", () => {
    for (const city of CITIES) {
      expect(city.tags.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("모든 도시에 최소 1개의 시즌이 있어야 한다", () => {
    for (const city of CITIES) {
      expect(city.season.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("모든 도시에 최소 1개의 환경 유형이 있어야 한다", () => {
    for (const city of CITIES) {
      expect(city.environment.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("rank는 1부터 순차적으로 증가해야 한다", () => {
    const ranks = CITIES.map((city) => city.rank).sort((a, b) => a - b);
    for (let i = 0; i < ranks.length; i++) {
      expect(ranks[i]).toBe(i + 1);
    }
  });

  it("mapX와 mapY가 0-100 범위여야 한다 (퍼센트)", () => {
    for (const city of CITIES) {
      expect(city.mapX).toBeGreaterThanOrEqual(0);
      expect(city.mapX).toBeLessThanOrEqual(100);
      expect(city.mapY).toBeGreaterThanOrEqual(0);
      expect(city.mapY).toBeLessThanOrEqual(100);
    }
  });
});
