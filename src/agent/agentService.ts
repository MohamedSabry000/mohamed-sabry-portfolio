import type { AgentSettings, ChatAction, ChatMessage, FaqItem, Lang, PortfolioState } from '../types'
import { buildSystemPrompt } from './knowledge'
import { detectSectionAction, localAgentReply } from './localAgent'

export interface AgentResult {
  text: string
  source: 'llm' | 'local'
  action?: ChatAction
}

export interface AgentHealth {
  reachable: boolean
  llm: boolean
  sanity: { configured: boolean; logging: boolean }
}

const noSanity = { configured: false, logging: false }
let healthCache: { llm: boolean; sanity: AgentHealth['sanity']; checkedAt: number } | null = null

export async function checkAgentHealth(force = false): Promise<AgentHealth> {
  if (!force && healthCache && Date.now() - healthCache.checkedAt < 60_000) {
    return { reachable: true, llm: healthCache.llm, sanity: healthCache.sanity }
  }
  try {
    const res = await fetch('/api/health', { headers: { accept: 'application/json' } })
    if (!res.ok || !res.headers.get('content-type')?.includes('json')) throw new Error('unreachable')
    const data = (await res.json()) as { llm?: boolean; sanity?: Partial<AgentHealth['sanity']> }
    const sanity = { configured: Boolean(data.sanity?.configured), logging: Boolean(data.sanity?.logging) }
    healthCache = { llm: Boolean(data.llm), sanity, checkedAt: Date.now() }
    return { reachable: true, llm: healthCache.llm, sanity }
  } catch {
    healthCache = { llm: false, sanity: noSanity, checkedAt: Date.now() }
    return { reachable: false, llm: false, sanity: noSanity }
  }
}

async function askRemote(
  history: ChatMessage[],
  system: string,
  onToken?: (text: string) => void,
): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      system,
      messages: history.slice(-12).map(({ role, content }) => ({ role, content })),
    }),
  })
  if (!res.ok || !res.body) throw new Error(`Agent API error ${res.status}`)
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let text = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    text += decoder.decode(value, { stream: true })
    onToken?.(text)
  }
  if (!text.trim()) throw new Error('Empty response')
  return text
}

export async function getAgentReply(params: {
  question: string
  history: ChatMessage[]
  portfolio: PortfolioState
  agent: AgentSettings
  lang: Lang
  knowledge?: FaqItem[]
  onToken?: (partial: string) => void
}): Promise<AgentResult> {
  const { question, history, portfolio, agent, lang, knowledge = [], onToken } = params
  const local = (): AgentResult => ({ ...localAgentReply(question, portfolio, agent, lang, knowledge), source: 'local' })

  if (agent.mode === 'local') return local()

  const health = await checkAgentHealth()
  if (!health.llm) {
    if (agent.mode === 'remote') {
      return {
        text:
          lang === 'ar'
            ? 'نموذج الذكاء الاصطناعي غير متاح حاليًا. يرجى المحاولة لاحقًا أو استخدام نموذج التواصل.'
            : 'The AI model is not available right now. Please try again later or use the contact form.',
        source: 'local',
      }
    }
    return local()
  }

  try {
    const text = await askRemote(history, buildSystemPrompt(portfolio, agent, lang), onToken)
    return { text, source: 'llm', action: detectSectionAction(question, portfolio) }
  } catch {
    healthCache = null
    return local()
  }
}

const SESSION_KEY = 'ms-chat-session'

function chatSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

/** Saves a question/answer pair to Sanity through the API server (fire and forget). */
export function logChatToSanity(entry: { question: string; answer: string; source: 'llm' | 'local'; lang: Lang }) {
  void fetch('/api/chat/log', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...entry, sessionId: chatSessionId() }),
    keepalive: true,
  }).catch(() => {})
}
