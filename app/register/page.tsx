"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (form.password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { username: form.username },
      },
    });
    setIsLoading(false);

    if (signUpError) {
      if (signUpError.message.includes("already registered")) {
        setError("이미 사용 중인 이메일입니다.");
      } else {
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/"), 1500);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* 배경 그리드 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.02) 1px, transparent 1px)",
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
            nomad — register.sh
          </span>
        </div>

        {/* 폼 바디 */}
        <div className="terminal-body p-6 space-y-5">
          {success ? (
            /* 성공 화면 */
            <div className="space-y-4 text-center py-4">
              <p className="terminal-highlight text-lg font-mono">✓ 가입 완료</p>
              <p className="terminal-output text-xs">
                &gt; 계정이 성공적으로 생성되었습니다.
              </p>
              <p className="terminal-output text-xs">
                &gt; 노마드 커뮤니티에 오신 것을 환영합니다!
              </p>
              <Link
                href="/login"
                className="inline-block font-mono text-sm border border-[#00FF88] text-[#00FF88] px-6 py-2 hover:bg-[rgba(0,255,136,0.1)] hover:shadow-[0_0_12px_rgba(0,255,136,0.4)] transition-all mt-2"
              >
                ▶ 로그인하러 가기
              </Link>
            </div>
          ) : (
            <>
              <div>
                <p className="terminal-prompt text-sm mb-1">
                  $ nomad --auth register
                </p>
                <p className="terminal-output text-xs">
                  &gt; 새 계정을 생성합니다...
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 닉네임 */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-gray-400">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="nomad_username"
                    className="w-full bg-[#0a0a0a] border border-[#333] text-[#e0e0e0] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[#00E5FF] transition-colors placeholder:text-[#444]"
                    autoComplete="username"
                  />
                </div>

                {/* 이메일 */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-gray-400">
                    EMAIL_ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="user@nomad.kr"
                    className="w-full bg-[#0a0a0a] border border-[#333] text-[#e0e0e0] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[#00E5FF] transition-colors placeholder:text-[#444]"
                    autoComplete="email"
                  />
                </div>

                {/* 비밀번호 */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-gray-400">
                    PASSWORD{" "}
                    <span className="text-[#555]">(8자 이상)</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-[#0a0a0a] border border-[#333] text-[#e0e0e0] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[#00E5FF] transition-colors placeholder:text-[#444]"
                    autoComplete="new-password"
                  />
                </div>

                {/* 비밀번호 확인 */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-gray-400">
                    CONFIRM_PASSWORD
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-[#0a0a0a] border border-[#333] text-[#e0e0e0] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[#00E5FF] transition-colors placeholder:text-[#444]"
                    autoComplete="new-password"
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
                  className="w-full font-mono text-sm border border-[#00E5FF] text-[#00E5FF] bg-transparent hover:bg-[rgba(0,229,255,0.1)] hover:shadow-[0_0_12px_rgba(0,229,255,0.4)] transition-all py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-pulse">▶ 계정 생성 중</span>
                      <span className="terminal-cursor" />
                    </span>
                  ) : (
                    "▶ 회원가입 실행"
                  )}
                </button>
              </form>

              {/* 구분선 */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#222]" />
                <span className="font-mono text-xs text-gray-600">OR</span>
                <div className="flex-1 h-px bg-[#222]" />
              </div>

              {/* 로그인 링크 */}
              <p className="font-mono text-xs text-gray-500 text-center">
                이미 계정이 있으신가요?{" "}
                <Link
                  href="/login"
                  className="text-[#00FF88] hover:text-[#00E5FF] transition-colors underline underline-offset-2"
                >
                  로그인 →
                </Link>
              </p>

              {/* 터미널 프롬프트 */}
              <p className="terminal-output text-xs pt-2 border-t border-[#1a1a1a]">
                $ _<span className="terminal-cursor" />
              </p>
            </>
          )}
        </div>
      </div>

      {/* 하단 텍스트 */}
      <p className="font-mono text-xs text-gray-600 mt-6">
        NOMAD.KR — v1.0.0 · 한국 디지털 노마드 커뮤니티
      </p>
    </div>
  );
}
