import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const AUTH_STORAGE_KEY = 'blog-auth-user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!stored) return null

    try {
      return JSON.parse(stored)
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return null
    }
  })

  const login = ({ username, password }) => {
    if (!username.trim() || !password.trim()) {
      return {
        ok: false,
        error: 'Username and password are required to access blog content.',
      }
    }

    const nextUser = {
      username: username.trim(),
      loggedInAt: new Date().toISOString(),
    }

    setUser(nextUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))

    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
