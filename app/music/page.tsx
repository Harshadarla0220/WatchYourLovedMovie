import MusicPage from "@/components/pages/music"
import Navbar from "@/components/navbar"

export default function Music() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Navbar />
      <MusicPage />
    </main>
  )
}
