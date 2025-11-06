// TMDB client for fetching movies
export interface TmdbMovie {
  id: number
  title: string
  poster_path: string
  overview: string
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface EnrichedMovie extends TmdbMovie {
  Runtime?: string
  imdbRating?: string
  Plot?: string
  runtime?: number
  rating?: string
}

export async function getTrendingMovies(
  language = "en-US",
  yearStart?: string,
  yearEnd?: string,
): Promise<TmdbMovie[]> {
  try {
    const params = new URLSearchParams({
      language,
      ...(yearStart && { yearStart }),
      ...(yearEnd && { yearEnd }),
    })

    const response = await fetch(`/api/tmdb/trending?${params.toString()}`)
    const data = await response.json()

    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("[v0] Error fetching trending movies:", error)
    return []
  }
}

export async function getMoviesByGenre(
  genre: string,
  language = "en-US",
  yearStart?: string,
  yearEnd?: string,
): Promise<TmdbMovie[]> {
  try {
    const params = new URLSearchParams({
      genre,
      language,
      ...(yearStart && { yearStart }),
      ...(yearEnd && { yearEnd }),
    })

    const response = await fetch(`/api/tmdb/genre?${params.toString()}`)
    const data = await response.json()

    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("[v0] Error fetching movies by genre:", error)
    return []
  }
}

export async function enrichMovieWithOmdb(title: string, year?: string): Promise<Partial<EnrichedMovie>> {
  try {
    const params = new URLSearchParams({
      title,
      ...(year && { year }),
    })

    const response = await fetch(`/api/omdb/enriched?${params.toString()}`)
    const data = await response.json()

    if (data.Response !== "False") {
      return {
        Runtime: data.Runtime,
        imdbRating: data.imdbRating,
        Plot: data.Plot,
      }
    }

    return {}
  } catch (error) {
    console.error("[v0] Error enriching movie with OMDB:", error)
    return {}
  }
}
