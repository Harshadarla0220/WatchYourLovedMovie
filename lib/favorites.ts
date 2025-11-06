// Client-side favorites management using localStorage

export interface FavoriteMovie extends Record<string, unknown> {
  imdbID: string
  title: string
  poster: string
  rating: string
  year: string
}

const FAVORITES_KEY = "moodmate_favorites"

export function getFavorites(): FavoriteMovie[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(FAVORITES_KEY)
  return stored ? JSON.parse(stored) : []
}

export function addFavorite(movie: FavoriteMovie): void {
  const favorites = getFavorites()
  if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
    favorites.push(movie)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }
}

export function removeFavorite(imdbID: string): void {
  const favorites = getFavorites()
  const updated = favorites.filter((fav) => fav.imdbID !== imdbID)
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
}

export function isFavorite(imdbID: string): boolean {
  const favorites = getFavorites()
  return favorites.some((fav) => fav.imdbID === imdbID)
}

export function clearFavorites(): void {
  localStorage.removeItem(FAVORITES_KEY)
}
