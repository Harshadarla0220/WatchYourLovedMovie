"use client"

import { useState } from "react"
import { getTrendingMovies, getMoviesByGenre, enrichMovieWithOmdb } from "@/lib/tmdb/client"
import MovieCard from "@/components/movie-card"
import SearchBar from "@/components/search-bar"
import Filters from "@/components/filters"
import TrendingMovies from "@/components/trending-movies"
import BackToTop from "@/components/back-to-top"
import MovieDetailModal from "@/components/movie-detail-modal"
import type { EnrichedMovie } from "@/lib/tmdb/client"

export default function MoviesPage() {
  const [movies, setMovies] = useState<EnrichedMovie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedYearRange, setSelectedYearRange] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en-US")
  const [selectedMovie, setSelectedMovie] = useState<EnrichedMovie | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const parseYearRange = (range: string): { start?: string; end?: string } => {
    if (!range) return {}
    const [start, end] = range.split("-")
    return { start, end }
  }

  const enrichMovies = async (moviesToEnrich: EnrichedMovie[]) => {
    const enriched = await Promise.all(
      moviesToEnrich.map(async (movie) => {
        const omdbData = await enrichMovieWithOmdb(movie.title, movie.release_date?.split("-")[0])
        return { ...movie, ...omdbData }
      }),
    )
    return enriched
  }

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setHasSearched(true)
    // Use trending as search fallback for now
    const results = await getTrendingMovies(selectedLanguage)
    const enriched = await enrichMovies(results)
    setMovies(enriched)
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
      const { start, end } = parseYearRange(selectedYearRange)
      const results = await getMoviesByGenre(genre, selectedLanguage, start, end)
      const enriched = await enrichMovies(results)
      setMovies(enriched)
      setIsLoading(false)
    }
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
  }

  const handleMovieClick = (movie: EnrichedMovie) => {
    setSelectedMovie(movie)
    setIsDetailModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="mb-12 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Find Your Next Movie</h1>
            <p className="text-muted-foreground">Discover movies filtered by genre, year, and language</p>
          </div>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          <Filters
            onYearRangeChange={handleYearRangeChange}
            onGenreChange={handleGenreChange}
            onLanguageChange={handleLanguageChange}
            selectedYearRange={selectedYearRange}
            selectedGenre={selectedGenre}
            selectedLanguage={selectedLanguage}
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
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={handleMovieClick}
                    onFavoriteChange={() => setMovies([...movies])}
                  />
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
            <TrendingMovies onMovieClick={handleMovieClick} />
          </div>
        )}
      </div>

      <BackToTop />
      <MovieDetailModal movie={selectedMovie} isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} />
    </main>
  )
}
