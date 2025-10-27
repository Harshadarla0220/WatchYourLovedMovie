"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    checkUser()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
    { label: "Music", href: "/music" },
  ]

  const authenticatedNavItems = [
    { label: "Favorites", href: "/favorites" },
    { label: "History", href: "/history" },
    { label: "Profile", href: "/profile" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover-lift">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl text-foreground">MoodMate</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
                  {item.label}
                </Button>
              </Link>
            ))}
            {user &&
              authenticatedNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Button>
                </Link>
              ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-2">
            {!isLoading && user ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <span>👤</span>
                    {user.email?.split("@")[0]}
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent">
                  <span>🚪</span>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="w-full justify-start text-foreground">
                  {item.label}
                </Button>
              </Link>
            ))}
            {user &&
              authenticatedNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" className="w-full justify-start text-foreground">
                    {item.label}
                  </Button>
                </Link>
              ))}
            <div className="flex gap-2 pt-2 flex-col">
              {!isLoading && user ? (
                <>
                  <Link href="/profile" className="w-full">
                    <Button variant="outline" className="w-full bg-transparent justify-start">
                      <span className="mr-2">👤</span>
                      Profile
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent justify-start">
                    <span className="mr-2">🚪</span>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full bg-transparent">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
