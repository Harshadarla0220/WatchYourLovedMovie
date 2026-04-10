import { NextResponse } from "next/server"

const TMDB_API_KEY = process.env.TMDG_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: Request) {
  try {
    if (!TMDB_API_KEY) {
      console.error("[v0] TMDB API key not configured")
      return NextResponse.json(
        { results: [], error: "API key not configured" },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")
    const language = searchParams.get("language") || "en-US"
    const page = searchParams.get("page") || "1"

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { results: [] },
        { status: 200 }
      )
    }

    const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=${language}&page=${page}&include_adult=false`

    console.log("[v0] Fetching from TMDB:", url.replace(TMDB_API_KEY, "***"))

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("[v0] TMDB API error:", response.status, errorData)
      return NextResponse.json(
        { results: [], error: "TMDB API error" },
        { status: 200 } // Return 200 with empty results so client doesn't show error
      )
    }

    const data = await response.json()

    return NextResponse.json({
      results: data.results || [],
      total_results: data.total_results || 0,
      total_pages: data.total_pages || 0,
      page: parseInt(page) || 1,
    })
  } catch (error) {
    console.error("[v0] Error searching movies:", error)
    return NextResponse.json(
      { results: [], error: String(error) },
      { status: 200 } // Return 200 with empty results
    )
  }
}
