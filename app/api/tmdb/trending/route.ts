import { NextResponse } from "next/server"

const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: Request) {
  try {
    if (!TMDB_API_KEY) {
      console.error("[v0] TMDB API key is not configured")
      return NextResponse.json({ error: "TMDB API key is not configured" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const language = searchParams.get("language") || "en-US"
    const yearStart = searchParams.get("yearStart")
    const yearEnd = searchParams.get("yearEnd")

    let url = `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=${language}`

    if (yearStart && yearEnd) {
      url += `&primary_release_date.gte=${yearStart}-01-01&primary_release_date.lte=${yearEnd}-12-31`
    }

    const response = await fetch(url)

    if (!response.ok) {
      console.error("[v0] TMDB API error:", response.status, response.statusText)
      return NextResponse.json({ error: `TMDB API error: ${response.statusText}` }, { status: response.status })
    }

    const data = await response.json()

    return NextResponse.json(data.results || [])
  } catch (error) {
    console.error("[v0] TMDB Trending Error:", error)
    return NextResponse.json({ error: "Failed to fetch trending movies" }, { status: 500 })
  }
}
