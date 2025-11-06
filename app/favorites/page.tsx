import Navbar from "@/components/navbar"
import FavoritesPage from "@/components/pages/favorites-page"

export default function Favorites() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Navbar />
      <FavoritesPage />
    </main>
  )
}
