import { describe, expect, it } from 'vitest'
import { defaultAgentSettings, defaultPortfolio } from '../data/portfolio'
import { localAgentReply } from './localAgent'
import { emptyAssistantContent, knowledgeAsFaq, mergeAgentSettings } from './sanityContent'

const content = {
  ...emptyAssistantContent,
  configured: true,
  knowledge: [
    {
      id: 'aiKnowledge-notice',
      question: { en: 'What is his notice period?', ar: '' },
      answer: { en: 'One month.', ar: 'شهر واحد.' },
      keywords: ['notice period', 'فترة الإشعار'],
    },
  ],
}

describe('Sanity assistant content', () => {
  it('lets Sanity settings override local admin settings when set', () => {
    const merged = mergeAgentSettings(defaultAgentSettings, {
      name: { en: 'Sabry Bot', ar: '' },
      greeting: { en: '', ar: '' },
      mode: 'local',
      suggestions: [],
    })
    expect(merged.name).toEqual({ en: 'Sabry Bot', ar: 'Sabry Bot' })
    expect(merged.greeting).toEqual(defaultAgentSettings.greeting)
    expect(merged.mode).toBe('local')
    expect(merged.suggestions).toEqual(defaultAgentSettings.suggestions)
    expect(mergeAgentSettings(defaultAgentSettings, null)).toBe(defaultAgentSettings)
  })

  it('answers from Sanity knowledge via trigger keywords in both languages', () => {
    const knowledge = knowledgeAsFaq(content)
    const en = localAgentReply("What's Mohamed's notice period?", defaultPortfolio, defaultAgentSettings, 'en', knowledge)
    expect(en.text).toBe('One month.')
    expect(en.action).toBeUndefined()
    const ar = localAgentReply('كم فترة الإشعار؟', defaultPortfolio, defaultAgentSettings, 'ar', knowledge)
    expect(ar.text).toBe('شهر واحد.')
  })
})
