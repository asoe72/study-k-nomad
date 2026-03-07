"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function toggleVote(cityId: string, voteType: "like" | "dislike") {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 기존 투표 조회
  const { data: existing } = await supabase
    .from("votes")
    .select("id, vote_type")
    .eq("user_id", user.id)
    .eq("city_id", cityId)
    .maybeSingle();

  if (existing) {
    if (existing.vote_type === voteType) {
      // 같은 타입 → 취소(삭제)
      await supabase.from("votes").delete().eq("id", existing.id);
    } else {
      // 다른 타입 → 변경
      await supabase.from("votes").update({ vote_type: voteType }).eq("id", existing.id);
    }
  } else {
    // 신규 투표
    await supabase.from("votes").insert({ user_id: user.id, city_id: cityId, vote_type: voteType });
  }

  revalidatePath("/");
}
