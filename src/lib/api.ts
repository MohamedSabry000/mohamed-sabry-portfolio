// Thin client for the Node.js/MongoDB backend. On static hosting (GitHub Pages) there is no API,
// so every call resolves to `null` and the app keeps using its built-in/persisted content.
import { isStaticSite } from './utils'

const TOKEN_KEY = 'ms-admin-token'
const API_BASE = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/api`

export const hasBackend = !isStaticSite

export const authToken = {
  get: () => window.sessionStorage.getItem(TOKEN_KEY),
  set: (token: string) => window.sessionStorage.setItem(TOKEN_KEY, token),
  clear: () => window.sessionStorage.removeItem(TOKEN_KEY),
}

export class ApiError extends Error {
  status: number

  constructor(status: number) {
    super(`API request failed with status ${status}`)
    this.status = status
  }
}

/** Calls the API. Returns `null` when no backend is reachable; throws `ApiError` on HTTP errors. */
export async function api<T = unknown>(path: string, init: RequestInit = {}): Promise<T | null> {
  if (!hasBackend) return null
  const token = authToken.get()
  let response: Response
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    })
  } catch {
    return null
  }
  if (response.status === 503 || response.status === 502) return null
  if (!response.ok) throw new ApiError(response.status)
  return response.status === 204 ? (undefined as T) : ((await response.json()) as T)
}
