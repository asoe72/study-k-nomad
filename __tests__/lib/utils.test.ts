import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("단일 클래스 문자열을 그대로 반환", () => {
    expect(cn("text-red-500")).toBe("text-red-500");
  });

  it("여러 클래스를 공백으로 병합", () => {
    expect(cn("flex", "items-center", "gap-2")).toBe("flex items-center gap-2");
  });

  it("false를 무시", () => {
    expect(cn("text-sm", false, "font-bold")).toBe("text-sm font-bold");
  });

  it("undefined를 무시", () => {
    expect(cn("px-4", undefined, "py-2")).toBe("px-4 py-2");
  });

  it("null을 무시", () => {
    expect(cn("rounded", null, "border")).toBe("rounded border");
  });

  it("조건부 클래스 — falsy 조건이면 해당 클래스 제외", () => {
    const isActive = false;
    expect(cn("btn", isActive && "btn-active")).toBe("btn");
  });

  it("조건부 클래스 — truthy 조건이면 해당 클래스 포함", () => {
    const isActive = true;
    expect(cn("btn", isActive && "btn-active")).toBe("btn btn-active");
  });

  it("Tailwind 충돌 클래스 — 마지막 클래스가 우선 (p-2 vs p-4 → p-4)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("Tailwind 충돌 클래스 — text-sm vs text-lg → text-lg", () => {
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("Tailwind 충돌 클래스 — bg-red-500 vs bg-blue-500 → bg-blue-500", () => {
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("인자 없이 호출하면 빈 문자열 반환", () => {
    expect(cn()).toBe("");
  });

  it("빈 문자열 인자를 무시", () => {
    expect(cn("flex", "", "gap-4")).toBe("flex gap-4");
  });
});
