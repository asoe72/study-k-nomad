import { describe, it, expect } from "vitest";
import { cityRowToCity, type CityRow } from "@/lib/database.types";

const mockRow: CityRow = {
  id: "jeju",
  rank: 1,
  name: "제주시",
  name_en: "JEJU",
  region: "제주도",
  score: 8.5,
  monthly_cost: 1580000,
  monthly_rent: 550000,
  internet_speed: 82,
  weather: "맑음 18°C",
  aqi: 32,
  symbol: "★",
  map_x: 28,
  map_y: 82,
  tags: ["바다", "자연", "감성카페"],
  environment: ["자연친화", "카페작업"],
  budget: "100~200만원",
  season: ["봄", "가을"],
  metrics: {
    internet: 8.2,
    cafe: 9.0,
    transport: 7.5,
    nature: 9.8,
    nomadFriendly: 9.2,
  },
};

describe("cityRowToCity", () => {
  describe("snake_case → camelCase 필드 변환", () => {
    it("name_en → nameEn", () => {
      const city = cityRowToCity(mockRow);
      expect(city.nameEn).toBe("JEJU");
    });

    it("monthly_cost → monthlyCost", () => {
      const city = cityRowToCity(mockRow);
      expect(city.monthlyCost).toBe(1580000);
    });

    it("monthly_rent → monthlyRent", () => {
      const city = cityRowToCity(mockRow);
      expect(city.monthlyRent).toBe(550000);
    });

    it("internet_speed → internetSpeed", () => {
      const city = cityRowToCity(mockRow);
      expect(city.internetSpeed).toBe(82);
    });

    it("map_x → mapX", () => {
      const city = cityRowToCity(mockRow);
      expect(city.mapX).toBe(28);
    });

    it("map_y → mapY", () => {
      const city = cityRowToCity(mockRow);
      expect(city.mapY).toBe(82);
    });
  });

  describe("snake_case 없이 그대로 전달되는 필드", () => {
    it("id 그대로 전달", () => {
      const city = cityRowToCity(mockRow);
      expect(city.id).toBe("jeju");
    });

    it("rank 그대로 전달", () => {
      const city = cityRowToCity(mockRow);
      expect(city.rank).toBe(1);
    });

    it("name 그대로 전달", () => {
      const city = cityRowToCity(mockRow);
      expect(city.name).toBe("제주시");
    });

    it("score 그대로 전달", () => {
      const city = cityRowToCity(mockRow);
      expect(city.score).toBe(8.5);
    });

    it("region 그대로 전달", () => {
      const city = cityRowToCity(mockRow);
      expect(city.region).toBe("제주도");
    });

    it("weather 그대로 전달", () => {
      const city = cityRowToCity(mockRow);
      expect(city.weather).toBe("맑음 18°C");
    });

    it("aqi 그대로 전달", () => {
      const city = cityRowToCity(mockRow);
      expect(city.aqi).toBe(32);
    });

    it("symbol 그대로 전달", () => {
      const city = cityRowToCity(mockRow);
      expect(city.symbol).toBe("★");
    });

    it("tags 그대로 전달", () => {
      const city = cityRowToCity(mockRow);
      expect(city.tags).toEqual(["바다", "자연", "감성카페"]);
    });

    it("budget 그대로 전달", () => {
      const city = cityRowToCity(mockRow);
      expect(city.budget).toBe("100~200만원");
    });

    it("season 그대로 전달", () => {
      const city = cityRowToCity(mockRow);
      expect(city.season).toEqual(["봄", "가을"]);
    });

    it("environment 그대로 전달", () => {
      const city = cityRowToCity(mockRow);
      expect(city.environment).toEqual(["자연친화", "카페작업"]);
    });
  });

  describe("metrics 객체 매핑", () => {
    it("metrics 객체 전체가 그대로 매핑됨", () => {
      const city = cityRowToCity(mockRow);
      expect(city.metrics).toEqual({
        internet: 8.2,
        cafe: 9.0,
        transport: 7.5,
        nature: 9.8,
        nomadFriendly: 9.2,
      });
    });

    it("metrics.internet 값 확인", () => {
      const city = cityRowToCity(mockRow);
      expect(city.metrics.internet).toBe(8.2);
    });

    it("metrics.nomadFriendly 값 확인", () => {
      const city = cityRowToCity(mockRow);
      expect(city.metrics.nomadFriendly).toBe(9.2);
    });
  });

  describe("likes / dislikes 파라미터 매핑", () => {
    it("likes 파라미터를 올바르게 매핑", () => {
      const city = cityRowToCity(mockRow, 128, 12);
      expect(city.likes).toBe(128);
    });

    it("dislikes 파라미터를 올바르게 매핑", () => {
      const city = cityRowToCity(mockRow, 128, 12);
      expect(city.dislikes).toBe(12);
    });

    it("likes 기본값 0 (파라미터 생략 시)", () => {
      const city = cityRowToCity(mockRow);
      expect(city.likes).toBe(0);
    });

    it("dislikes 기본값 0 (파라미터 생략 시)", () => {
      const city = cityRowToCity(mockRow);
      expect(city.dislikes).toBe(0);
    });

    it("likes만 전달 시 dislikes 기본값 0", () => {
      const city = cityRowToCity(mockRow, 50);
      expect(city.likes).toBe(50);
      expect(city.dislikes).toBe(0);
    });
  });
});
