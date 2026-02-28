"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    // 실제 인증 로직 자리
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* 배경 그리드 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 로고 */}
      <Link
        href="/"
        className="font-mono text-2xl font-bold mb-8 tracking-wider hover:opacity-80 transition-opacity neon-text"
      >
        NOMAD<span className="text-[#00E5FF]">.</span>KR
      </Link>

      {/* 터미널 카드 */}
      <div className="terminal-window w-full max-w-md">
        {/* 타이틀바 */}
        <div className="terminal-titlebar">
          <span className="terminal-dot terminal-dot-red" />
          <span className="terminal-dot terminal-dot-yellow" />
          <span className="terminal-dot terminal-dot-green" />
          <span className="font-mono text-xs text-gray-500 ml-2">
            nomad — login.sh
          </span>
        </div>

        {/* 폼 바디 */}
        <div className="terminal-body p-6 space-y-5">
          <div>
            <p className="terminal-prompt text-sm mb-1">
              $ nomad --auth login
            </p>
            <p className="terminal-output text-xs">
              &gt; 인증 세션을 시작합니다...
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이메일 */}
            <div className="space-y-1">
              <label className="font-mono text-xs text-gray-400">
                EMAIL_ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@nomad.kr"
                className="w-full bg-[#0a0a0a] border border-[#333] text-[#e0e0e0] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[#00FF88] transition-colors placeholder:text-[#444]"
                autoComplete="email"
              />
            </div>

            {/* 비밀번호 */}
            <div className="space-y-1">
              <label className="font-mono text-xs text-gray-400">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0a0a0a] border border-[#333] text-[#e0e0e0] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[#00FF88] transition-colors placeholder:text-[#444]"
                autoComplete="current-password"
              />
            </div>

            {/* 에러 메시지 */}
            {error && (
              <p className="font-mono text-xs text-red-400 border border-red-900 bg-red-950/30 px-3 py-2">
                ✗ {error}
              </p>
            )}

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-mono text-sm border border-[#00FF88] text-[#00FF88] bg-transparent hover:bg-[rgba(0,255,136,0.1)] hover:shadow-[0_0_12px_rgba(0,255,136,0.4)] transition-all py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-pulse">▶ 인증 중</span>
                  <span className="terminal-cursor" />
                </span>
              ) : (
                "▶ 로그인 실행"
              )}
            </button>
          </form>

          {/* 구분선 */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#222]" />
            <span className="font-mono text-xs text-gray-600">OR</span>
            <div className="flex-1 h-px bg-[#222]" />
          </div>

          {/* 회원가입 링크 */}
          <p className="font-mono text-xs text-gray-500 text-center">
            계정이 없으신가요?{" "}
            <Link
              href="/register"
              className="text-[#00E5FF] hover:text-[#00FF88] transition-colors underline underline-offset-2"
            >
              회원가입 →
            </Link>
          </p>

          {/* 터미널 프롬프트 */}
          <p className="terminal-output text-xs pt-2 border-t border-[#1a1a1a]">
            $ _<span className="terminal-cursor" />
          </p>
        </div>
      </div>

      {/* 하단 텍스트 */}
      <p className="font-mono text-xs text-gray-600 mt-6">
        NOMAD.KR — v1.0.0 · 한국 디지털 노마드 커뮤니티
      </p>
    </div>
  );
}
