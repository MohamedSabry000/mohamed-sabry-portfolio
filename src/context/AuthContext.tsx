import { createContext, use, useMemo, useState, type ReactNode } from 'react'
import { api, ApiError, authToken } from '../lib/api'
import { sha256 } from '../lib/utils'
import { useAppSelector } from '../store'

interface AuthContextValue {
  isAuthenticated: boolean
  /** True when signed in through the Node.js/MongoDB backend (edits are saved on the server). */
  isServerSession: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const SESSION_KEY = 'ms-admin-session'

export const AuthContext = createContext<AuthContextValue | null>(null)

/** Asks the backend for a JWT. Returns `null` when there is no backend (e.g. GitHub Pages). */
async function serverLogin(username: string, password: string): Promise<string | false | null> {
  try {
    const result = await api<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    return result ? result.token : null
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return false
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { adminUsername, passwordHash } = useAppSelector((state) => state.settings)
  const [session, setSession] = useState(() => window.sessionStorage.getItem(SESSION_KEY))
  const [token, setToken] = useState(() => authToken.get())
  const isServerSession = Boolean(token)
  const isAuthenticated = isServerSession || session === passwordHash

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      isServerSession,
      login: async (username, password) => {
        const serverToken = await serverLogin(username, password)
        if (serverToken) {
          authToken.set(serverToken)
          setToken(serverToken)
          return true
        }
        if (serverToken === false) return false

        const hash = await sha256(password)
        if (username.trim() !== adminUsername || hash !== passwordHash) return false
        window.sessionStorage.setItem(SESSION_KEY, hash)
        setSession(hash)
        return true
      },
      logout: () => {
        authToken.clear()
        window.sessionStorage.removeItem(SESSION_KEY)
        setToken(null)
        setSession(null)
      },
    }),
    [isAuthenticated, isServerSession, adminUsername, passwordHash],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}

export function useAuth() {
  const context = use(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
