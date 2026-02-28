"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[rgba(8,8,8,0.85)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* 로고 */}
        <Link
          href="/"
          className="font-mono text-xl font-bold neon-text tracking-wider hover:opacity-80 transition-opacity"
        >
          NOMAD<span className="text-[#00E5FF]">.</span>KR
        </Link>

        {/* CTA 버튼 */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="font-mono text-xs border border-[#00E5FF] text-[#00E5FF] bg-transparent hover:bg-[rgba(0,229,255,0.1)] hover:shadow-[0_0_8px_rgba(0,229,255,0.3)] transition-all px-3 py-1.5"
          >
            로그인
          </Link>
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
              <div className="flex flex-col gap-2 mt-4">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs border border-[#00E5FF] text-[#00E5FF] bg-transparent hover:bg-[rgba(0,229,255,0.1)] transition-all px-3 py-2 text-center"
                >
                  로그인
                </Link>
                <Button
                  className="font-mono text-xs border-[#00FF88] text-[#00FF88] bg-transparent hover:bg-[rgba(0,255,136,0.1)] border"
                >
                  JOIN →
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
