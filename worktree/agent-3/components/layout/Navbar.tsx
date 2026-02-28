"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "#cities", label: "도시 랭킹" },
  { href: "#map", label: "지도" },
  { href: "#live-feed", label: "커뮤니티" },
  { href: "#finder", label: "내 도시 찾기" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF7]/90 backdrop-blur-md"
      style={{ borderBottom: "1px solid #D4C5A9" }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* 로고 */}
        <a
          href="#"
          className="text-xl font-medium tracking-wide hover:opacity-70 transition-opacity"
          style={{ color: "#2D6A4F", fontFamily: "Lora, Georgia, serif" }}
        >
          Nomad<span style={{ color: "#87A878" }}>.</span>KR
        </a>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-light tracking-wide transition-colors"
                style={{ color: "#6B7A6B" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#2D6A4F")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6B7A6B")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA 버튼 */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            size="sm"
            className="text-xs font-light tracking-wider border"
            style={{
              borderColor: "#2D6A4F",
              color: "#2D6A4F",
              background: "transparent",
              borderRadius: "8px",
            }}
          >
            함께하기
          </Button>
        </div>

        {/* 모바일 햄버거 */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" style={{ color: "#2D6A4F" }}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-64 p-0"
            style={{ background: "#FAFAF7", borderLeft: "1px solid #D4C5A9" }}
          >
            <div className="flex flex-col h-full p-6">
              <div className="text-lg font-medium mb-8"
                style={{ color: "#2D6A4F", fontFamily: "Lora, serif" }}>
                Nomad<span style={{ color: "#87A878" }}>.</span>KR
              </div>
              <ul className="flex flex-col gap-2 flex-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-light tracking-wide block py-3"
                      style={{ color: "#6B7A6B", borderBottom: "1px solid #E9D8A6" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button
                className="text-xs font-light tracking-wider mt-4"
                style={{ background: "#2D6A4F", color: "#FFFFFF", borderRadius: "8px" }}
              >
                함께하기
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
