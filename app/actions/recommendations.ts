"use server"

import { createClient } from "@/lib/supabase/server"

export async function saveRecommendations(mood: string, type: "movie" | "music", items: unknown, language: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { error } = await supabase.from("recommendations").insert({
    user_id: user.id,
    mood,
    recommendation_type: type,
    items,
    language,
  })

  if (error) {
    throw new Error(`Failed to save recommendations: ${error.message}`)
  }
}

export async function addToFavorites(
  itemId: string,
  itemType: "movie" | "music",
  title: string,
  imageUrl?: string,
  metadata?: Record<string, unknown>,
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { error } = await supabase.from("favorites").insert({
    user_id: user.id,
    item_id: itemId,
    item_type: itemType,
    title,
    image_url: imageUrl,
    metadata,
  })

  if (error) {
    throw new Error(`Failed to add to favorites: ${error.message}`)
  }
}

export async function getFavorites(itemType?: "movie" | "music") {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  let query = supabase.from("favorites").select("*").eq("user_id", user.id)

  if (itemType) {
    query = query.eq("item_type", itemType)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch favorites: ${error.message}`)
  }

  return data
}
