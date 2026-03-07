-- ============================================================
-- 001_schema.sql  — k-nomad Supabase 스키마
-- Supabase Dashboard > SQL Editor 에서 실행하세요.
-- ============================================================

-- ─── 1. cities ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cities (
  id            TEXT PRIMARY KEY,
  rank          INTEGER NOT NULL,
  name          TEXT    NOT NULL,
  name_en       TEXT    NOT NULL,
  region        TEXT    NOT NULL,
  score         NUMERIC(3,1) NOT NULL,
  monthly_cost  INTEGER NOT NULL,
  monthly_rent  INTEGER NOT NULL,
  internet_speed INTEGER NOT NULL,
  weather       TEXT    NOT NULL,
  aqi           INTEGER NOT NULL,
  symbol        TEXT    NOT NULL,
  map_x         INTEGER NOT NULL,
  map_y         INTEGER NOT NULL,
  tags          TEXT[]  NOT NULL DEFAULT '{}',
  environment   TEXT[]  NOT NULL DEFAULT '{}',
  budget        TEXT    NOT NULL,
  season        TEXT[]  NOT NULL DEFAULT '{}',
  metrics       JSONB   NOT NULL DEFAULT '{}'
);

-- ─── 2. profiles ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id        UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username  TEXT NOT NULL
);

-- ─── 3. votes ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.votes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  city_id    TEXT NOT NULL REFERENCES public.cities(id) ON DELETE CASCADE,
  vote_type  TEXT NOT NULL CHECK (vote_type IN ('like', 'dislike')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, city_id)
);

-- ─── 4. reviews ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reviews (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  city_id    TEXT NOT NULL REFERENCES public.cities(id) ON DELETE CASCADE,
  content    TEXT NOT NULL DEFAULT '',
  rating     INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── 5. View: city_vote_counts ────────────────────────────────
CREATE OR REPLACE VIEW public.city_vote_counts AS
SELECT
  city_id,
  COUNT(*) FILTER (WHERE vote_type = 'like')    AS likes,
  COUNT(*) FILTER (WHERE vote_type = 'dislike') AS dislikes
FROM public.votes
GROUP BY city_id;

-- ─── 6. Trigger: 신규 가입 시 profiles 자동 생성 ─────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'username',
      NEW.raw_user_meta_data->>'full_name',
      split_part(NEW.email, '@', 1)
    )
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── 7. RLS ──────────────────────────────────────────────────
ALTER TABLE public.cities  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- cities: 전체 조회 허용
CREATE POLICY "cities_select_all"
  ON public.cities FOR SELECT USING (true);

-- profiles: 본인 조회
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

-- votes: 인증된 사용자 INSERT, 본인 DELETE
CREATE POLICY "votes_insert_auth"
  ON public.votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "votes_select_all"
  ON public.votes FOR SELECT USING (true);

CREATE POLICY "votes_delete_own"
  ON public.votes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "votes_update_own"
  ON public.votes FOR UPDATE USING (auth.uid() = user_id);

-- reviews: 인증된 사용자 INSERT, 전체 조회, 본인 DELETE
CREATE POLICY "reviews_insert_auth"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reviews_select_all"
  ON public.reviews FOR SELECT USING (true);

CREATE POLICY "reviews_delete_own"
  ON public.reviews FOR DELETE USING (auth.uid() = user_id);
