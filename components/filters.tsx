"use client"

interface FiltersProps {
  onYearRangeChange: (range: string) => void
  onGenreChange: (genre: string) => void
  onLanguageChange: (language: string) => void
  onRatingChange?: (rating: string) => void
  selectedYearRange: string
  selectedGenre: string
  selectedLanguage: string
  selectedRating?: string
}

export default function Filters({
  onYearRangeChange,
  onGenreChange,
  onLanguageChange,
  onRatingChange,
  selectedYearRange,
  selectedGenre,
  selectedLanguage,
  selectedRating = "",
}: FiltersProps) {
  const yearRanges = [
    { value: "", label: "All Years" },
    { value: "2023-2026", label: "2023–2026" },
    { value: "2016-2022", label: "2016–2022" },
    { value: "2010-2015", label: "2010–2015" },
    { value: "2000-2009", label: "2000–2009" },
  ]

  const genres = [
    { value: "", label: "All Genres" },
    { value: "action", label: "Action" },
    { value: "comedy", label: "Comedy" },
    { value: "drama", label: "Drama" },
    { value: "horror", label: "Horror" },
    { value: "romance", label: "Romance" },
    { value: "thriller", label: "Thriller" },
    { value: "scifi", label: "Sci-Fi" },
  ]

  const languages = [
    { value: "en-US", label: "English" },
    { value: "te-IN", label: "Telugu" },
    { value: "hi-IN", label: "Hindi" },
  ]

  const ratings = [
    { value: "", label: "All Ratings" },
    { value: "7", label: "Above 7 ⭐" },
    { value: "8", label: "Above 8 ⭐" },
    { value: "9", label: "Above 9 ⭐" },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Year Range</label>
        <select
          value={selectedYearRange}
          onChange={(e) => onYearRangeChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {yearRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Genre</label>
        <select
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Language</label>
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Filter by Rating</label>
        <select
          value={selectedRating}
          onChange={(e) => onRatingChange?.(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {ratings.map((rating) => (
            <option key={rating.value} value={rating.value}>
              {rating.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
