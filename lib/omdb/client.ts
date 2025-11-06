// OMDB API client - now uses backend routes to avoid CORS issues
export interface OmdbMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Runtime?: string
  Plot?: string
  imdbRating?: string
  Director?: string
  Actors?: string
  Genre?: string
}

export async function searchMovies(title: string, year?: string, type = "movie"): Promise<OmdbMovie[]> {
  try {
    const params = new URLSearchParams({
      title: encodeURIComponent(title),
      type,
      ...(year && { year }),
    })

    const response = await fetch(`/api/movies/search?${params.toString()}`)
    const data = await response.json()

    if (Array.isArray(data)) {
      return data
    }
    return []
  } catch (error) {
    console.error("[v0] Error searching movies:", error)
    return []
  }
}

export async function getMovieDetails(imdbID: string): Promise<OmdbMovie | null> {
  try {
    const response = await fetch(`/api/movies/details?id=${imdbID}`)
    const data = await response.json()

    if (data && data.Response !== "False") {
      return data as OmdbMovie
    }
    return null
  } catch (error) {
    console.error("[v0] Error fetching movie details:", error)
    return null
  }
}

export async function getMoviesByGenre(genre: string, year?: string): Promise<OmdbMovie[]> {
  const popularTitles: Record<string, string[]> = {
    action: ["John Wick", "Die Hard", "Mission Impossible", "Fast & Furious"],
    comedy: ["The Hangover", "Superbad", "Dodgeball", "Elf"],
    drama: ["The Shawshank Redemption", "Forrest Gump", "The Dark Knight", "Inception"],
    horror: ["The Ring", "Insidious", "Get Out", "A Quiet Place"],
    romance: ["Titanic", "The Notebook", "Pride and Prejudice", "Dirty Dancing"],
    thriller: ["Psycho", "Se7en", "The Sixth Sense", "Gone Girl"],
    scifi: ["Inception", "Interstellar", "The Matrix", "Blade Runner 2049"],
  }

  const titles = popularTitles[genre.toLowerCase()] || popularTitles["action"]
  const allMovies: OmdbMovie[] = []

  for (const title of titles) {
    const movies = await searchMovies(title, year)
    allMovies.push(...movies)
  }

  return allMovies.slice(0, 8)
}
