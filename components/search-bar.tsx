"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

interface Suggestion {
  id: number
  title: string
  poster_path?: string
  release_date?: string
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)
  const suggestionsRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch suggestions as user types
  useEffect(() => {
    if (suggestionsRef.current) {
      clearTimeout(suggestionsRef.current)
    }

    if (query.trim().length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    setSuggestionsLoading(true)
    suggestionsRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/tmdb/search?query=${encodeURIComponent(query)}&language=en-US`
        )
        const data = await response.json()

        if (data.results && data.results.length > 0) {
          setSuggestions(data.results.slice(0, 8)) // Show top 8 suggestions
          setShowSuggestions(true)
        } else {
          setSuggestions([])
        }
      } catch (error) {
        console.error("[v0] Error fetching suggestions:", error)
        setSuggestions([])
      } finally {
        setSuggestionsLoading(false)
      }
    }, 300) // Debounce for 300ms
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.title)
    setShowSuggestions(false)
    onSearch(suggestion.title)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length >= 2 && setShowSuggestions(true)}
            placeholder="Search movies by title..."
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            autoComplete="off"
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-600 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-800 border-b border-gray-700 last:border-b-0 transition-colors flex items-center gap-3"
                >
                  {suggestion.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w45${suggestion.poster_path}`}
                      alt={suggestion.title}
                      className="w-8 h-12 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-white truncate font-medium">{suggestion.title}</div>
                    {suggestion.release_date && (
                      <div className="text-gray-400 text-sm">
                        {new Date(suggestion.release_date).getFullYear()}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Loading indicator */}
          {suggestionsLoading && query.trim().length >= 2 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-600 rounded-lg p-3 text-center text-gray-400">
              Loading suggestions...
            </div>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-blue-600 font-semibold transition-colors disabled:opacity-50 disabled:bg-gray-700 disabled:text-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  )
}
