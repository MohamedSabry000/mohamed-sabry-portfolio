import { describe, expect, it } from 'vitest'
import { defaultAgentSettings, defaultPortfolio } from '../data/portfolio'
import { detectIntent, localAgentReply } from './localAgent'

const ask = (q: string, lang: 'en' | 'ar' = 'en') => localAgentReply(q, defaultPortfolio, defaultAgentSettings, lang)

describe('localAgent', () => {
  it('detects intents in English and Arabic', () => {
    expect(detectIntent('What are his skills?').intent).toBe('skills')
    expect(detectIntent('كيف أتواصل معه؟').intent).toBe('contact')
    expect(detectIntent('اعرض مشاريعه').intent).toBe('projects')
  })

  it('answers the current role from portfolio data', () => {
    const reply = ask('What is his current role?')
    expect(reply.text).toContain('Naseej')
    expect(reply.action).toEqual({ type: 'scroll', target: 'experience' })
  })

  it('replies in Arabic when asked in Arabic', () => {
    expect(ask('ما هي أهم مهاراته؟', 'en').text).toContain('مهارات')
  })

  it('answers about a specific technology', () => {
    const reply = ask('Does he know React Native?')
    expect(reply.text).toMatch(/Yes/)
    expect(reply.text).toContain('React Native')
  })

  it('answers about a specific project', () => {
    expect(ask('Tell me about Tafweela').text).toContain('petrol stations')
  })

  it('returns contact details', () => {
    expect(ask('how can I contact him?').text).toContain(defaultPortfolio.profile.email)
  })

  it('falls back with suggestions for unknown questions', () => {
    expect(ask('qwerty zxcv').text).toContain(defaultAgentSettings.suggestions[0].en)
  })
})

describe('localAgent project links', () => {
  it('includes project demo links in answers', () => {
    const reply = localAgentReply('Show me Movie Yo', defaultPortfolio, defaultAgentSettings, 'en')
    expect(reply.text).toContain('https://movie-yo.vercel.app/')
  })
})

describe('localAgent FAQ & blog', () => {
  it('answers from the FAQ', () => {
    const reply = ask('Does he build Arabic RTL websites?')
    expect(reply.text).toContain('right-to-left')
    expect(reply.action).toEqual({ type: 'scroll', target: 'faq' })
  })

  it('answers FAQ questions in Arabic', () => {
    expect(ask('أين يقيم محمد؟', 'ar').text).toContain('القاهرة')
  })

  it('lists blog articles', () => {
    const reply = ask('Does he write blog articles?')
    expect(reply.text).toContain('/blog/javascript-interview-questions-internals-deep-dive')
    expect(reply.action).toEqual({ type: 'scroll', target: 'blog' })
  })
})
