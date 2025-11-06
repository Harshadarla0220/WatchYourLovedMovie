import { type NextRequest, NextResponse } from "next/server"

const API_KEY = "8b2135f9"
const BASE_URL = "https://www.omdbapi.com/"

export interface OmdbMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Runtime?: string
  Plot?: string
  imdbRating?: string
  Director?: string
  Actors?: string
  Genre?: string
}

export interface OmdbSearchResponse {
  Search?: OmdbMovie[]
  totalResults?: string
  Response: string
  Error?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title")
    const year = searchParams.get("year")
    const type = searchParams.get("type") || "movie"

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const params = new URLSearchParams({
      apikey: API_KEY,
      s: title,
      type,
      ...(year && { y: year }),
    })

    const response = await fetch(`${BASE_URL}?${params.toString()}`)
    const data: OmdbSearchResponse = await response.json()

    if (data.Response === "True" && data.Search) {
      return NextResponse.json(data.Search)
    }
    return NextResponse.json([])
  } catch (error) {
    console.error("[v0] Error searching movies:", error)
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 })
  }
}
