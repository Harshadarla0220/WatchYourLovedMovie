import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Navbar from "@/components/navbar"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome, {profile?.display_name || "User"}!</h1>
          <p className="text-muted-foreground">What's your mood today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/movies">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-xl p-8 hover:border-primary/40 transition-all cursor-pointer">
              <div className="text-4xl mb-4">🎬</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Movies</h2>
              <p className="text-muted-foreground">Get movie recommendations based on your mood</p>
            </div>
          </Link>

          <Link href="/music">
            <div className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 rounded-xl p-8 hover:border-accent/40 transition-all cursor-pointer">
              <div className="text-4xl mb-4">🎵</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Music</h2>
              <p className="text-muted-foreground">Discover music that matches your current mood</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
