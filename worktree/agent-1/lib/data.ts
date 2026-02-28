export interface CityMetrics {
  internet: number;   // 0-10
  cafe: number;       // 0-10
  transport: number;  // 0-10
  nature: number;     // 0-10
  nomadFriendly: number; // 0-10
}

export interface City {
  id: string;
  rank: number;
  name: string;
  nameEn: string;
  region: string;
  score: number;
  monthlyCost: number;      // 월 생활비 (원)
  monthlyRent: number;      // 원룸 월세 (원)
  metrics: CityMetrics;
  tags: string[];
  environment: string[];
  internetSpeed: number;    // Mbps
  weather: string;
  aqi: number;
  symbol: string;
  mapX: number;             // 지도 X 위치 (%)
  mapY: number;             // 지도 Y 위치 (%)
}

export interface TickerItem {
  icon: string;
  text: string;
  value: string;
  trend?: "up" | "down" | "neutral";
}

export interface TravelingNomad {
  handle: string;
  job: string;
  cityName: string;
  avatarText: string;
  checkedIn: string;
}

export interface Meetup {
  date: string;
  dayOfWeek: string;
  cityName: string;
  title: string;
  attendees: number;
  location: string;
}

export interface Review {
  handle: string;
  rating: number;
  text: string;
  cityName: string;
  cityId: string;
}

export interface HowItWorksStep {
  step: string;
  icon: string;
  title: string;
  description: string;
}

export interface MapPin {
  cityId: string;
  symbol: string;
  name: string;
  score: number;
  cost: number;
  label: string;
  top: string;
  left: string;
}

// ─── 도시 데이터 ───────────────────────────────────────────

export const CITIES: City[] = [
  {
    id: "jeju",
    rank: 1,
    name: "제주시",
    nameEn: "JEJU",
    region: "제주특별자치도",
    score: 8.5,
    monthlyCost: 1580000,
    monthlyRent: 550000,
    metrics: { internet: 8.2, cafe: 9.0, transport: 7.5, nature: 9.8, nomadFriendly: 9.2 },
    tags: ["바다", "자연", "감성카페"],
    environment: ["바다", "산"],
    internetSpeed: 82,
    weather: "맑음 18°C",
    aqi: 32,
    symbol: "★",
    mapX: 28,
    mapY: 82,
  },
  {
    id: "busan",
    rank: 2,
    name: "부산",
    nameEn: "BUSAN",
    region: "부산광역시",
    score: 8.1,
    monthlyCost: 1720000,
    monthlyRent: 600000,
    metrics: { internet: 8.8, cafe: 8.5, transport: 8.9, nature: 8.0, nomadFriendly: 8.3 },
    tags: ["바다", "코워킹", "교통"],
    environment: ["바다", "도시"],
    internetSpeed: 95,
    weather: "흐림 15°C",
    aqi: 45,
    symbol: "★",
    mapX: 68,
    mapY: 72,
  },
  {
    id: "hongdae",
    rank: 3,
    name: "서울 홍대",
    nameEn: "HONGDAE",
    region: "서울 마포구",
    score: 8.3,
    monthlyCost: 2800000,
    monthlyRent: 900000,
    metrics: { internet: 9.5, cafe: 9.8, transport: 9.7, nature: 4.2, nomadFriendly: 9.0 },
    tags: ["수도권", "카페", "교통"],
    environment: ["도시"],
    internetSpeed: 150,
    weather: "맑음 12°C",
    aqi: 68,
    symbol: "◆",
    mapX: 38,
    mapY: 32,
  },
  {
    id: "daejeon",
    rank: 4,
    name: "대전",
    nameEn: "DAEJEON",
    region: "대전광역시",
    score: 7.9,
    monthlyCost: 1350000,
    monthlyRent: 480000,
    metrics: { internet: 9.0, cafe: 7.8, transport: 8.5, nature: 6.5, nomadFriendly: 8.0 },
    tags: ["테크허브", "저비용", "교통"],
    environment: ["도시"],
    internetSpeed: 120,
    weather: "구름 10°C",
    aqi: 52,
    symbol: "▲",
    mapX: 45,
    mapY: 48,
  },
  {
    id: "gangneung",
    rank: 5,
    name: "강릉",
    nameEn: "GANGNEUNG",
    region: "강원특별자치도",
    score: 7.8,
    monthlyCost: 1180000,
    monthlyRent: 420000,
    metrics: { internet: 7.5, cafe: 9.5, transport: 6.8, nature: 9.2, nomadFriendly: 8.5 },
    tags: ["바다", "카페", "자연"],
    environment: ["바다", "산"],
    internetSpeed: 75,
    weather: "맑음 14°C",
    aqi: 25,
    symbol: "★",
    mapX: 65,
    mapY: 28,
  },
  {
    id: "jeonju",
    rank: 6,
    name: "전주",
    nameEn: "JEONJU",
    region: "전북특별자치도",
    score: 7.5,
    monthlyCost: 980000,
    monthlyRent: 380000,
    metrics: { internet: 7.8, cafe: 8.2, transport: 7.2, nature: 7.8, nomadFriendly: 7.5 },
    tags: ["문화", "저비용", "한옥"],
    environment: ["문화", "도시"],
    internetSpeed: 88,
    weather: "흐림 13°C",
    aqi: 38,
    symbol: "◈",
    mapX: 32,
    mapY: 58,
  },
  {
    id: "chuncheon",
    rank: 7,
    name: "춘천",
    nameEn: "CHUNCHEON",
    region: "강원특별자치도",
    score: 7.2,
    monthlyCost: 1050000,
    monthlyRent: 400000,
    metrics: { internet: 7.2, cafe: 7.5, transport: 7.0, nature: 9.0, nomadFriendly: 7.0 },
    tags: ["산", "자연", "저비용"],
    environment: ["산"],
    internetSpeed: 72,
    weather: "맑음 9°C",
    aqi: 20,
    symbol: "●",
    mapX: 55,
    mapY: 25,
  },
];

