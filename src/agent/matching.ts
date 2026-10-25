// Finds projects, technologies and FAQ/knowledge entries mentioned in a visitor's question.
import type { FaqItem, PortfolioState } from '../types'
import { hasKeyword, normalize } from './intents'

export const allTech = (portfolio: PortfolioState) => {
  const set = new Set<string>()
  portfolio.skillGroups.forEach((group) => group.items.forEach((item) => set.add(item)))
  portfolio.projects.forEach((project) => project.tech.forEach((item) => set.add(item)))
  portfolio.experiences.forEach((exp) => exp.tech.forEach((item) => set.add(item)))
  return [...set]
}

export const techAliases: Record<string, string[]> = {
  'react.js': ['react', 'reactjs', 'رياكت'],
  'next.js': ['next', 'nextjs', 'نكست'],
  'node.js': ['node', 'nodejs', 'نود'],
  typescript: ['ts', 'تايب سكريبت'],
  'javascript (es6+)': ['javascript', 'js', 'جافاسكريبت'],
  'tailwind css': ['tailwind', 'تيلويند'],
  'react native': ['react native', 'mobile', 'موبايل', 'جوال'],
  'rtl layouts': ['rtl', 'right to left', 'arabic support'],
  mongodb: ['mongo'],
  'express.js': ['express'],
}

export function findMentionedTech(question: string, portfolio: PortfolioState) {
  const text = normalize(question)
  return allTech(portfolio).filter((tech) => {
    const base = normalize(tech.replace(/\(.*?\)/g, ''))
    const aliases = [base, ...(techAliases[tech.toLowerCase()] ?? [])]
    return aliases.some((alias) => alias.length > 1 && hasKeyword(text, alias))
  })
}

export function findMentionedProject(question: string, portfolio: PortfolioState) {
  const text = normalize(question)
  const generic = new Set(['system', 'platform', 'app', 'apps', 'store', 'management', 'project', 'university'])
  allTech(portfolio).forEach((tech) => normalize(tech).split(' ').forEach((word) => generic.add(word)))
  return portfolio.projects.find((project) => {
    if ((project.links ?? []).some((link) => text.includes(normalize(link.label)))) return true
    const names = [project.title.en, project.title.ar].map((n) => normalize(n.replace(/\(.*?\)/g, '')))
    return names.some(
      (name) =>
        name.length > 2 &&
        (text.includes(name) || name.split(' ').some((w) => w.length > 3 && !generic.has(w) && hasKeyword(text, w))),
    )
  })
}

export const stopwords = new Set([
  'the', 'and', 'for', 'you', 'your', 'does', 'did', 'can', 'could', 'what', 'which', 'how', 'his', 'him', 'are', 'with',
  'about', 'who', 'where', 'when', 'will', 'have', 'has', 'that', 'this', 'from', 'into', 'any', 'kind',
  'هل', 'ما', 'ماذا', 'كيف', 'من', 'في', 'علي', 'عن', 'الي', 'او', 'هو', 'لديه', 'يمكن', 'التي', 'الذي', 'مع', 'نوع',
])
export const tokens = (text: string) => normalize(text).split(' ').filter((word) => word.length > 2 && !stopwords.has(word))

/** Finds the FAQ entry whose question best matches the visitor's question. */
export function findFaq(question: string, items: FaqItem[]): FaqItem | undefined {
  const text = normalize(question)
  const asked = new Set(tokens(question))
  let best: { faq: FaqItem; score: number } | undefined
  for (const faq of items) {
    // Trigger keywords: a multi-word phrase is a strong signal, single words need company.
    const keywordScore = (faq.keywords ?? [])
      .map(normalize)
      .filter((keyword, index, all) => keyword.length > 1 && all.indexOf(keyword) === index && hasKeyword(text, keyword))
      .reduce((sum, keyword) => sum + (keyword.includes(' ') ? 2 : 1), 0)
    let questionScore = 0
    for (const variant of [faq.question.en, faq.question.ar]) {
      const words = [...new Set(tokens(variant))]
      const hits = words.filter((word) => asked.has(word)).length
      const ratio = hits / Math.max(words.length, asked.size, 1)
      if ((hits >= 2 && ratio >= 0.5) || (hits >= 1 && ratio === 1)) questionScore = Math.max(questionScore, ratio)
    }
    if (keywordScore < 2 && questionScore === 0) continue
    const score = questionScore * 3 + keywordScore
    if (!best || score > best.score) best = { faq, score }
  }
  return best?.faq
}
