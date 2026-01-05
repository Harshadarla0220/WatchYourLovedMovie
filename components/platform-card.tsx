"use client"

interface PlatformCardProps {
  platformName: string
  logoPath?: string
  movieTitle?: string
  isClickable?: boolean
  type?: "flatrate" | "rent" | "buy"
}

const PLATFORM_REDIRECT_URLS: Record<string, (title: string) => string> = {
  Netflix: (title) => `https://www.netflix.com/search?q=${encodeURIComponent(title)}`,
  "Prime Video": (title) => `https://www.amazon.com/s?k=${encodeURIComponent(title)}+Prime+Video`,
  "Disney Plus": (title) => `https://www.disneyplus.com/search?q=${encodeURIComponent(title)}`,
  "Disney+": (title) => `https://www.disneyplus.com/search?q=${encodeURIComponent(title)}`,
  Hotstar: (title) => `https://www.hotstar.com/in/search?q=${encodeURIComponent(title)}`,
  "Apple TV": (title) => `https://tv.apple.com/search?term=${encodeURIComponent(title)}`,
  "Apple TV Plus": (title) => `https://tv.apple.com/search?term=${encodeURIComponent(title)}`,
  YouTube: (title) => `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`,
}

export default function PlatformCard({
  platformName,
  logoPath,
  movieTitle = "movie",
  isClickable = true,
  type = "flatrate",
}: PlatformCardProps) {
  const displayName = platformName.replace(/_/g, " ")
  const typeLabel = type === "flatrate" ? "(Subscribe)" : type === "rent" ? "(Rent)" : type === "buy" ? "(Buy)" : ""

  const getRedirectUrl = () => {
    const urlBuilder = PLATFORM_REDIRECT_URLS[displayName] || PLATFORM_REDIRECT_URLS[platformName]
    return urlBuilder ? urlBuilder(movieTitle) : null
  }

  const redirectUrl = getRedirectUrl()

  const handleClick = () => {
    if (redirectUrl && isClickable) {
      window.open(redirectUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={!isClickable || !redirectUrl}
      title={isClickable && redirectUrl ? "Opens in new tab" : "Link not available"}
      className={`group relative p-4 rounded-lg border transition-all duration-300 ${
        isClickable && redirectUrl
          ? "border-border dark:border-gray-700 hover:border-primary dark:hover:border-white bg-card dark:bg-gray-800 hover:bg-card/80 dark:hover:bg-gray-700 cursor-pointer hover:shadow-lg hover:-translate-y-1"
          : "border-border dark:border-gray-700 bg-muted dark:bg-gray-800 cursor-not-allowed opacity-50"
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        {logoPath ? (
          <img
            src={`https://image.tmdb.org/t/p/original${logoPath}`}
            alt={displayName}
            className="h-12 w-12 object-contain dark:invert"
          />
        ) : (
          <div className="h-12 w-12 bg-muted dark:bg-gray-700 rounded flex items-center justify-center text-xs text-muted-foreground dark:text-gray-400">
            N/A
          </div>
        )}
        <span className="text-sm font-semibold text-foreground dark:text-white text-center line-clamp-2">
          {displayName}
        </span>
        <span className="text-xs text-muted-foreground dark:text-gray-400">{typeLabel}</span>
        {isClickable && redirectUrl && (
          <span className="text-xs text-muted-foreground dark:text-gray-400 group-hover:text-primary dark:group-hover:text-white transition-colors">
            Watch ↗
          </span>
        )}
        {!redirectUrl && <span className="text-xs text-muted-foreground dark:text-gray-400">Link not available</span>}
      </div>
    </button>
  )
}
