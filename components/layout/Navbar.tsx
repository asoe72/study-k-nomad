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
    <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[rgba(8,8,8,0.85)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* 로고 */}
        <a
          href="#"
          className="font-mono text-xl font-bold neon-text tracking-wider hover:opacity-80 transition-opacity"
        >
          NOMAD<span className="text-[#00E5FF]">.</span>KR
        </a>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-sm text-gray-400 hover:text-[#00FF88] transition-colors"
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
            className="font-mono text-xs border-[#00FF88] text-[#00FF88] bg-transparent hover:bg-[rgba(0,255,136,0.1)] border"
          >
            JOIN →
          </Button>
        </div>

        {/* 모바일 햄버거 */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-[#00FF88]">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-64 bg-[#0f0f0f] border-l border-[#222] p-0"
          >
            <div className="flex flex-col h-full p-6">
              <div className="font-mono text-lg font-bold neon-text mb-8">
                NOMAD<span className="text-[#00E5FF]">.</span>KR
              </div>
              <ul className="flex flex-col gap-4 flex-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-mono text-sm text-gray-400 hover:text-[#00FF88] transition-colors block py-2 border-b border-[#1a1a1a]"
                    >
                      {">"} {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button
                className="font-mono text-xs border-[#00FF88] text-[#00FF88] bg-transparent hover:bg-[rgba(0,255,136,0.1)] border mt-4"
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
