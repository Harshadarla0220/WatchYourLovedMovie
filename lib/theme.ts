export function getTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return (localStorage.getItem("theme") as "light" | "dark") || "light"
}

export function setTheme(theme: "light" | "dark") {
  localStorage.setItem("theme", theme)
  const html = document.documentElement
  if (theme === "dark") {
    html.classList.add("dark")
  } else {
    html.classList.remove("dark")
  }
}

export function toggleTheme() {
  const current = getTheme()
  const newTheme = current === "dark" ? "light" : "dark"
  setTheme(newTheme)
  return newTheme
}
