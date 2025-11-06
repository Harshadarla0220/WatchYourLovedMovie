"use client"

import { useState } from "react"
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites"
import type { OmdbMovie } from "@/lib/omdb/client"

interface MovieCardProps {
  movie: OmdbMovie
  onFavoriteChange?: () => void
}

export default function MovieCard({ movie, onFavoriteChange }: MovieCardProps) {
  const [isFav, setIsFav] = useState(() => isFavorite(movie.imdbID))
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggleFavorite = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)

    if (isFav) {
      removeFavorite(movie.imdbID)
      setIsFav(false)
    } else {
      addFavorite({
        imdbID: movie.imdbID,
        title: movie.Title,
        poster: movie.Poster,
        rating: movie.imdbRating || "N/A",
        year: movie.Year,
      })
      setIsFav(true)
    }
    onFavoriteChange?.()
  }

  return (
    <div className="overflow-hidden hover-lift group cursor-pointer transition-all duration-300 h-full flex flex-col bg-card border border-border rounded-xl">
      {/* Movie Poster */}
      <div className="relative h-64 bg-muted overflow-hidden">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <img
            src={movie.Poster || "/placeholder.svg"}
            alt={movie.Title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-primary/10 to-accent/10">
            🎬
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-foreground mb-2 line-clamp-2 text-balance">{movie.Title}</h3>

        <div className="space-y-2 mb-4 flex-1">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Year:</span> {movie.Year}
          </p>
          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Rating:</span> ⭐ {movie.imdbRating}/10
            </p>
          )}
          {movie.Runtime && movie.Runtime !== "N/A" && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Runtime:</span> {movie.Runtime}
            </p>
          )}
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
