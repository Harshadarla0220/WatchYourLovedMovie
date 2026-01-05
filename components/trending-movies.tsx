"use client"

import { useState, useEffect } from "react"
import { getTrendingMovies, enrichMovieWithOmdb } from "@/lib/tmdb/client"
import MovieCard from "@/components/movie-card"
import type { EnrichedMovie } from "@/lib/tmdb/client"

export default function TrendingMovies() {
  const [movies, setMovies] = useState<EnrichedMovie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true)
      try {
        const trendingMovies = await getTrendingMovies("en-US")
        const enriched = await Promise.all(
          trendingMovies.map(async (movie) => {
            const omdbData = await enrichMovieWithOmdb(movie.title, movie.release_date?.split("-")[0])
            return { ...movie, ...omdbData } as EnrichedMovie
          }),
        )
        setMovies(enriched)
      } catch (error) {
        console.error("[v0] Error fetching trending movies:", error)
      }
      setIsLoading(false)
    }
    fetchTrending()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-foreground mb-8">Trending Now</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
