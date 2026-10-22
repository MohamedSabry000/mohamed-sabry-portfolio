import { createContext, use, useMemo, useState, type ReactNode } from 'react'
import { sha256 } from '../lib/utils'
import { useAppSelector } from '../store'

interface AuthContextValue {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const SESSION_KEY = 'ms-admin-session'

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { adminUsername, passwordHash } = useAppSelector((state) => state.settings)
  const [session, setSession] = useState(() => window.sessionStorage.getItem(SESSION_KEY))
  const isAuthenticated = session === passwordHash

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      login: async (username, password) => {
        const hash = await sha256(password)
        if (username.trim() !== adminUsername || hash !== passwordHash) return false
        window.sessionStorage.setItem(SESSION_KEY, hash)
        setSession(hash)
        return true
      },
      logout: () => {
        window.sessionStorage.removeItem(SESSION_KEY)
        setSession(null)
      },
    }),
    [isAuthenticated, adminUsername, passwordHash],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}

export function useAuth() {
  const context = use(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
