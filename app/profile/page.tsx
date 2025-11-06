"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import { createClient } from "@/lib/supabase/client"

export default function ProfilePage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
      } else {
        setUser(user)
      }
      setIsLoading(false)
    }

    checkUser()
  }, [supabase, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👤</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Your Profile</h1>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-lg font-semibold text-foreground">{user.email}</p>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-sm text-muted-foreground mb-1">Account Status</p>
              <p className="text-lg font-semibold text-primary">Active</p>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/favorites" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <span className="mr-2">❤️</span>
                View Favorites
              </Button>
            </Link>
            <Link href="/history" className="block">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <span className="mr-2">📜</span>
                View History
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" className="w-full justify-start bg-transparent">
              <span className="mr-2">🚪</span>
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}
