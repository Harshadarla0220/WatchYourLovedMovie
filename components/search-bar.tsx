"use client"

import type React from "react"

import { useState } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies by title..."
          className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  )
}
