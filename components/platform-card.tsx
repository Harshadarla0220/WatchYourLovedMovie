"use client"

interface PlatformCardProps {
  platformName: string
  logoPath?: string
  movieTitle?: string
  movieId?: number
  isClickable?: boolean
  type?: "flatrate" | "rent" | "buy"
}

const platformUrls: Record<string, string> = {
  Netflix: "https://www.netflix.com",
  "Amazon Prime Video": "https://www.primevideo.com",
  "Prime Video": "https://www.primevideo.com",
  "Disney+": "https://www.disneyplus.com",
  Hotstar: "https://www.hotstar.com",
  "Apple TV": "https://tv.apple.com",
  "Apple TV+": "https://tv.apple.com",
}

export default function PlatformCard({
  platformName,
  logoPath,
  movieTitle = "movie",
  movieId,
  isClickable = true,
  type = "flatrate",
}: PlatformCardProps) {
  const displayName = platformName.replace(/_/g, " ")
  const typeLabel = type === "flatrate" ? "(Subscribe)" : type === "rent" ? "(Rent)" : type === "buy" ? "(Buy)" : ""

  const getPlatformUrl = () => {
    for (const [key, url] of Object.entries(platformUrls)) {
      if (displayName.includes(key) || key.includes(displayName)) {
        return url
      }
    }
    return null
  }

  const platformUrl = getPlatformUrl()

  const handleClick = () => {
    if (platformUrl && isClickable) {
      window.open(platformUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={!isClickable || !platformUrl}
      title={isClickable && platformUrl ? `Visit ${displayName} website` : "Link not available"}
      className={`group relative p-4 rounded-lg border transition-all duration-300 ${
        isClickable && platformUrl
          ? "border-gray-700 hover:border-blue-400 bg-gray-900 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          : "border-gray-700 bg-gray-900 cursor-not-allowed opacity-50"
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        {logoPath ? (
          <img
            src={`https://image.tmdb.org/t/p/original${logoPath}`}
            alt={displayName}
            className="h-12 w-12 object-contain"
          />
        ) : (
          <div className="h-12 w-12 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">
            N/A
          </div>
        )}
        <span className="text-sm font-semibold text-white text-center line-clamp-2">{displayName}</span>
        <span className="text-xs text-gray-400">{typeLabel}</span>
        {isClickable && platformUrl && (
          <span className="text-xs text-blue-400 group-hover:text-blue-300 transition-colors">Visit ↗</span>
        )}
        {!platformUrl && <span className="text-xs text-gray-500">Not available</span>}
      </div>
    </button>
  )
}
