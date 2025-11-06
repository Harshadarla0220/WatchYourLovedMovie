import { type NextRequest, NextResponse } from "next/server"

const API_KEY = "8b2135f9"
const BASE_URL = "https://www.omdbapi.com/"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imdbID = searchParams.get("id")

    if (!imdbID) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const params = new URLSearchParams({
      apikey: API_KEY,
      i: imdbID,
    })

    const response = await fetch(`${BASE_URL}?${params.toString()}`)
    const data = await response.json()

    if (data.Response === "True") {
      return NextResponse.json(data)
    }
    return NextResponse.json(null)
  } catch (error) {
    console.error("[v0] Error fetching movie details:", error)
    return NextResponse.json({ error: "Failed to fetch movie details" }, { status: 500 })
  }
}
