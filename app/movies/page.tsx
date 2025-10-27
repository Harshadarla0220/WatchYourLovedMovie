import MoviesPage from "@/components/pages/movies"
import Navbar from "@/components/navbar"

export default function Movies() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Navbar />
      <MoviesPage />
    </main>
  )
}
