import { describe, expect, it } from 'vitest'
import { defaultPortfolio } from '../data/portfolio'
import reducer, { moveItem, removeItem, toggleSection, upsertItem } from './slices/portfolioSlice'

describe('portfolioSlice', () => {
  it('adds, updates and removes collection items', () => {
    const item = { id: 'x', name: { en: 'French', ar: 'الفرنسية' }, level: { en: 'Basic', ar: 'مبتدئ' } }
    let state = reducer(defaultPortfolio, upsertItem({ collection: 'languages', item }))
    expect(state.languages.at(-1)).toEqual(item)
    state = reducer(state, upsertItem({ collection: 'languages', item: { ...item, level: { en: 'Good', ar: 'جيد' } } }))
    expect(state.languages.at(-1)?.level.en).toBe('Good')
    state = reducer(state, removeItem({ collection: 'languages', id: 'x' }))
    expect(state.languages.find((l) => l.id === 'x')).toBeUndefined()
  })

  it('reorders items and toggles sections', () => {
    const [first, second] = defaultPortfolio.projects
    const state = reducer(defaultPortfolio, moveItem({ collection: 'projects', id: first.id, direction: 1 }))
    expect(state.projects[0].id).toBe(second.id)
    expect(reducer(state, toggleSection('skills')).sections.skills).toBe(false)
  })
})
