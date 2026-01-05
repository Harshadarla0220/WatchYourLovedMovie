import Navbar from "@/components/navbar"
import MovieDetailWrapper from "@/components/movie-detail-wrapper"

interface MoviePageProps {
  params: { id: string }
}

export default function MoviePage({ params }: MoviePageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MovieDetailWrapper movieId={Number.parseInt(params.id)} />
      </div>
    </main>
  )
}
