"use client"

interface FiltersProps {
  onYearRangeChange: (range: string) => void
  onGenreChange: (genre: string) => void
  selectedYearRange: string
  selectedGenre: string
}

export default function Filters({ onYearRangeChange, onGenreChange, selectedYearRange, selectedGenre }: FiltersProps) {
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

  return (
    <div className="grid md:grid-cols-2 gap-4">
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
    </div>
  )
}