// ─── 티커 데이터 ───────────────────────────────────────────

export const TICKER_ITEMS: TickerItem[] = [
  { icon: "📡", text: "제주 인터넷", value: "82Mbps ▲", trend: "up" },
  { icon: "☕", text: "강릉 카페밀도", value: "9.5점" },
  { icon: "💵", text: "전주 생활비", value: "₩980,000", trend: "neutral" },
  { icon: "🌊", text: "부산 AQI", value: "45 (좋음)" },
  { icon: "⚡", text: "홍대 인터넷", value: "150Mbps ★" },
  { icon: "🌿", text: "춘천 공기질", value: "AQI 20 (최상)", trend: "up" },
  { icon: "🏠", text: "대전 원룸월세", value: "₩480,000" },
  { icon: "👥", text: "이번 달 리뷰", value: "460건 ▲", trend: "up" },
  { icon: "🛩", text: "현재 노마드", value: "39,671명 접속 중" },
  { icon: "📅", text: "밋업 예정", value: "2월 25일 제주 카페투어" },
  { icon: "🌡", text: "제주 날씨", value: "맑음 18°C" },
  { icon: "🔥", text: "이번 주 HOT", value: "#1 강릉 ↑ 급상승" },
];

// ─── 여행 중인 노마드 ──────────────────────────────────────

export const TRAVELING_NOMADS: TravelingNomad[] = [
  { handle: "@minjeong_kr", job: "프리랜서 디자이너", cityName: "제주시", avatarText: "MJ", checkedIn: "3일 전" },
  { handle: "@devjunho", job: "풀스택 개발자", cityName: "부산", avatarText: "JH", checkedIn: "1일 전" },
  { handle: "@remote_yuna", job: "UX 리서처", cityName: "강릉", avatarText: "YN", checkedIn: "5일 전" },
  { handle: "@writer_sori", job: "콘텐츠 작가", cityName: "전주", avatarText: "SR", checkedIn: "2일 전" },
  { handle: "@nomad_hana", job: "마케터", cityName: "서울 홍대", avatarText: "HN", checkedIn: "오늘" },
];

// ─── 밋업 데이터 ───────────────────────────────────────────

export const MEETUPS: Meetup[] = [
  { date: "25 FEB", dayOfWeek: "TUE", cityName: "제주시", title: "제주 카페 투어 & 네트워킹", attendees: 14, location: "제주시 구도심" },
  { date: "1 MAR", dayOfWeek: "SAT", cityName: "부산", title: "해운대 코워킹 밋업", attendees: 22, location: "해운대 코워킹스페이스" },
  { date: "8 MAR", dayOfWeek: "SAT", cityName: "서울 홍대", title: "홍대 노마드 커뮤니티 밋업", attendees: 38, location: "합정 카페거리" },
];

