"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getFavorites, removeFavorite } from "@/lib/favorites"
import type { FavoriteMovie } from "@/lib/favorites"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  const handleRemoveFavorite = (imdbID: string) => {
    removeFavorite(imdbID)
    setFavorites(favorites.filter((fav) => fav.imdbID !== imdbID))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">My Favorites</h1>
        <p className="text-muted-foreground mb-12">All your saved favorite movies</p>

        {favorites.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favorites.map((movie) => (
              <div
                key={movie.imdbID}
                className="overflow-hidden hover-lift group rounded-xl border border-border bg-card"
              >
                <div className="relative h-64 bg-muted overflow-hidden">
                  {movie.poster && movie.poster !== "N/A" ? (
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-primary/10 to-accent/10">
                      🎬
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {movie.year} • ⭐ {movie.rating}
                  </p>
                  <button
                    onClick={() => handleRemoveFavorite(movie.imdbID)}
                    className="w-full py-2 px-3 rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors font-semibold text-sm"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 rounded-xl border border-border bg-card">
            <p className="text-xl text-muted-foreground mb-6">No favorites yet!</p>
            <Link href="/movies">
              <button className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors">
                Browse Movies
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
