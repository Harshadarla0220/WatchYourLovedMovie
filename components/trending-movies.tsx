"use client"

import { useState, useEffect } from "react"
import { getMoviesByGenre } from "@/lib/omdb/client"
import MovieCard from "@/components/movie-card"
import type { OmdbMovie } from "@/lib/omdb/client"

export default function TrendingMovies() {
  const [movies, setMovies] = useState<OmdbMovie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true)
      const actionMovies = await getMoviesByGenre("action")
      setMovies(actionMovies)
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
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  )
}
