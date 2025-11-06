"use client"

import { useState, useEffect } from "react"
import type { EnrichedMovie } from "@/lib/tmdb/client"

interface MovieDetailModalProps {
  movie: EnrichedMovie | null
  isOpen: boolean
  onClose: () => void
}

export default function MovieDetailModal({ movie, isOpen, onClose }: MovieDetailModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen || !movie) return null

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.svg"

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-card border border-border rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          isAnimating ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 right-0 flex justify-end p-4 bg-card border-b border-border z-10">
          <button
            onClick={onClose}
            className="text-2xl font-bold text-foreground hover:text-muted-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Poster */}
          <div className="flex gap-6">
            <img
              src={posterUrl || "/placeholder.svg"}
              alt={movie.title}
              className="w-40 h-60 object-cover rounded-lg shadow-lg flex-shrink-0"
              loading="lazy"
            />

            {/* Info */}
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-bold text-foreground">{movie.title}</h1>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground font-semibold">Release Year:</span>
                  <p className="text-foreground">{movie.release_date?.split("-")[0] || "N/A"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground font-semibold">TMDB Rating:</span>
                  <p className="text-foreground">⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10</p>
                </div>
                {movie.imdbRating && movie.imdbRating !== "N/A" && (
                  <div>
                    <span className="text-muted-foreground font-semibold">IMDb Rating:</span>
                    <p className="text-foreground">⭐ {movie.imdbRating}/10</p>
                  </div>
                )}
                {movie.Runtime && movie.Runtime !== "N/A" && (
                  <div>
                    <span className="text-muted-foreground font-semibold">Runtime:</span>
                    <p className="text-foreground">{movie.Runtime}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Plot */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">Plot</h2>
            <p className="text-foreground leading-relaxed">{movie.Plot || movie.overview || "No plot available."}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
