// LocalStorage-based authentication for MoodMate

export interface User {
  email: string
  displayName: string
  password: string
}

const USERS_KEY = "moodmate_users"
const CURRENT_USER_KEY = "moodmate_current_user"

export function registerUser(email: string, displayName: string, password: string): boolean {
  const users = getStoredUsers()

  if (users.some((u) => u.email === email)) {
    return false // User already exists
  }

  users.push({ email, displayName, password })
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return true
}

export function loginUser(email: string, password: string): boolean {
  const users = getStoredUsers()
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ email: user.email, displayName: user.displayName }))
    return true
  }

  return false
}

export function logoutUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function getCurrentUser(): { email: string; displayName: string } | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem(CURRENT_USER_KEY)
  return user ? JSON.parse(user) : null
}

export function isUserLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem(CURRENT_USER_KEY)
}

function getStoredUsers(): User[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(USERS_KEY)
  return stored ? JSON.parse(stored) : []
}
