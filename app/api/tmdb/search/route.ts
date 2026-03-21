import { NextResponse } from "next/server"

const TMDB_API_KEY = process.env.TMDG_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: Request) {
  try {
    if (!TMDB_API_KEY) {
      return NextResponse.json({ error: "TMDB API key not configured" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")
    const language = searchParams.get("language") || "en-US"
    const page = searchParams.get("page") || "1"

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=${language}&page=${page}&include_adult=false`

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] TMDB search error:", data)
      return NextResponse.json({ error: "Failed to search movies" }, { status: 500 })
    }

    return NextResponse.json({
      results: data.results || [],
      total_results: data.total_results || 0,
      total_pages: data.total_pages || 0,
      page: parseInt(page) || 1,
    })
  } catch (error) {
    console.error("[v0] Error searching movies:", error)
    return NextResponse.json({ error: "Failed to search movies" }, { status: 500 })
  }
}
