"use client"

import { useState, useEffect } from "react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get theme from localStorage or system preference
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    const initial = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    setTheme(initial)
    applyTheme(initial)
  }, [])

  const applyTheme = (newTheme: "light" | "dark") => {
    const html = document.documentElement
    if (newTheme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
    localStorage.setItem("theme", newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-lg bg-transparent hover:bg-accent/10 border border-border transition-colors"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  )
}
