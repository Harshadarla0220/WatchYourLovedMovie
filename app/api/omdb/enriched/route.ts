import { NextResponse } from "next/server"

const OMDB_API_KEY = "8b2135f9"
const OMDB_BASE_URL = "https://www.omdbapi.com"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title")
    const year = searchParams.get("year")

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const params = new URLSearchParams({
      apikey: OMDB_API_KEY,
      t: title,
      type: "movie",
      ...(year && { y: year }),
    })

    const response = await fetch(`${OMDB_BASE_URL}/?${params.toString()}`)
    const data = await response.json()

    if (data.Response === "True") {
      return NextResponse.json(data)
    }

    return NextResponse.json({ error: "Movie not found" }, { status: 404 })
  } catch (error) {
    console.error("[v0] OMDB Enriched Error:", error)
    return NextResponse.json({ error: "Failed to fetch movie details" }, { status: 500 })
  }
}
