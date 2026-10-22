/**
 * Seeds the assistant settings and a starter knowledge base from the portfolio defaults.
 * Run from the repo root: npm run studio:seed  (uses your `sanity login` session)
 */
import { getCliClient } from 'sanity/cli'
import { defaultFaqs } from '../../src/data/content'
import { defaultAgentSettings } from '../../src/data/portfolio'

const client = getCliClient({ apiVersion: '2025-02-19' })

const localizedString = (value: { en: string; ar: string }) => ({ _type: 'localizedString', ...value })
const localizedText = (value: { en: string; ar: string }) => ({ _type: 'localizedText', ...value })

const tx = client.transaction()

tx.createIfNotExists({
  _id: 'aiAssistant',
  _type: 'aiAssistant',
  enabled: defaultAgentSettings.enabled,
  mode: defaultAgentSettings.mode,
  name: localizedString(defaultAgentSettings.name),
  greeting: localizedText(defaultAgentSettings.greeting),
  instructions: defaultAgentSettings.instructions,
  suggestions: defaultAgentSettings.suggestions.map((s, index) => ({ _key: `s${index}`, ...localizedString(s) })),
})

defaultFaqs.forEach((faq, index) => {
  tx.createIfNotExists({
    _id: `aiKnowledge-${faq.id}`,
    _type: 'aiKnowledge',
    question: localizedString(faq.question),
    answer: localizedText(faq.answer),
    keywords: [],
    active: true,
    priority: defaultFaqs.length - index,
  })
})

const result = await tx.commit()
console.log(`Seeded ${result.results.length} documents into "${client.config().dataset}".`)
