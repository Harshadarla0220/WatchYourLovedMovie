"use client"

import { useState, useEffect } from "react"
import MovieCard from "@/components/movie-card"
import PlatformCard from "@/components/platform-card"
import { MovieDetailSkeleton } from "@/components/skeleton-loader"
import type { EnrichedMovie, TmdbMovie } from "@/lib/tmdb/client"

interface MovieDetailProps {
  movieId: number
  onBack: () => void
}

interface WatchProvider {
  provider_id: number
  provider_name: string
  logo_path: string
  display_priority: number
}

interface WatchData {
  rent?: WatchProvider[]
  buy?: WatchProvider[]
  flatrate?: WatchProvider[]
}

export default function MovieDetail({ movieId, onBack }: MovieDetailProps) {
  const [movie, setMovie] = useState<EnrichedMovie | null>(null)
  const [watchProviders, setWatchProviders] = useState<WatchData | null>(null)
  const [recommendations, setRecommendations] = useState<TmdbMovie[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState<EnrichedMovie | null>(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/movies/details?id=${movieId}`)
        const data = await response.json()
        setMovie(data.movie)
        setWatchProviders(data.watchProviders)
        setRecommendations(data.recommendations || [])
      } catch (error) {
        console.error("[v0] Error fetching movie details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [movieId])

  if (loading) {
    return (
      <div className="space-y-8">
        <button onClick={onBack} className="button-secondary">
          ← Back
        </button>
        <MovieDetailSkeleton />
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-700 dark:text-gray-300">Movie not found</p>
        <button onClick={onBack} className="button-primary mt-4">
          Go Back
        </button>
      </div>
    )
  }

  const allWatchProviders = [
    ...(watchProviders?.flatrate || []),
    ...(watchProviders?.buy || []),
    ...(watchProviders?.rent || []),
  ]

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center gap-2 button-secondary">
        ← Back to Movies
      </button>

      {/* Movie Header */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.svg"}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="md:col-span-3 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{movie.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {movie.release_date && movie.release_date.split("-")[0]}
            </p>
          </div>

          {/* Rating and Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rating</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Runtime</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{movie.Runtime || "N/A"}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Genres</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {movie.genres
                  ?.slice(0, 1)
                  .map((g) => g.name)
                  .join(", ") || "N/A"}
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Overview</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {movie.overview || movie.Plot || "No overview available"}
            </p>
          </div>
        </div>
      </div>

      {/* Where to Watch Section */}
      {allWatchProviders.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Where to Watch</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allWatchProviders.map((provider) => (
              <PlatformCard
                key={provider.provider_id}
                platformName={provider.provider_name}
                logoPath={provider.logo_path}
                movieTitle={movie.title}
                isClickable={true}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Availability varies by region. Showing options for India region. Links open search on platform.
          </p>
        </div>
      )}

      {allWatchProviders.length === 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">Currently not available for streaming in your region</p>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Similar Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendations.slice(0, 10).map((rec) => (
              <MovieCard key={rec.id} movie={rec} onMovieClick={() => setSelectedMovie(rec)} />
            ))}
          </div>
        </div>
      )}

      {/* Selected Movie Detail Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMovie(null)}
              className="sticky top-4 left-4 px-3 py-1 rounded-lg bg-blue-600 dark:bg-white hover:bg-blue-700 dark:hover:bg-gray-200 text-white dark:text-black transition-colors"
            >
              ✕ Close
            </button>
            <MovieDetail movieId={selectedMovie.id} onBack={() => setSelectedMovie(null)} />
          </div>
        </div>
      )}
    </div>
  )
}
