import type { AgentSettings, ChatAction, ChatMessage, Lang, PortfolioState } from '../types'
import { buildSystemPrompt } from './knowledge'
import { detectSectionAction, localAgentReply } from './localAgent'

export interface AgentResult {
  text: string
  source: 'llm' | 'local'
  action?: ChatAction
}

let healthCache: { llm: boolean; checkedAt: number } | null = null

export async function checkAgentHealth(force = false): Promise<{ reachable: boolean; llm: boolean }> {
  if (!force && healthCache && Date.now() - healthCache.checkedAt < 60_000) {
    return { reachable: true, llm: healthCache.llm }
  }
  try {
    const res = await fetch('/api/health', { headers: { accept: 'application/json' } })
    if (!res.ok || !res.headers.get('content-type')?.includes('json')) throw new Error('unreachable')
    const data = (await res.json()) as { llm?: boolean }
    healthCache = { llm: Boolean(data.llm), checkedAt: Date.now() }
    return { reachable: true, llm: healthCache.llm }
  } catch {
    healthCache = { llm: false, checkedAt: Date.now() }
    return { reachable: false, llm: false }
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
  onToken?: (partial: string) => void
}): Promise<AgentResult> {
  const { question, history, portfolio, agent, lang, onToken } = params
  const local = (): AgentResult => ({ ...localAgentReply(question, portfolio, agent, lang), source: 'local' })

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
