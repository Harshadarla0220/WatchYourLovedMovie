"use client"

import { useState } from "react"
import MoodSelection from "./mood-selection"
import Recommendations from "./recommendations"

export default function MoviesPage() {
  const [stage, setStage] = useState<"mood" | "recommendations">("mood")
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [recommendations, setRecommendations] = useState<unknown[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleMoodSelect = async (mood: string, language: string) => {
    setSelectedMood(mood)
    setSelectedLanguage(language)
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/recommendations/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, language }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations")
      }

      const data = await response.json()
      setRecommendations(data.recommendations || [])
      setStage("recommendations")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setStage("mood")
    } finally {
      setIsLoading(false)
    }
  }

  if (stage === "recommendations") {
    return (
      <Recommendations
        type="movies"
        mood={selectedMood}
        language={selectedLanguage}
        recommendations={recommendations}
        isLoading={isLoading}
        error={error}
      />
    )
  }

  return <MoodSelection type="movies" onMoodSelect={handleMoodSelect} isLoading={isLoading} />
}
