import { isStaticSite } from '../lib/utils'
import type { AgentSettings, FaqItem, Localized } from '../types'
import { ASSISTANT_QUERY, normalizeContent } from './sanityShared'

export interface SanityKnowledge {
  id: string
  question: Localized
  answer: Localized
  keywords: string[]
}

export interface AssistantContent {
  configured: boolean
  logging: boolean
  settings: Partial<AgentSettings> | null
  knowledge: SanityKnowledge[]
}

export const emptyAssistantContent: AssistantContent = { configured: false, logging: false, settings: null, knowledge: [] }

let contentPromise: Promise<AssistantContent> | null = null

/** Assistant settings + knowledge managed in Sanity, served by the API server. Cached for the page lifetime. */
const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const SANITY_DATASET = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production'

/** Static builds read the public dataset straight from Sanity's CDN (needs the site origin in Sanity CORS settings). */
async function fetchFromSanityCdn(): Promise<AssistantContent> {
  if (!SANITY_PROJECT_ID) return emptyAssistantContent
  const url = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v2025-02-19/data/query/${SANITY_DATASET}?query=${encodeURIComponent(ASSISTANT_QUERY)}`
  const res = await fetch(url)
  if (!res.ok) return emptyAssistantContent
  const { result } = (await res.json()) as { result?: { settings?: unknown; knowledge?: unknown } }
  return { configured: true, logging: false, ...normalizeContent(result ?? null) } as AssistantContent
}

export function getAssistantContent(): Promise<AssistantContent> {
  if (isStaticSite) {
    contentPromise ??= fetchFromSanityCdn().catch(() => emptyAssistantContent)
    return contentPromise
  }
  contentPromise ??= fetch('/api/assistant', { headers: { accept: 'application/json' } })
    .then(async (res) => {
      if (!res.ok || !res.headers.get('content-type')?.includes('json')) return emptyAssistantContent
      return { ...emptyAssistantContent, ...((await res.json()) as Partial<AssistantContent>) }
    })
    .catch(() => emptyAssistantContent)
  return contentPromise
}

export function resetAssistantContent() {
  contentPromise = null
}

const hasText = (value?: Localized) => Boolean(value && (value.en?.trim() || value.ar?.trim()))
const fill = (value: Localized): Localized => ({ en: value.en || value.ar, ar: value.ar || value.en })

/** Sanity values override the locally persisted admin settings when they are set. */
export function mergeAgentSettings(local: AgentSettings, remote: AssistantContent['settings']): AgentSettings {
  if (!remote) return local
  return {
    ...local,
    ...(typeof remote.enabled === 'boolean' ? { enabled: remote.enabled } : {}),
    ...(remote.mode ? { mode: remote.mode } : {}),
    ...(remote.name && hasText(remote.name) ? { name: fill(remote.name) } : {}),
    ...(remote.greeting && hasText(remote.greeting) ? { greeting: fill(remote.greeting) } : {}),
    ...(remote.instructions?.trim() ? { instructions: remote.instructions } : {}),
    ...(remote.suggestions?.length ? { suggestions: remote.suggestions.filter(hasText).map(fill) } : {}),
  }
}

export const knowledgeAsFaq = (content: AssistantContent): FaqItem[] =>
  content.knowledge.map(({ id, question, answer, keywords }) => ({ id, question: fill(question), answer: fill(answer), keywords }))

/** Seeds the cache with already-loaded content so `use()` reads it without suspending (tests, preloading). */
export function primeAssistantContent(content: AssistantContent) {
  contentPromise = Object.assign(Promise.resolve(content), { status: 'fulfilled', value: content })
}
