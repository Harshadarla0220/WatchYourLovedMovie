"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { getCurrentUser, logoutUser } from "@/lib/auth"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<{ email?: string; displayName?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    logoutUser()
    setUser(null)
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
  ]

  const authenticatedNavItems = [{ label: "Favorites", href: "/favorites" }]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl text-foreground">MoodMate</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/20 text-primary font-semibold"
                      : "text-foreground hover:bg-accent/10"
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
            {user &&
              authenticatedNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <button
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-foreground hover:bg-accent/10"
                    }`}
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-2">
            {!isLoading && user ? (
              <>
                <div className="flex items-center gap-2 mr-2">
                  <span className="text-foreground font-medium">{user.displayName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg border border-border hover:bg-accent/10 transition-colors flex items-center gap-2 bg-transparent"
                >
                  <span>🚪</span>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-3 py-2 rounded-lg border border-border hover:bg-accent/10 transition-colors">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="px-3 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors">
                    Sign Up
                  </button>
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
                <button
                  className={`w-full justify-start px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-primary/20 text-primary font-semibold"
                      : "text-foreground hover:bg-accent/10"
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
            {user &&
              authenticatedNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <button
                    className={`w-full justify-start px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-foreground hover:bg-accent/10"
                    }`}
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">Theme</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