// ─── 리뷰 데이터 ───────────────────────────────────────────

export const REVIEWS: Review[] = [
  { handle: "@minjeong_kr", rating: 5, text: "제주 카페 와이파이 진짜 빠름. 한달살기 최고!", cityName: "제주시", cityId: "jeju" },
  { handle: "@devjunho", rating: 4, text: "부산 바다뷰 카페에서 코딩하는 느낌 굿. 교통도 편해요.", cityName: "부산", cityId: "busan" },
  { handle: "@remote_yuna", rating: 5, text: "강릉 커피 문화 최고. 바다 보며 작업하면 영감 폭발!", cityName: "강릉", cityId: "gangneung" },
];

// ─── How It Works 데이터 ───────────────────────────────────

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: "01",
    icon: "🗺",
    title: "도시 탐색",
    description: "7개 도시의 노마드 조건을 인터넷·카페·교통·자연·친화도 5개 지표로 한눈에 비교합니다.",
  },
  {
    step: "02",
    icon: "🧪",
    title: "계산기 실행",
    description: "월 수입과 선호 환경을 입력하면 나에게 맞는 도시 TOP 3를 즉시 추천해드립니다.",
  },
  {
    step: "03",
    icon: "✍",
    title: "리뷰 작성",
    description: "실제 체류 경험을 5개 항목 별점과 텍스트로 남겨 커뮤니티에 기여하세요.",
  },
  {
    step: "04",
    icon: "🤝",
    title: "커뮤니티 참여",
    description: "도시별 밋업·동행·커뮤니케이션으로 같은 라이프스타일의 노마드와 연결됩니다.",
  },
];

// ─── 지도 핀 데이터 ────────────────────────────────────────

export const MAP_PINS: MapPin[] = [
  { cityId: "jeju", symbol: "★", name: "제주시", score: 8.5, cost: 1580000, label: "#1", top: "75%", left: "28%" },
  { cityId: "busan", symbol: "★", name: "부산", score: 8.1, cost: 1720000, label: "#2", top: "70%", left: "68%" },
  { cityId: "hongdae", symbol: "◆", name: "서울 홍대", score: 8.3, cost: 2800000, label: "#3", top: "30%", left: "38%" },
  { cityId: "daejeon", symbol: "▲", name: "대전", score: 7.9, cost: 1350000, label: "#4", top: "48%", left: "45%" },
  { cityId: "gangneung", symbol: "★", name: "강릉", score: 7.8, cost: 1180000, label: "#5", top: "25%", left: "65%" },
  { cityId: "jeonju", symbol: "◈", name: "전주", score: 7.5, cost: 980000, label: "#6", top: "58%", left: "32%" },
  { cityId: "chuncheon", symbol: "●", name: "춘천", score: 7.2, cost: 1050000, label: "#7", top: "22%", left: "55%" },
];

// ─── 유틸 함수 ─────────────────────────────────────────────

export function scoreToBlocks(score: number): string {
  const total = 10;
  const filled = Math.floor(score);
  const half = score - filled >= 0.5 ? 1 : 0;
  const empty = total - filled - half;
  return "█".repeat(filled) + (half ? "▒" : "") + "░".repeat(empty);
}

export function metricToBlocks(value: number): string {
  const total = 10;
  const filled = Math.floor(value);
  const empty = total - filled;
  return "█".repeat(filled) + "░".repeat(empty);
}

export function formatKRW(amount: number): string {
  return "₩" + amount.toLocaleString("ko-KR");
}

export function formatKRWShort(amount: number): string {
  const man = Math.round(amount / 10000);
  return `₩${man}만`;
}

export function getFilteredCities(filter: string): City[] {
  if (filter === "all") return CITIES;
  if (filter === "수도권") return CITIES.filter((c) => c.environment.includes("도시") && c.id === "hongdae");
  if (filter === "제주") return CITIES.filter((c) => c.id === "jeju");
  if (filter === "바다") return CITIES.filter((c) => c.environment.includes("바다"));
  if (filter === "산·자연") return CITIES.filter((c) => c.environment.includes("산"));
  if (filter === "저비용") return CITIES.filter((c) => c.monthlyCost < 1200000);
  return CITIES;
}
