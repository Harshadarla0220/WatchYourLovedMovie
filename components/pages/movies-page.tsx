"use client"

import { useState } from "react"
import { searchMovies, getMoviesByGenre } from "@/lib/omdb/client"
import MovieCard from "@/components/movie-card"
import SearchBar from "@/components/search-bar"
import Filters from "@/components/filters"
import TrendingMovies from "@/components/trending-movies"
import BackToTop from "@/components/back-to-top"
import type { OmdbMovie } from "@/lib/omdb/client"

export default function MoviesPage() {
  const [movies, setMovies] = useState<OmdbMovie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedYearRange, setSelectedYearRange] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")

  const parseYearRange = (range: string): string | undefined => {
    if (!range) return undefined
    const [start, end] = range.split("-")
    return start
  }

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setHasSearched(true)
    const year = parseYearRange(selectedYearRange)
    const results = await searchMovies(query, year)
    setMovies(results)
    setIsLoading(false)
  }

  const handleYearRangeChange = (range: string) => {
    setSelectedYearRange(range)
  }

  const handleGenreChange = async (genre: string) => {
    setSelectedGenre(genre)
    if (genre) {
      setIsLoading(true)
      setHasSearched(true)
      const year = parseYearRange(selectedYearRange)
      const results = await getMoviesByGenre(genre, year)
      setMovies(results)
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="mb-12 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Find Your Next Movie</h1>
            <p className="text-muted-foreground">Search millions of movies from OMDB database</p>
          </div>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          <Filters
            onYearRangeChange={handleYearRangeChange}
            onGenreChange={handleGenreChange}
            selectedYearRange={selectedYearRange}
            selectedGenre={selectedGenre}
          />
        </div>

        {/* Results or Trending */}
        {hasSearched ? (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {isLoading ? "Searching..." : `Found ${movies.length} movies`}
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : movies.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {movies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No movies found. Try a different search.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-16">
            <TrendingMovies />
          </div>
        )}
      </div>

      <BackToTop />
    </main>
  )
}
