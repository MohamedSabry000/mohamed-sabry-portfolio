import type { MigrationManifest, PersistedState } from 'redux-persist'
import { defaultPortfolio } from '../data/portfolio'
import type { PortfolioState } from '../types'

type Linkable = { id: string; link?: string; links?: { label: string; url: string }[] }

function fillLinks<T extends Linkable>(items: T[] | undefined, defaults: Linkable[]): T[] | undefined {
  return items?.map((item) => {
    const seed = defaults.find((d) => d.id === item.id)
    if (!seed) return item
    return {
      ...item,
      link: item.link || seed.link || '',
      ...(seed.links && !item.links?.length ? { links: seed.links } : {}),
    }
  })
}

/** v2: adds the project, company and certificate links from the CV to seeded items. */
export function addCvLinks(portfolio: PortfolioState): PortfolioState {
  return {
    ...portfolio,
    projects: fillLinks(portfolio.projects, defaultPortfolio.projects) ?? defaultPortfolio.projects,
    experiences: fillLinks(portfolio.experiences, defaultPortfolio.experiences) ?? defaultPortfolio.experiences,
    certificates: fillLinks(portfolio.certificates, defaultPortfolio.certificates) ?? defaultPortfolio.certificates,
  }
}

/** v3: adds the blog and FAQ collections and their section toggles. */
export function addBlogAndFaq(portfolio: PortfolioState): PortfolioState {
  return {
    ...portfolio,
    blog: portfolio.blog ?? defaultPortfolio.blog,
    faqs: portfolio.faqs ?? defaultPortfolio.faqs,
    sections: { ...portfolio.sections, blog: portfolio.sections?.blog ?? true, faq: portfolio.sections?.faq ?? true },
  }
}

/** v4: adds new seeded blog posts (e.g. the interview series) without touching existing ones. */
export function addNewSeedPosts(portfolio: PortfolioState): PortfolioState {
  const blog = portfolio.blog ?? []
  const ids = new Set(blog.map((post) => post.id))
  const slugs = new Set(blog.map((post) => post.slug))
  const missing = defaultPortfolio.blog.filter((post) => !ids.has(post.id) && !slugs.has(post.slug))
  return missing.length ? { ...portfolio, blog: [...missing, ...blog] } : portfolio
}

/** FNV-1a hash of a string's UTF-16 code units, used to recognise unedited seed content. */
export function contentHash(text: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 0x01000193) >>> 0
  return hash
}

/** Hashes of the v7 seed content of posts whose text changed in v8 (code examples added). */
const v7PostHashes: Record<string, Record<'en' | 'ar', number>> = {
  post_js_fundamentals: { en: 663783076, ar: 3986835170 },
  post_js_intermediate: { en: 106774855, ar: 2705072118 },
  post_js_advanced: { en: 2598799197, ar: 3970786646 },
  post_react_fundamentals: { en: 2841178566, ar: 3314316856 },
  post_react_intermediate: { en: 3537220460, ar: 1449408208 },
  post_react_advanced: { en: 1624852967, ar: 2299854657 },
  post_rtl: { en: 579920860, ar: 1505099359 },
  post_forms: { en: 1588171427, ar: 4259255180 },
  post_capacitor: { en: 970238078, ar: 3233057618 },
}

/** v8: replaces the content of seeded posts with the updated seed text, unless the admin edited that language. */
export function refreshSeedPostContent(portfolio: PortfolioState): PortfolioState {
  if (!portfolio.blog) return portfolio
  const blog = portfolio.blog.map((post) => {
    const oldHashes = v7PostHashes[post.id]
    const seed = defaultPortfolio.blog.find((item) => item.id === post.id)
    if (!oldHashes || !seed) return post
    const content = { ...post.content }
    for (const lang of ['en', 'ar'] as const) {
      if (contentHash(content[lang] ?? '') === oldHashes[lang]) content[lang] = seed.content[lang]
    }
    return { ...post, content }
  })
  return { ...portfolio, blog }
}

type RootPersisted = PersistedState & { portfolio?: PortfolioState }

export const migrations: MigrationManifest = {
  2: (state) => {
    const root = state as RootPersisted
    return (root?.portfolio ? { ...root, portfolio: addCvLinks(root.portfolio) } : root) as PersistedState
  },
  3: (state) => {
    const root = state as RootPersisted
    return (root?.portfolio ? { ...root, portfolio: addBlogAndFaq(root.portfolio) } : root) as PersistedState
  },
  4: (state) => {
    const root = state as RootPersisted
    return (root?.portfolio ? { ...root, portfolio: addNewSeedPosts(root.portfolio) } : root) as PersistedState
  },
  5: (state) => {
    const root = state as RootPersisted
    return (root?.portfolio ? { ...root, portfolio: addNewSeedPosts(root.portfolio) } : root) as PersistedState
  },
  6: (state) => {
    const root = state as RootPersisted
    return (root?.portfolio ? { ...root, portfolio: addNewSeedPosts(root.portfolio) } : root) as PersistedState
  },
  7: (state) => {
    const root = state as RootPersisted
    return (root?.portfolio ? { ...root, portfolio: addNewSeedPosts(root.portfolio) } : root) as PersistedState
  },
  8: (state) => {
    const root = state as RootPersisted
    return (root?.portfolio ? { ...root, portfolio: refreshSeedPostContent(root.portfolio) } : root) as PersistedState
  },
}
