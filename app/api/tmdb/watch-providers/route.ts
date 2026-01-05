import { NextResponse } from "next/server"

const TMDB_API_KEY = "a3403cf3418752d8d73b9c9cc1f57858"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const movieId = searchParams.get("id")
    const region = searchParams.get("region") || "IN"

    if (!movieId) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 })
    }

    const url = `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    // Get providers for specified region or fallback to US
    const providers = data.results?.[region] || data.results?.US || {}

    return NextResponse.json(providers)
  } catch (error) {
    console.error("[v0] Error fetching watch providers:", error)
    return NextResponse.json({ error: "Failed to fetch watch providers" }, { status: 500 })
  }
}
