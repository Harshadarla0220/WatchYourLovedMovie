import { NextResponse } from "next/server"

const TMDB_API_KEY = "a3403cf3418752d8d73b9c9cc1f57858"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get("language") || "en-US"
    const yearStart = searchParams.get("yearStart")
    const yearEnd = searchParams.get("yearEnd")

    let url = `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=${language}`

    if (yearStart && yearEnd) {
      url += `&primary_release_date.gte=${yearStart}-01-01&primary_release_date.lte=${yearEnd}-12-31`
    }

    const response = await fetch(url)
    const data = await response.json()

    return NextResponse.json(data.results || [])
  } catch (error) {
    console.error("[v0] TMDB Trending Error:", error)
    return NextResponse.json({ error: "Failed to fetch trending movies" }, { status: 500 })
  }
}
