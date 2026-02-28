import type { Metadata } from "next";
import "./globals.css";
import ScanlineOverlay from "@/components/ScanlineOverlay";
import CustomCursor from "@/components/CustomCursor";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "NOMAD.KR — 한국 디지털 노마드 도시 랭킹",
  description:
    "한국 7개 도시의 디지털 노마드 생활 조건을 한눈에 비교하세요. 인터넷 속도, 카페 밀도, 생활비, 자연환경 등 5개 지표로 분석한 실시간 랭킹 플랫폼.",
  keywords: ["디지털노마드", "원격근무", "한국", "도시랭킹", "제주", "부산", "코워킹"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[#080808] text-gray-200 antialiased">
        <TooltipProvider>
          <ScanlineOverlay />
          <CustomCursor />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
