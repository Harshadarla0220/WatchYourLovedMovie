"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MoodSelectionProps {
  type: "movies" | "music"
  onMoodSelect: (mood: string, language: string) => void
  isLoading?: boolean
}

const moods = [
  { emoji: "😊", label: "Feeling Good", value: "good" },
  { emoji: "❤️", label: "Feeling Love", value: "love" },
  { emoji: "😌", label: "Feeling Stressed", value: "stressed" },
  { emoji: "⚡", label: "Feeling Thrilling", value: "thrilling" },
  { emoji: "😱", label: "Feeling Horror", value: "horror" },
  { emoji: "💼", label: "Feeling Business", value: "business" },
  { emoji: "🕰️", label: "Feeling Nostalgic", value: "nostalgic" },
  { emoji: "🧠", label: "Feeling Curious", value: "curious" },
  { emoji: "🤩", label: "Feeling Adventurous", value: "adventurous" },
]

const languages = ["Telugu", "Hindi", "English"]

export default function MoodSelection({ type, onMoodSelect, isLoading = false }: MoodSelectionProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("English")

  const handleContinue = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood, selectedLanguage)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">How are you feeling?</h1>
          <p className="text-lg text-muted-foreground">Select your mood to get personalized {type} recommendations</p>
        </div>

        {/* Mood Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                disabled={isLoading}
                className={`p-6 rounded-xl transition-all duration-200 ${
                  selectedMood === mood.value
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-card border border-border hover:border-primary hover:shadow-md"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="text-4xl mb-2">{mood.emoji}</div>
                <div
                  className={`text-sm font-semibold ${selectedMood === mood.value ? "text-white" : "text-foreground"}`}
                >
                  {mood.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-foreground mb-4">Select Language</h3>
          <div className="flex gap-3 flex-wrap">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                disabled={isLoading}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedLanguage === lang
                    ? "bg-primary text-white"
                    : "bg-card border border-border hover:border-primary"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button variant="outline" disabled={isLoading}>
              Back to Home
            </Button>
          </Link>
          <Button
            onClick={handleContinue}
            disabled={!selectedMood || isLoading}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Get Recommendations"}
          </Button>
        </div>
      </div>
    </div>
  )
}
