import { createClient } from "@/lib/supabase/server"

export async function GET(req: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const itemType = searchParams.get("type")

    let query = supabase.from("favorites").select("*").eq("user_id", user.id).order("created_at", { ascending: false })

    if (itemType) {
      query = query.eq("item_type", itemType)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return Response.json(data)
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return Response.json({ error: "Failed to fetch favorites" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const itemId = searchParams.get("itemId")

    if (!itemId) {
      return Response.json({ error: "itemId is required" }, { status: 400 })
    }

    const { error } = await supabase.from("favorites").delete().eq("user_id", user.id).eq("item_id", itemId)

    if (error) {
      throw error
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error deleting favorite:", error)
    return Response.json({ error: "Failed to delete favorite" }, { status: 500 })
  }
}
