import type { City } from "./data";

export interface FinderInput {
  income: number;         // 만원 단위
  budgetRatio: number;    // 20~100 (%)
  preferredEnv: string[]; // 선호 환경 목록
  priority: string[];     // 우선순위 목록
}

export interface FinderResult {
  city: City;
  score: number;
}

export function calculateMaxBudget(income: number, budgetRatio: number): number {
  return income * 10000 * (budgetRatio / 100);
}

export function calculateCityScore(city: City, input: FinderInput): number {
  let bonus = 0;
  if (
    input.preferredEnv.length === 0 ||
    input.preferredEnv.some((e) => (city.environment as string[]).includes(e))
  ) {
    bonus += 2;
  }
  if (input.priority.includes("internet")) bonus += city.metrics.internet * 0.3;
  if (input.priority.includes("cost") && city.monthlyCost < 1200000) bonus += 2;
  if (input.priority.includes("cafe")) bonus += city.metrics.cafe * 0.2;
  if (input.priority.includes("transport")) bonus += city.metrics.transport * 0.2;
  return city.score + bonus;
}

export function findTopCities(
  cities: City[],
  input: FinderInput,
  topN: number = 3
): FinderResult[] {
  const maxBudget = calculateMaxBudget(input.income, input.budgetRatio);

  return cities
    .filter((city) => city.monthlyCost <= maxBudget || maxBudget <= 0)
    .map((city) => ({ city, score: calculateCityScore(city, input) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}
