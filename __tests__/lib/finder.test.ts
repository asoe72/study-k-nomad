import { describe, it, expect } from "vitest";
import { CITIES } from "@/lib/data";
import {
  calculateMaxBudget,
  calculateCityScore,
  findTopCities,
} from "@/lib/finder";
import type { FinderInput } from "@/lib/finder";

// 테스트용 기본 입력값 (선호 없음)
const defaultInput: FinderInput = {
  income: 300,
  budgetRatio: 50,
  preferredEnv: [],
  priority: [],
};

// 헬퍼: CITIES에서 id로 도시 찾기
const getCity = (id: string) => {
  const city = CITIES.find((c) => c.id === id);
  if (!city) throw new Error(`City not found: ${id}`);
  return city;
};

// ────────────────────────────────────────────────────────────────
// calculateMaxBudget
// ────────────────────────────────────────────────────────────────
describe("calculateMaxBudget", () => {
  it("income=300, ratio=50 → 150만원(1,500,000원)", () => {
    expect(calculateMaxBudget(300, 50)).toBe(1_500_000);
  });

  it("income=200, ratio=100 → 200만원(2,000,000원)", () => {
    expect(calculateMaxBudget(200, 100)).toBe(2_000_000);
  });

  it("income=500, ratio=20 → 100만원(1,000,000원)", () => {
    expect(calculateMaxBudget(500, 20)).toBe(1_000_000);
  });

  it("income=0, ratio=50 → 0", () => {
    expect(calculateMaxBudget(0, 50)).toBe(0);
  });
});

// ────────────────────────────────────────────────────────────────
// calculateCityScore
// ────────────────────────────────────────────────────────────────
describe("calculateCityScore", () => {
  it("preferredEnv가 비어있으면 환경 보너스 +2를 항상 부여한다", () => {
    const jeju = getCity("jeju"); // score=8.5, environment=["자연친화","카페작업"]
    const score = calculateCityScore(jeju, { ...defaultInput, preferredEnv: [] });
    expect(score).toBe(jeju.score + 2);
  });

  it("도시 환경이 선호 환경에 매칭되면 보너스 +2를 부여한다", () => {
    const jeju = getCity("jeju"); // environment=["자연친화","카페작업"]
    const score = calculateCityScore(jeju, {
      ...defaultInput,
      preferredEnv: ["자연친화"],
    });
    expect(score).toBe(jeju.score + 2);
  });

  it("도시 환경이 선호 환경에 매칭되지 않으면 환경 보너스를 부여하지 않는다", () => {
    // 홍대: environment=["도심선호","코워킹 필수"]
    const hongdae = getCity("hongdae");
    const score = calculateCityScore(hongdae, {
      ...defaultInput,
      preferredEnv: ["자연친화"], // 매칭 안 됨
    });
    expect(score).toBe(hongdae.score); // 보너스 없음
  });

  it("priority=internet이면 city.metrics.internet * 0.3 보너스를 추가한다", () => {
    const jeju = getCity("jeju"); // metrics.internet=8.2
    const expectedBonus = 2 + jeju.metrics.internet * 0.3; // 환경 보너스(preferredEnv=[]) + internet 보너스
    const score = calculateCityScore(jeju, {
      ...defaultInput,
      preferredEnv: [],
      priority: ["internet"],
    });
    expect(score).toBeCloseTo(jeju.score + expectedBonus);
  });

  it("priority=cost이고 monthlyCost < 120만원이면 보너스 +2를 추가한다", () => {
    // 전주: monthlyCost=980,000 (< 1,200,000)
    const jeonju = getCity("jeonju");
    const score = calculateCityScore(jeonju, {
      ...defaultInput,
      preferredEnv: [],
      priority: ["cost"],
    });
    // 환경 보너스 +2, cost 보너스 +2
    expect(score).toBe(jeonju.score + 2 + 2);
  });

  it("priority=cost이고 monthlyCost >= 120만원이면 cost 보너스를 부여하지 않는다", () => {
    // 제주: monthlyCost=1,580,000 (>= 1,200,000)
    const jeju = getCity("jeju");
    const score = calculateCityScore(jeju, {
      ...defaultInput,
      preferredEnv: [],
      priority: ["cost"],
    });
    // 환경 보너스 +2만, cost 보너스 없음
    expect(score).toBe(jeju.score + 2);
  });

  it("priority=cafe이면 city.metrics.cafe * 0.2 보너스를 추가한다", () => {
    const gangneung = getCity("gangneung"); // metrics.cafe=9.5
    const score = calculateCityScore(gangneung, {
      ...defaultInput,
      preferredEnv: [],
      priority: ["cafe"],
    });
    expect(score).toBeCloseTo(gangneung.score + 2 + gangneung.metrics.cafe * 0.2);
  });

  it("priority=transport이면 city.metrics.transport * 0.2 보너스를 추가한다", () => {
    const busan = getCity("busan"); // metrics.transport=8.9
    const score = calculateCityScore(busan, {
      ...defaultInput,
      preferredEnv: [],
      priority: ["transport"],
    });
    expect(score).toBeCloseTo(busan.score + 2 + busan.metrics.transport * 0.2);
  });

  it("여러 priority가 동시에 지정되면 모두 누적 적용된다", () => {
    const daejeon = getCity("daejeon");
    // internet + cost(monthlyCost=1,350,000 >= 1,200,000이므로 cost 보너스 없음) + cafe + transport
    const expectedBonus =
      2 + // 환경 보너스
      daejeon.metrics.internet * 0.3 +
      // cost 보너스 없음 (1,350,000 >= 1,200,000)
      daejeon.metrics.cafe * 0.2 +
      daejeon.metrics.transport * 0.2;
    const score = calculateCityScore(daejeon, {
      ...defaultInput,
      preferredEnv: [],
      priority: ["internet", "cost", "cafe", "transport"],
    });
    expect(score).toBeCloseTo(daejeon.score + expectedBonus);
  });
});

