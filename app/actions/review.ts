"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function submitReview(
  cityId: string,
  ratings: Record<string, number>,
  content: string
) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 평균 별점 계산 (1~5 범위 보정)
  const ratingValues = Object.values(ratings).filter((v) => v > 0);
  const avgRating = ratingValues.length > 0
    ? Math.round(ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length)
    : 3;
  const clampedRating = Math.max(1, Math.min(5, avgRating));

  await supabase.from("reviews").insert({
    user_id: user.id,
    city_id: cityId,
    content: content.trim(),
    rating: clampedRating,
  });

  revalidatePath("/");
}
