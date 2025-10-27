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
    const type = searchParams.get("type")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let query = supabase
      .from("recommendations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (type) {
      query = query.eq("recommendation_type", type)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return Response.json(data)
  } catch (error) {
    console.error("Error fetching recommendations history:", error)
    return Response.json({ error: "Failed to fetch recommendations history" }, { status: 500 })
  }
}
