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
    <header className="sticky top-0 z-50 border-b border-[#FF2D78]/30 bg-black/90 backdrop-blur-md"
      style={{ boxShadow: "0 0 20px rgba(255, 45, 120, 0.15)" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* 로고 */}
        <a
          href="#"
          className="font-mono text-xl font-bold tracking-wider hover:opacity-80 transition-opacity"
          style={{
            color: "#FF2D78",
            textShadow: "0 0 10px #FF2D78, 0 0 20px #FF2D78",
          }}
        >
          NOMAD<span style={{ color: "#00FFFF", textShadow: "0 0 10px #00FFFF" }}>.</span>KR
        </a>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-sm text-[#666] hover:text-[#FF2D78] transition-colors uppercase tracking-widest"
                style={{ transition: "color 0.2s, text-shadow 0.2s" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.textShadow = "0 0 8px #FF2D78";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.textShadow = "none";
                }}
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
            className="font-mono text-xs uppercase tracking-widest border border-[#FF2D78] text-[#FF2D78] bg-transparent hover:bg-[rgba(255,45,120,0.1)]"
            style={{ boxShadow: "0 0 8px rgba(255,45,120,0.4)" }}
          >
            JOIN →
          </Button>
        </div>

        {/* 모바일 햄버거 */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-[#FF2D78]">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-64 bg-black border-l border-[#FF2D78]/30 p-0"
          >
            <div className="flex flex-col h-full p-6">
              <div className="font-mono text-lg font-bold mb-8"
                style={{ color: "#FF2D78", textShadow: "0 0 10px #FF2D78" }}>
                NOMAD<span style={{ color: "#00FFFF" }}>.</span>KR
              </div>
              <ul className="flex flex-col gap-4 flex-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-mono text-sm text-[#666] hover:text-[#FF2D78] transition-colors block py-2 border-b border-[#1a1a1a] uppercase tracking-widest"
                    >
                      {">"} {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button
                className="font-mono text-xs uppercase tracking-widest border border-[#FF2D78] text-[#FF2D78] bg-transparent hover:bg-[rgba(255,45,120,0.1)] mt-4"
              >
                JOIN →
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
