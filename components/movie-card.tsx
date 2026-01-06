"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites"
import type { EnrichedMovie } from "@/lib/tmdb/client"

interface MovieCardProps {
  movie: EnrichedMovie
  onFavoriteChange?: () => void
}

export default function MovieCard({ movie, onFavoriteChange }: MovieCardProps) {
  const [isFav, setIsFav] = useState(() => isFavorite(String(movie.id)))
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)

    const movieId = String(movie.id)
    if (isFav) {
      removeFavorite(movieId)
      setIsFav(false)
    } else {
      addFavorite({
        imdbID: movieId,
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.imdbRating || String(movie.vote_average.toFixed(1)),
        year: String(movie.release_date?.split("-")[0] || "N/A"),
      })
      setIsFav(true)
    }
    onFavoriteChange?.()
  }

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.svg"

  return (
    <Link href={`/movie/${movie.id}`} className="group cursor-pointer">
      <div className="overflow-hidden hover-lift transition-all duration-300 h-full flex flex-col bg-gray-900 border border-gray-700 rounded-xl hover:border-blue-400">
        {/* Movie Poster */}
        <div className="relative h-64 bg-gray-800 overflow-hidden">
          <img
            src={posterUrl || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Movie Info */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-white mb-2 line-clamp-2 text-balance">{movie.title}</h3>

          <div className="space-y-2 mb-4 flex-1 text-sm">
            <p className="text-gray-400">
              <span className="font-semibold">Year:</span> {movie.release_date?.split("-")[0] || "N/A"}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold">Rating:</span> ⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10
            </p>
            {movie.Runtime && movie.Runtime !== "N/A" && (
              <p className="text-gray-400">
                <span className="font-semibold">Runtime:</span> {movie.Runtime}
              </p>
            )}
            <p className="text-gray-400 line-clamp-2">{movie.overview}</p>
          </div>

          <button
            onClick={handleToggleFavorite}
            className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 ${
              isFav ? "bg-red-600 hover:bg-red-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            } ${isAnimating ? "scale-110" : "scale-100"}`}
          >
            {isFav ? "❤️ In Favorites" : "🤍 Add to Favorites"}
          </button>
        </div>
      </div>
    </Link>
  )
}