// ────────────────────────────────────────────────────────────────
// findTopCities
// ────────────────────────────────────────────────────────────────
describe("findTopCities", () => {
  it("예산 초과 도시는 결과에서 제외된다", () => {
    // income=100, ratio=100 → maxBudget=1,000,000
    // 예산 이하: 전주(980,000), 춘천(1,050,000은 초과)
    // 실제로 monthlyCost <= 1,000,000: 전주(980,000)만 해당
    const input: FinderInput = {
      income: 100,
      budgetRatio: 100,
      preferredEnv: [],
      priority: [],
    };
    const results = findTopCities(CITIES, input);
    // maxBudget=1,000,000 → 전주(980,000)만 포함
    expect(results.every((r) => r.city.monthlyCost <= 1_000_000)).toBe(true);
    const names = results.map((r) => r.city.name);
    expect(names).toContain("전주");
    expect(names).not.toContain("홍대");
    expect(names).not.toContain("제주시");
  });

  it("결과가 점수 내림차순으로 정렬된다", () => {
    const input: FinderInput = {
      income: 500,
      budgetRatio: 100,
      preferredEnv: [],
      priority: [],
    };
    const results = findTopCities(CITIES, input, 7);
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
    }
  });

  it("topN=3이면 최대 3개만 반환한다", () => {
    const input: FinderInput = {
      income: 500,
      budgetRatio: 100,
      preferredEnv: [],
      priority: [],
    };
    const results = findTopCities(CITIES, input, 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("topN 기본값은 3이다", () => {
    const input: FinderInput = {
      income: 500,
      budgetRatio: 100,
      preferredEnv: [],
      priority: [],
    };
    const results = findTopCities(CITIES, input);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("모든 도시 예산 초과 시 빈 배열을 반환한다", () => {
    // income=1, ratio=1 → maxBudget=100원, 모든 도시 제외
    const input: FinderInput = {
      income: 1,
      budgetRatio: 1,
      preferredEnv: [],
      priority: [],
    };
    const results = findTopCities(CITIES, input);
    expect(results).toEqual([]);
  });

  it("preferredEnv 지정 시 매칭 도시가 더 높은 점수를 받는다", () => {
    // 환경 매칭된 도시 vs 매칭 안 된 도시 비교
    // preferredEnv=["자연친화"] → 자연친화 도시에 +2 보너스
    const withEnv: FinderInput = {
      income: 300,
      budgetRatio: 80,
      preferredEnv: ["자연친화"],
      priority: [],
    };
    const withoutEnv: FinderInput = {
      income: 300,
      budgetRatio: 80,
      preferredEnv: [],
      priority: [],
    };
    // 전주: environment=["자연친화","카페작업"] → 매칭 O → 보너스 +2
    const jeonju = getCity("jeonju");
    const scoreWithEnv = calculateCityScore(jeonju, withEnv);
    const scoreWithoutEnv = calculateCityScore(jeonju, withoutEnv);
    // 둘 다 보너스 +2이므로 동일 (선호 없음도 +2, 매칭도 +2)
    expect(scoreWithEnv).toBe(scoreWithoutEnv);

    // 홍대: environment=["도심선호","코워킹 필수"] → 자연친화 매칭 X → 보너스 없음
    const hongdae = getCity("hongdae");
    const hongdaeScoreWithEnv = calculateCityScore(hongdae, withEnv);
    const hongdaeScoreWithoutEnv = calculateCityScore(hongdae, withoutEnv);
    // 선호 없음 → +2, 선호 있으나 매칭 안 됨 → +0
    expect(hongdaeScoreWithoutEnv).toBeGreaterThan(hongdaeScoreWithEnv);
  });

  it("priority 지정 시 해당 지표가 높은 도시가 더 높은 점수를 받는다", () => {
    const withCafe: FinderInput = {
      income: 500,
      budgetRatio: 100,
      preferredEnv: [],
      priority: ["cafe"],
    };
    const withoutCafe: FinderInput = {
      income: 500,
      budgetRatio: 100,
      preferredEnv: [],
      priority: [],
    };
    // 강릉: metrics.cafe=9.5 → cafe 보너스 높음
    const gangneung = getCity("gangneung");
    const scoreWith = calculateCityScore(gangneung, withCafe);
    const scoreWithout = calculateCityScore(gangneung, withoutCafe);
    expect(scoreWith).toBeGreaterThan(scoreWithout);
  });

  it("topN=1이면 가장 높은 점수의 도시 1개만 반환한다", () => {
    const input: FinderInput = {
      income: 500,
      budgetRatio: 100,
      preferredEnv: [],
      priority: [],
    };
    const results = findTopCities(CITIES, input, 1);
    expect(results.length).toBe(1);

    // 더 많이 반환했을 때의 첫 번째와 동일해야 한다
    const allResults = findTopCities(CITIES, input, 7);
    expect(results[0].city.id).toBe(allResults[0].city.id);
  });

  it("예산 내 도시가 topN보다 적으면 있는 것만 반환한다", () => {
    // income=100, ratio=100 → maxBudget=1,000,000 → 전주(980,000)만 해당
    const input: FinderInput = {
      income: 100,
      budgetRatio: 100,
      preferredEnv: [],
      priority: [],
    };
    const results = findTopCities(CITIES, input, 3);
    expect(results.length).toBe(1);
    expect(results[0].city.id).toBe("jeonju");
  });
});
