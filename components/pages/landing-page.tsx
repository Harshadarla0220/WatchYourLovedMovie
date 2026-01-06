"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { getFavorites } from "@/lib/favorites"
import MovieCard from "@/components/movie-card"
import BackToTop from "@/components/back-to-top"
import type { FavoriteMovie } from "@/lib/favorites"

export default function LandingPage() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([])

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center fade-in">
          <div className="mb-8 inline-block slide-up">
            <span className="px-4 py-2 rounded-full bg-blue-900/30 text-blue-200 text-sm font-semibold">
              ✨ Discover Your Next Favorite
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight slide-up">
            Your Mood.
            <span className="block text-blue-300 font-bold">Your Moment.</span>
            Your Perfect Movie.
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto slide-up">
            Discover movies that match your mood and moment. Explore trending films, check where to watch, and build
            your perfect watchlist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 slide-up">
            <Link href="/movies">
              <button className="button-primary w-full sm:w-auto text-lg hover:shadow-lg hover:-translate-y-1">
                Explore Movies
              </button>
            </Link>
            <Link href="/favorites">
              <button className="button-secondary w-full sm:w-auto text-lg hover:shadow-lg hover:-translate-y-1">
                View Favorites ❤️
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Movies Card */}
            <Link href="/movies">
              <div className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 h-full hover-lift scale-in rounded-xl border border-gray-700 bg-gray-900">
                <div className="relative h-64 bg-gradient-to-br from-blue-900/20 to-blue-800/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5 group-hover:from-pink-500/10 group-hover:to-orange-500/10 transition-all" />
                  <span className="text-6xl">🎬</span>
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-white mb-3 flex items-center gap-2">
                    <span>🎬</span> Browse Movies
                  </h2>
                  <p className="text-gray-400 mb-4">
                    Search and discover millions of movies. Filter by year, genre, and more.
                  </p>
                  <button className="button-primary w-full hover:shadow-lg">Search Movies</button>
                </div>
              </div>
            </Link>

            {/* Favorites Card */}
            <Link href="/favorites">
              <div className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 h-full hover-lift scale-in rounded-xl border border-gray-700 bg-gray-900">
                <div className="relative h-64 bg-gradient-to-br from-pink-900/20 to-orange-800/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5 group-hover:from-pink-500/10 group-hover:to-orange-500/10 transition-all" />
                  <span className="text-6xl">❤️</span>
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-white mb-3 flex items-center gap-2">
                    <span>❤️</span> My Favorites ({favorites.length})
                  </h2>
                  <p className="text-gray-400 mb-4">
                    View all your saved favorite movies in one place. Manage your collection.
                  </p>
                  <button className="button-primary w-full hover:shadow-lg">View Favorites</button>
                </div>
              </div>
            </Link>
          </div>

          {/* Favorites Section */}
          {favorites.length > 0 && (
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 fade-in">
              <h3 className="text-2xl font-bold text-white mb-8">Your Recent Favorites</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {favorites.slice(0, 4).map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={{
                      Title: movie.title,
                      Year: movie.year,
                      imdbID: movie.imdbID,
                      Type: "movie",
                      Poster: movie.poster,
                      imdbRating: movie.rating,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 fade-in mt-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Why Choose MoodMate?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center hover-lift">
                <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🔍</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Powerful Search</h4>
                <p className="text-gray-400 text-sm">Search millions of movies from TMDB with advanced filtering</p>
              </div>
              <div className="text-center hover-lift">
                <div className="w-12 h-12 bg-pink-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">❤️</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Save Favorites</h4>
                <p className="text-gray-400 text-sm">Add movies to favorites and build your personal watchlist</p>
              </div>
              <div className="text-center hover-lift">
                <div className="w-12 h-12 bg-yellow-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">⭐</span>
                </div>
                <h4 className="font-semibold text-white mb-2">See Ratings</h4>
                <p className="text-gray-400 text-sm">View TMDB ratings and detailed movie information instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back-to-top Button */}
      <BackToTop />
    </div>
  )
}
