import { NextResponse } from "next/server"

const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

const GENRE_MAP: Record<string, number> = {
  action: 28,
  comedy: 35,
  drama: 18,
  horror: 27,
  romance: 10749,
  thriller: 53,
  scifi: 878,
}

export async function GET(request: Request) {
  try {
    if (!TMDB_API_KEY) {
      console.error("[v0] TMDB API key is not configured")
      return NextResponse.json({ error: "TMDB API key is not configured" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const genre = searchParams.get("genre") || "action"
    const language = searchParams.get("language") || "en-US"
    const yearStart = searchParams.get("yearStart")
    const yearEnd = searchParams.get("yearEnd")

    const genreId = GENRE_MAP[genre.toLowerCase()] || GENRE_MAP.action

    let url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=${language}&sort_by=popularity.desc`

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
    console.error("[v0] TMDB Genre Error:", error)
    return NextResponse.json({ error: "Failed to fetch genre movies" }, { status: 500 })
  }
}
