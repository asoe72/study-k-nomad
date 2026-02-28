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
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md"
      style={{ borderBottom: "1px solid rgba(212, 175, 55, 0.2)" }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* 로고 */}
        <a
          href="#"
          className="text-xl tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontWeight: 400,
            background: "linear-gradient(135deg, #D4AF37 0%, #F7E7CE 50%, #D4AF37 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Nomad<span style={{ WebkitTextFillColor: "#F7E7CE" }}>.</span>KR
        </a>

        {/* 골드 구분선 */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-4 w-px"
          style={{ background: "rgba(212, 175, 55, 0.3)" }} />

        {/* 데스크탑 메뉴 */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs tracking-[0.15em] uppercase transition-colors"
                style={{ color: "#555555", fontFamily: "Cormorant Garamond, serif" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#D4AF37")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#555555")}
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
            className="text-xs tracking-[0.15em] uppercase border"
            style={{
              borderColor: "#D4AF37",
              color: "#D4AF37",
              background: "transparent",
              fontFamily: "Cormorant Garamond, serif",
              letterSpacing: "0.15em",
            }}
          >
            입장하기
          </Button>
        </div>

        {/* 모바일 햄버거 */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" style={{ color: "#D4AF37" }}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-64 p-0"
            style={{ background: "#0A0A0A", borderLeft: "1px solid rgba(212,175,55,0.2)" }}
          >
            <div className="flex flex-col h-full p-6">
              <div className="text-lg tracking-[0.2em] uppercase mb-8"
                style={{ color: "#D4AF37", fontFamily: "Cormorant Garamond, serif" }}>
                Nomad.KR
              </div>
              <ul className="flex flex-col gap-2 flex-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-xs tracking-[0.12em] uppercase block py-3"
                      style={{ color: "#555", borderBottom: "1px solid #1A1A1A" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button
                className="text-xs tracking-[0.15em] uppercase mt-4"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #B8960C)",
                  color: "#0A0A0A",
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                입장하기
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
