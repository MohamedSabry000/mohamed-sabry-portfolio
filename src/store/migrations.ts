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
}
