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
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* 로고 */}
        <a
          href="#"
          className="text-xl font-semibold tracking-tight text-gray-900 hover:text-blue-500 transition-colors"
        >
          Nomad<span className="text-blue-500">.</span>KR
        </a>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-light text-gray-500 hover:text-gray-900 transition-colors tracking-wide"
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
            className="text-xs bg-blue-500 text-white hover:bg-blue-600 border-0 px-4 font-medium"
          >
            시작하기
          </Button>
        </div>

        {/* 모바일 햄버거 */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-64 bg-white border-l border-gray-100 p-0"
          >
            <div className="flex flex-col h-full p-6">
              <div className="text-lg font-semibold text-gray-900 mb-8">
                Nomad<span className="text-blue-500">.</span>KR
              </div>
              <ul className="flex flex-col gap-2 flex-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-light text-gray-500 hover:text-gray-900 transition-colors block py-3 border-b border-gray-50"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button className="text-xs bg-blue-500 text-white hover:bg-blue-600 mt-4">
                시작하기
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
