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
    const movieId = searchParams.get("id")

    if (!movieId) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 })
    }

    const movieUrl = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
    const watchProvidersUrl = `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`
    const recommendationsUrl = `${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}`

    const [movieRes, watchRes, recRes] = await Promise.all([
      fetch(movieUrl),
      fetch(watchProvidersUrl),
      fetch(recommendationsUrl),
    ])

    if (!movieRes.ok || !watchRes.ok || !recRes.ok) {
      console.error("[v0] TMDB API error:", movieRes.statusText, watchRes.statusText, recRes.statusText)
      return NextResponse.json({ error: "Failed to fetch movie details from TMDB" }, { status: 500 })
    }

    const movieData = await movieRes.json()
    const watchData = await watchRes.json()
    const recData = await recRes.json()

    if (!movieData.id) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    // Extract India region watch providers (or fallback to any available)
    const indiaProviders = watchData.results?.IN || watchData.results?.US || {}

    return NextResponse.json({
      movie: movieData,
      watchProviders: indiaProviders || {},
      recommendations: recData.results || [],
    })
  } catch (error) {
    console.error("[v0] Error fetching movie details:", error)
    return NextResponse.json({ error: "Failed to fetch movie details" }, { status: 500 })
  }
}
