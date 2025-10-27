import Navbar from "@/components/navbar"
import LandingPage from "@/components/pages/landing-page"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Navbar />
      <LandingPage />
    </main>
  )
}
