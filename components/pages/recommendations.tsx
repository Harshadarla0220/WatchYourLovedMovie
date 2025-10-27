"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { addToFavorites } from "@/app/actions/recommendations"

interface MovieRecommendation {
  title: string
  year: number
  genre: string
  description: string
  rating: number
  why: string
}

interface MusicRecommendation {
  title: string
  artist: string
  genre: string
  mood: string
  why: string
  energy: "low" | "medium" | "high"
}

type Recommendation = MovieRecommendation | MusicRecommendation

interface RecommendationsProps {
  type: "movies" | "music"
  mood: string
  language: string
  recommendations: Recommendation[]
  isLoading?: boolean
  error?: string | null
}

export default function Recommendations({
  type,
  mood,
  language,
  recommendations,
  isLoading = false,
  error = null,
}: RecommendationsProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [savingFavorite, setSavingFavorite] = useState<string | null>(null)

  const toggleFavorite = async (index: number, item: Recommendation) => {
    const itemId = `${type}-${index}`
    const newFavorites = new Set(favorites)

    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId)
    } else {
      newFavorites.add(itemId)
      setSavingFavorite(itemId)

      try {
        const title = "title" in item ? item.title : `${item.title} - ${item.artist}`
        await addToFavorites(itemId, type, title, undefined, item)
      } catch (err) {
        console.error("Failed to save favorite:", err)
        newFavorites.delete(itemId)
      } finally {
        setSavingFavorite(null)
      }
    }

    setFavorites(newFavorites)
  }

  const moodEmojis: Record<string, string> = {
    good: "😊",
    love: "❤️",
    stressed: "😌",
    thrilling: "⚡",
    horror: "😱",
    business: "💼",
    nostalgic: "🕰️",
    curious: "🧠",
    adventurous: "🤩",
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
          <p className="text-muted-foreground">Generating personalized recommendations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Oops! Something went wrong</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Link href={type === "movies" ? "/movies" : "/music"}>
              <Button className="bg-primary hover:bg-primary/90">Try Again</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Link href={type === "movies" ? "/movies" : "/music"}>
              <Button variant="outline">← Back</Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {moodEmojis[mood]} {mood.charAt(0).toUpperCase() + mood.slice(1)} {type === "movies" ? "Movies" : "Music"}
          </h1>
          <p className="text-muted-foreground">
            Recommended in {language} • {recommendations.length} results
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recommendations.map((rec, index) => {
            const itemId = `${type}-${index}`
            const isFavorite = favorites.has(itemId)
            const isSaving = savingFavorite === itemId

            return (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-30">{type === "movies" ? "🎬" : "🎵"}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{rec.title}</h3>

                  {type === "music" && "artist" in rec && (
                    <p className="text-sm text-muted-foreground mb-2">by {rec.artist}</p>
                  )}
                  {type === "movies" && "year" in rec && (
                    <p className="text-sm text-muted-foreground mb-2">{rec.year}</p>
                  )}

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{rec.description || rec.why}</p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 mb-4 text-sm flex-wrap">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded">{rec.genre}</span>
                    {type === "movies" && "rating" in rec && (
                      <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600">⭐ {rec.rating}</span>
                    )}
                    {type === "music" && "energy" in rec && (
                      <span className="px-2 py-1 bg-accent/10 text-accent rounded capitalize">{rec.energy}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFavorite(index, rec)}
                      disabled={isSaving}
                      className={`flex-1 p-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        isFavorite ? "bg-red-500/20 text-red-500" : "bg-card border border-border hover:border-red-500"
                      } ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <span>{isFavorite ? "❤️" : "🤍"}</span>
                      {isSaving ? "Saving..." : ""}
                    </button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* More Actions */}
        <div className="flex gap-4 justify-center">
          <Link href={type === "movies" ? "/movies" : "/music"}>
            <Button variant="outline">Try Another Mood</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
