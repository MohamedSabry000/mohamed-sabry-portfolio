import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { defaultPortfolio } from '../../data/portfolio'
import type {
  CollectionItem,
  CollectionKey,
  Localized,
  PortfolioState,
  Profile,
  SectionKey,
} from '../../types'

type UpsertPayload = {
  [K in CollectionKey]: { collection: K; item: CollectionItem<K> }
}[CollectionKey]

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: defaultPortfolio,
  reducers: {
    updateProfile(state, action: PayloadAction<Partial<Profile>>) {
      state.profile = { ...state.profile, ...action.payload }
    },
    upsertItem(state, action: PayloadAction<UpsertPayload>) {
      const { collection, item } = action.payload
      const list = state[collection] as Array<{ id: string }>
      const index = list.findIndex((entry) => entry.id === item.id)
      if (index === -1) list.push(item)
      else list[index] = item
    },
    removeItem(state, action: PayloadAction<{ collection: CollectionKey; id: string }>) {
      const { collection, id } = action.payload
      const list = state[collection] as Array<{ id: string }>
      const index = list.findIndex((entry) => entry.id === id)
      if (index !== -1) list.splice(index, 1)
    },
    moveItem(
      state,
      action: PayloadAction<{ collection: CollectionKey; id: string; direction: -1 | 1 }>,
    ) {
      const { collection, id, direction } = action.payload
      const list = state[collection] as Array<{ id: string }>
      const from = list.findIndex((entry) => entry.id === id)
      const to = from + direction
      if (from === -1 || to < 0 || to >= list.length) return
      const [moved] = list.splice(from, 1)
      list.splice(to, 0, moved)
    },
    setSoftSkills(state, action: PayloadAction<Localized[]>) {
      state.softSkills = action.payload
    },
    toggleSection(state, action: PayloadAction<SectionKey>) {
      state.sections[action.payload] = !state.sections[action.payload]
    },
    importPortfolio(_state, action: PayloadAction<PortfolioState>) {
      return {
        ...defaultPortfolio,
        ...action.payload,
        sections: { ...defaultPortfolio.sections, ...action.payload.sections },
      }
    },
    resetPortfolio() {
      return defaultPortfolio
    },
  },
})

export const {
  updateProfile,
  upsertItem,
  removeItem,
  moveItem,
  setSoftSkills,
  toggleSection,
  importPortfolio,
  resetPortfolio,
} = portfolioSlice.actions
export default portfolioSlice.reducer
