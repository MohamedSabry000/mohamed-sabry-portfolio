import express from 'express'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
try {
  process.loadEnvFile()
} catch {
  // no .env file
}

const PORT = Number(process.env.PORT ?? 8787)
const API_KEY = process.env.OPENAI_API_KEY ?? ''
const BASE_URL = (process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1').replace(/\/$/, '')
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini'

app.use(express.json({ limit: '200kb' }))

// Basic per-IP rate limit to protect the API key.
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = Number(process.env.CHAT_RATE_LIMIT ?? 40)
const hits = new Map<string, number[]>()
function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_REQUESTS
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, llm: Boolean(API_KEY), model: API_KEY ? MODEL : null })
})

interface ChatBody {
  system?: string
  messages?: Array<{ role: string; content: string }>
}

app.post('/api/chat', async (req, res) => {
  if (!API_KEY) {
    res.status(503).json({ error: 'not_configured' })
    return
  }
  if (rateLimited(req.ip ?? 'unknown')) {
    res.status(429).json({ error: 'rate_limited' })
    return
  }
  const { system = '', messages = [] } = (req.body ?? {}) as ChatBody
  const cleaned = messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
  if (!cleaned.length) {
    res.status(400).json({ error: 'no_messages' })
    return
  }

  try {
    const upstream = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.4,
        max_tokens: 500,
        messages: [{ role: 'system', content: String(system).slice(0, 20000) }, ...cleaned],
      }),
    })
    if (!upstream.ok || !upstream.body) {
      res.status(502).json({ error: 'upstream_error', status: upstream.status })
      return
    }

    res.setHeader('content-type', 'text/plain; charset=utf-8')
    res.setHeader('cache-control', 'no-cache')
    const reader = upstream.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        const data = line.replace(/^data:\s*/, '').trim()
        if (!data || data === '[DONE]') continue
        try {
          const delta = JSON.parse(data).choices?.[0]?.delta?.content
          if (delta) res.write(delta)
        } catch {
          // ignore keep-alive / partial lines
        }
      }
    }
    res.end()
  } catch (error) {
    console.error('chat error', error)
    if (!res.headersSent) res.status(500).json({ error: 'server_error' })
    else res.end()
  }
})

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')
if (existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/^(?!\/api\/).*/, (_req, res) => res.sendFile(path.join(distDir, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`API server on http://localhost:${PORT} — LLM ${API_KEY ? `enabled (${MODEL})` : 'disabled (local agent fallback)'}`)
})
