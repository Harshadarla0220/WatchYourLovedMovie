"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center fade-in">
          <div className="mb-8 inline-block slide-up">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              ✨ Your Mood. Your Moment. Your Recommendation.
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight slide-up">
            Discover Entertainment
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              That Matches Your Mood
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto slide-up">
            MoodMate uses AI to recommend movies and music tailored to your current emotional state. Find your next
            favorite in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 slide-up">
            <Link href="/movies">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white hover-lift">
                Explore Movies
              </Button>
            </Link>
            <Link href="/music">
              <Button size="lg" variant="outline" className="hover-lift bg-transparent">
                Explore Music
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Movies Card */}
            <Link href="/movies">
              <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 h-full hover-lift scale-in">
                <div className="relative h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all" />
                  <span className="text-6xl">🎬</span>
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <span>🎬</span> Movies
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Discover movies that match your current mood. From thrilling action to heartwarming romance.
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 w-full">Get Movie Recommendations</Button>
                </div>
              </Card>
            </Link>

            {/* Music Card */}
            <Link href="/music">
              <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 h-full hover-lift scale-in">
                <div className="relative h-64 bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10 group-hover:from-pink-500/20 group-hover:to-orange-500/20 transition-all" />
                  <span className="text-6xl">🎵</span>
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <span>🎵</span> Music
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Listen to music that fits your feelings. Curated playlists for every mood and moment.
                  </p>
                  <Button className="bg-accent hover:bg-accent/90 w-full">Get Music Recommendations</Button>
                </div>
              </Card>
            </Link>
          </div>

          {/* Features Section */}
          <div className="bg-card rounded-2xl p-8 border border-border fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Why Choose MoodMate?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">✨</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">AI-Powered</h4>
                <p className="text-muted-foreground text-sm">
                  Advanced AI understands your mood and recommends perfect content
                </p>
              </div>
              <div className="text-center hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🎬</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Personalized</h4>
                <p className="text-muted-foreground text-sm">
                  Get recommendations tailored to your preferences and mood
                </p>
              </div>
              <div className="text-center hover-lift">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🎵</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Diverse</h4>
                <p className="text-muted-foreground text-sm">Movies and music in multiple languages and genres</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
