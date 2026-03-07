-- ============================================================
-- 001_cities.sql  — k-nomad 초기 도시 데이터 (7개)
-- 001_schema.sql 실행 후 실행하세요.
-- ============================================================

INSERT INTO public.cities
  (id, rank, name, name_en, region, score, monthly_cost, monthly_rent,
   internet_speed, weather, aqi, symbol, map_x, map_y,
   tags, environment, budget, season, metrics)
VALUES
  (
    'jeju', 1, '제주시', 'JEJU', '제주도', 8.5,
    1580000, 550000, 82, '맑음 18°C', 32, '★', 28, 82,
    ARRAY['바다','자연','감성카페'],
    ARRAY['자연친화','카페작업'],
    '100~200만원',
    ARRAY['봄','가을'],
    '{"internet":8.2,"cafe":9.0,"transport":7.5,"nature":9.8,"nomadFriendly":9.2}'::jsonb
  ),
  (
    'busan', 2, '부산', 'BUSAN', '경상도', 8.1,
    1720000, 600000, 95, '흐림 15°C', 45, '★', 68, 72,
    ARRAY['바다','코워킹','교통'],
    ARRAY['자연친화','카페작업'],
    '100~200만원',
    ARRAY['여름','가을'],
    '{"internet":8.8,"cafe":8.5,"transport":8.9,"nature":8.0,"nomadFriendly":8.3}'::jsonb
  ),
  (
    'hongdae', 3, '서울 홍대', 'HONGDAE', '수도권', 8.3,
    2800000, 900000, 150, '맑음 12°C', 68, '◆', 38, 32,
    ARRAY['수도권','카페','교통'],
    ARRAY['도심선호','코워킹 필수'],
    '200만원 초과',
    ARRAY['봄','여름','가을','겨울'],
    '{"internet":9.5,"cafe":9.8,"transport":9.7,"nature":4.2,"nomadFriendly":9.0}'::jsonb
  ),
  (
    'daejeon', 4, '대전', 'DAEJEON', '충청도', 7.9,
    1350000, 480000, 120, '구름 10°C', 52, '▲', 45, 48,
    ARRAY['테크허브','저비용','교통'],
    ARRAY['코워킹 필수','카페작업'],
    '100만원 이하',
    ARRAY['봄','가을'],
    '{"internet":9.0,"cafe":7.8,"transport":8.5,"nature":6.5,"nomadFriendly":8.0}'::jsonb
  ),
  (
    'gangneung', 5, '강릉', 'GANGNEUNG', '강원도', 7.8,
    1180000, 420000, 75, '맑음 14°C', 25, '★', 65, 28,
    ARRAY['바다','카페','자연'],
    ARRAY['자연친화'],
    '100만원 이하',
    ARRAY['여름','겨울'],
    '{"internet":7.5,"cafe":9.5,"transport":6.8,"nature":9.2,"nomadFriendly":8.5}'::jsonb
  ),
  (
    'jeonju', 6, '전주', 'JEONJU', '전라도', 7.5,
    980000, 380000, 88, '흐림 13°C', 38, '◈', 32, 58,
    ARRAY['문화','저비용','한옥'],
    ARRAY['자연친화','카페작업'],
    '100만원 이하',
    ARRAY['봄','가을'],
    '{"internet":7.8,"cafe":8.2,"transport":7.2,"nature":7.8,"nomadFriendly":7.5}'::jsonb
  ),
  (
    'chuncheon', 7, '춘천', 'CHUNCHEON', '강원도', 7.2,
    1050000, 400000, 72, '맑음 9°C', 20, '●', 55, 25,
    ARRAY['산','자연','저비용'],
    ARRAY['자연친화'],
    '100만원 이하',
    ARRAY['봄','여름'],
    '{"internet":7.2,"cafe":7.5,"transport":7.0,"nature":9.0,"nomadFriendly":7.0}'::jsonb
  )
ON CONFLICT (id) DO NOTHING;
