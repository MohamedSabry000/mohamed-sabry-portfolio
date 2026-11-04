import { describe, expect, it } from 'vitest'
import { parseLinks } from '../admin/pages/CollectionPage'
import { defaultPortfolio } from '../data/portfolio'
import { addCvLinks } from './migrations'

describe('CV links', () => {
  it('fills missing links on previously persisted data without overwriting edits', () => {
    const old = structuredClone(defaultPortfolio)
    old.projects = old.projects.map((p) => ({ ...p, link: p.id === 'prj_medad' ? 'https://custom.dev' : '', links: undefined }))
    old.certificates = old.certificates.map(({ link: _link, ...c }) => c)
    const migrated = addCvLinks(old)
    expect(migrated.projects.find((p) => p.id === 'prj_medad')?.link).toBe('https://custom.dev')
    expect(migrated.projects.find((p) => p.id === 'prj_tafweela')?.link).toBe('https://tafweela.com/')
    expect(migrated.projects.find((p) => p.id === 'prj_reactapis')?.links).toHaveLength(4)
    expect(migrated.certificates.find((c) => c.id === 'cert_fend')?.link).toBe('https://confirm.udacity.com/HPRH2NDK')
  })

  it('parses "Label | URL" lines from the admin editor', () => {
    expect(parseLinks('Demo | https://a.dev\nhttps://b.dev\nbad line')).toEqual([
      { label: 'Demo', url: 'https://a.dev' },
      { label: 'https://b.dev', url: 'https://b.dev' },
    ])
  })
})

describe('v3 migration', () => {
  it('adds blog and FAQ to older persisted data', async () => {
    const { addBlogAndFaq } = await import('./migrations')
    const { blog: _blog, faqs: _faqs, ...rest } = structuredClone(defaultPortfolio)
    const { blog: _b, faq: _f, ...sections } = rest.sections
    const migrated = addBlogAndFaq({ ...rest, sections } as unknown as typeof defaultPortfolio)
    expect(migrated.blog.length).toBe(defaultPortfolio.blog.length)
    expect(migrated.faqs.length).toBe(defaultPortfolio.faqs.length)
    expect(migrated.sections.blog).toBe(true)
    expect(migrated.sections.faq).toBe(true)
  })
})

describe('v4 migration', () => {
  it('adds the interview series to older persisted blogs without overwriting edits', async () => {
    const { addNewSeedPosts } = await import('./migrations')
    const edited = { ...defaultPortfolio.blog.find((p) => p.id === 'post_rtl')!, title: { en: 'Edited', ar: 'معدل' } }
    const migrated = addNewSeedPosts({ ...defaultPortfolio, blog: [edited] })
    expect(migrated.blog.find((p) => p.id === 'post_rtl')?.title.en).toBe('Edited')
    expect(migrated.blog.some((p) => p.slug === 'react-interview-questions-advanced-senior')).toBe(true)
    expect(migrated.blog).toHaveLength(defaultPortfolio.blog.length)
  })
})

describe('v8 migration', () => {
  it('refreshes unedited seeded post content and keeps edited languages', async () => {
    const { contentHash, refreshSeedPostContent } = await import('./migrations')
    const seed = defaultPortfolio.blog.find((p) => p.id === 'post_capacitor')!
    expect(contentHash('abc')).toBe(contentHash('abc'))
    const migrated = refreshSeedPostContent({
      ...defaultPortfolio,
      blog: [{ ...seed, content: { en: 'old', ar: 'معدل' } }],
    })
    // Neither language matches the v7 seed hash, so both are treated as edits and kept.
    expect(migrated.blog[0].content).toEqual({ en: 'old', ar: 'معدل' })
    expect(refreshSeedPostContent({ ...defaultPortfolio }).blog).toEqual(defaultPortfolio.blog)
  })
})

describe('v9 migration', () => {
  it('adds the Redux, Context API and Node.js interview post to older persisted blogs', async () => {
    const { addNewSeedPosts } = await import('./migrations')
    const older = defaultPortfolio.blog.filter((p) => p.id !== 'post_redux_context_node')
    const migrated = addNewSeedPosts({ ...defaultPortfolio, blog: older })
    const post = migrated.blog.find((p) => p.id === 'post_redux_context_node')
    expect(post?.content.en.match(/^### \d+\./gm)).toHaveLength(28)
    expect(post?.content.ar.match(/^### \d+\./gm)).toHaveLength(28)
    expect(migrated.blog).toHaveLength(defaultPortfolio.blog.length)
  })
})
