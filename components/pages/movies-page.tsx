"use client"

import { useState } from "react"
import { getTrendingMovies, getMoviesByGenre, enrichMovieWithOmdb } from "@/lib/tmdb/client"
import MovieCard from "@/components/movie-card"
import SearchBar from "@/components/search-bar"
import Filters from "@/components/filters"
import TrendingMovies from "@/components/trending-movies"
import BackToTop from "@/components/back-to-top"
import type { EnrichedMovie } from "@/lib/tmdb/client"

export default function MoviesPage() {
  const [movies, setMovies] = useState<EnrichedMovie[]>([])
  const [originalMovies, setOriginalMovies] = useState<EnrichedMovie[]>([]) // Store original unfiltered list
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedYearRange, setSelectedYearRange] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en-US")
  const [selectedRating, setSelectedRating] = useState("")
  const [currentSearchQuery, setCurrentSearchQuery] = useState("") // Store current search query

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
    setCurrentSearchQuery(query) // Store search query
    setSelectedRating("") // Reset rating filter when searching
    setSelectedGenre("") // Reset genre filter when searching
    try {
      // Use the TMDB search API endpoint
      const response = await fetch(
        `/api/tmdb/search?query=${encodeURIComponent(query)}&language=${selectedLanguage}`
      )
      const data = await response.json()
      
      if (data.results && data.results.length > 0) {
        // Map TMDB results to EnrichedMovie format
        const mappedResults = data.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          original_title: movie.original_title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          genre_ids: movie.genre_ids,
          popularity: movie.popularity,
        }))
        
        const enriched = await enrichMovies(mappedResults)
        setOriginalMovies(enriched) // Store original list
        setMovies(enriched)
      } else {
        setMovies([])
        setOriginalMovies([])
      }
    } catch (error) {
      console.error("[v0] Search error:", error)
      setMovies([])
      setOriginalMovies([])
    }
    setIsLoading(false)
  }

  const handleYearRangeChange = (range: string) => {
    setSelectedYearRange(range)
    // If currently searching, apply the year filter to search results
    if (currentSearchQuery && originalMovies.length > 0) {
      const filtered = applyAllFilters(originalMovies)
      setMovies(filtered)
    }
  }

  const handleGenreChange = async (genre: string) => {
    setSelectedGenre(genre)
    setSelectedRating("") // Reset rating filter when changing genre

    // If we're in a search context, don't switch to genre browsing
    if (currentSearchQuery) {
      // Just apply filters to current search results
      if (originalMovies.length > 0) {
        const filtered = applyAllFilters(originalMovies)
        setMovies(filtered)
      }
    } else if (genre) {
      // If not searching, use genre browsing
      setIsLoading(true)
      setHasSearched(true)
      const { start, end } = parseYearRange(selectedYearRange)
      const results = await getMoviesByGenre(genre, selectedLanguage, start, end)
      const enriched = await enrichMovies(results)
      setOriginalMovies(enriched) // Store original list
      setMovies(enriched)
      setIsLoading(false)
    }
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
  }

  const handleRatingChange = (rating: string) => {
    setSelectedRating(rating)
    // Filter from original movies list, not the current filtered list
    if (originalMovies.length > 0) {
      if (rating) {
        const ratingThreshold = parseFloat(rating)
        if (!isNaN(ratingThreshold)) {
          const filtered = originalMovies.filter(
            (movie) => movie.vote_average && movie.vote_average >= ratingThreshold
          )
          setMovies(filtered)
        }
      } else {
        // If "All Ratings" is selected, show all original movies
        setMovies(originalMovies)
      }
    }
  }

  const applyAllFilters = (moviesToFilter: EnrichedMovie[]) => {
    let filtered = [...moviesToFilter]

    // Apply year filter
    if (selectedYearRange) {
      const { start, end } = parseYearRange(selectedYearRange)
      filtered = filtered.filter((movie) => {
        const year = movie.release_date?.split("-")[0]
        if (!year) return false
        if (start && year < start) return false
        if (end && year > end) return false
        return true
      })
    }

    // Apply rating filter
    if (selectedRating) {
      const ratingThreshold = parseFloat(selectedRating)
      if (!isNaN(ratingThreshold)) {
        filtered = filtered.filter(
          (movie) => movie.vote_average && movie.vote_average >= ratingThreshold
        )
      }
    }

    return filtered
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
            onRatingChange={handleRatingChange}
            selectedYearRange={selectedYearRange}
            selectedGenre={selectedGenre}
            selectedLanguage={selectedLanguage}
            selectedRating={selectedRating}
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
                  <MovieCard key={movie.id} movie={movie} onFavoriteChange={() => setMovies([...movies])} />
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
