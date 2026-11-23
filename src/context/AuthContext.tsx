import { createContext, use, useMemo, useState, type ReactNode } from 'react'
import { api, ApiError, authToken } from '../lib/api'
import { hasApiUrl, sha256 } from '../lib/utils'
import { useAppSelector } from '../store'

/** `unavailable`: the configured backend could not be reached, so nobody can sign in right now. */
export type LoginResult = 'ok' | 'invalid' | 'rate_limited' | 'unavailable'

interface AuthContextValue {
  isAuthenticated: boolean
  /** True when signed in through the Node.js/MongoDB backend (edits are saved on the server). */
  isServerSession: boolean
  login: (username: string, password: string) => Promise<LoginResult>
  logout: () => void
}

const SESSION_KEY = 'ms-admin-session'

export const AuthContext = createContext<AuthContextValue | null>(null)

/** Asks the backend for a JWT. Returns `null` when there is no backend (e.g. GitHub Pages). */
async function serverLogin(username: string, password: string): Promise<{ token: string } | Exclude<LoginResult, 'ok'> | null> {
  try {
    const result = await api<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    return result ? { token: result.token } : null
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return 'invalid'
    if (error instanceof ApiError && error.status === 429) return 'rate_limited'
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { adminUsername, passwordHash } = useAppSelector((state) => state.settings)
  const [session, setSession] = useState(() => window.sessionStorage.getItem(SESSION_KEY))
  const [token, setToken] = useState(() => authToken.get())
  const isServerSession = Boolean(token)
  const isAuthenticated = isServerSession || (!hasApiUrl && session === passwordHash)

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      isServerSession,
      login: async (username, password) => {
        const result = await serverLogin(username, password)
        if (result && typeof result === 'object') {
          authToken.set(result.token)
          setToken(result.token)
          return 'ok'
        }
        if (result) return result
        // A real backend is configured but unreachable: never fall back to the browser-only login,
        // whose default credentials are public.
        if (hasApiUrl) return 'unavailable'

        // No backend (GitHub Pages, local dev): browser-only login; edits stay in this browser.
        const hash = await sha256(password)
        if (username.trim() !== adminUsername || hash !== passwordHash) return 'invalid'
        window.sessionStorage.setItem(SESSION_KEY, hash)
        setSession(hash)
        return 'ok'
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
