"use client"

import type React from "react"

import { useState } from "react"
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites"
import type { EnrichedMovie } from "@/lib/tmdb/client"

interface MovieCardProps {
  movie: EnrichedMovie
  onMovieClick?: (movie: EnrichedMovie) => void
  onFavoriteChange?: () => void
}

export default function MovieCard({ movie, onMovieClick, onFavoriteChange }: MovieCardProps) {
  const [isFav, setIsFav] = useState(() => isFavorite(String(movie.id)))
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggleFavorite = (e: React.MouseEvent) => {
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
    <div
      className="overflow-hidden hover-lift group cursor-pointer transition-all duration-300 h-full flex flex-col bg-card border border-border rounded-xl hover:border-primary"
      onClick={() => onMovieClick?.(movie)}
    >
      {/* Movie Poster */}
      <div className="relative h-64 bg-muted overflow-hidden">
        <img
          src={posterUrl || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Movie Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-foreground mb-2 line-clamp-2 text-balance">{movie.title}</h3>

        <div className="space-y-2 mb-4 flex-1 text-sm">
          <p className="text-muted-foreground">
            <span className="font-semibold">Year:</span> {movie.release_date?.split("-")[0] || "N/A"}
          </p>
          <p className="text-muted-foreground">
            <span className="font-semibold">Rating:</span> ⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10
          </p>
          {movie.Runtime && movie.Runtime !== "N/A" && (
            <p className="text-muted-foreground">
              <span className="font-semibold">Runtime:</span> {movie.Runtime}
            </p>
          )}
          <p className="text-muted-foreground line-clamp-2">{movie.overview}</p>
        </div>

        <button
          onClick={handleToggleFavorite}
          className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 ${
            isFav
              ? "bg-accent hover:bg-accent/90 text-accent-foreground"
              : "bg-primary hover:bg-primary/90 text-primary-foreground"
          } ${isAnimating ? "scale-110" : "scale-100"}`}
        >
          {isFav ? "❤️ In Favorites" : "🤍 Add to Favorites"}
        </button>
      </div>
    </div>
  )
}
