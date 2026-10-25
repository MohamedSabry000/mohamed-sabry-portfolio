export const uid = (prefix = 'id') =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

export const isArabicText = (text: string) => /[\u0600-\u06FF]/.test(text)

export async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** Prefixes app-relative paths with the deploy base (e.g. /mohamed-sabry-portfolio/ on GitHub Pages). */
export const assetUrl = (path: string) =>
  path.startsWith('/') && !path.startsWith('//') ? import.meta.env.BASE_URL + path.slice(1) : path

export const siteUrl = (path: string) => `${location.origin}${assetUrl(path)}`

// The backend lives in its own repo (mohamed-sabry-portfolio-api). VITE_API_URL points at it;
// without it the API is expected on the same origin (local dev uses the Vite proxy).
const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '')
export const apiBase = API_URL ? `${API_URL}/api` : `${import.meta.env.BASE_URL.replace(/\/$/, '')}/api`
/** True for a static build with no backend configured (e.g. GitHub Pages without VITE_API_URL). */
export const isStaticSite = import.meta.env.VITE_STATIC === 'true' && !API_URL

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')

export const readingMinutes = (text: string) => Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))

export const formatDay = (date: string, lang: 'en' | 'ar') => {
  const parsed = new Date(`${date}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return date
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(parsed)
}
