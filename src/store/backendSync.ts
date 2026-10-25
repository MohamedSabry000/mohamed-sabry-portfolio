// Keeps the Redux portfolio in sync with the Node.js/MongoDB backend:
// - on start-up, content stored on the server replaces the built-in/persisted content;
// - while an admin is signed in, each portfolio action is sent to the matching CRUD endpoint.
import { createListenerMiddleware, isAnyOf, type UnknownAction } from '@reduxjs/toolkit'
import { api, authToken } from '../lib/api'
import type { PortfolioState } from '../types'
import {
  hydratePortfolio,
  importPortfolio,
  moveItem,
  removeItem,
  resetPortfolio,
  setSoftSkills,
  toggleSection,
  updateProfile,
  upsertItem,
} from './slices/portfolioSlice'

type StateWithPortfolio = { portfolio: PortfolioState }
const json = (body: unknown) => ({ body: JSON.stringify(body) })

export async function loadPortfolioFromServer(dispatch: (action: UnknownAction) => unknown) {
  const portfolio = await api<PortfolioState>('/portfolio').catch(() => null)
  if (portfolio?.profile) dispatch(hydratePortfolio(portfolio))
}

/** Maps a portfolio action to the API request that stores the same change in MongoDB. */
function requestFor(action: UnknownAction, { portfolio }: StateWithPortfolio): [string, RequestInit] | null {
  if (updateProfile.match(action)) return ['/profile', { method: 'PUT', ...json(portfolio.profile) }]
  if (setSoftSkills.match(action)) return ['/softSkills', { method: 'PUT', ...json(portfolio.softSkills) }]
  if (toggleSection.match(action)) return ['/sections', { method: 'PUT', ...json(portfolio.sections) }]
  if (upsertItem.match(action)) {
    const { collection, item } = action.payload
    return [`/${collection}/${encodeURIComponent(item.id)}`, { method: 'PUT', ...json(item) }]
  }
  if (removeItem.match(action)) {
    const { collection, id } = action.payload
    return [`/${collection}/${encodeURIComponent(id)}`, { method: 'DELETE' }]
  }
  if (moveItem.match(action)) {
    const { collection } = action.payload
    return [`/${collection}/order`, { method: 'PUT', ...json({ ids: portfolio[collection].map((item) => item.id) }) }]
  }
  if (importPortfolio.match(action) || resetPortfolio.match(action)) {
    return ['/portfolio/import', { method: 'POST', ...json({ data: portfolio }) }]
  }
  return null
}

export const backendSync = createListenerMiddleware()

backendSync.startListening({
  matcher: isAnyOf(updateProfile, setSoftSkills, toggleSection, upsertItem, removeItem, moveItem, importPortfolio, resetPortfolio),
  effect: async (action, listenerApi) => {
    if (!authToken.get()) return
    const request = requestFor(action, listenerApi.getState() as StateWithPortfolio)
    if (request) await api(...request).catch((error) => console.error('Saving to the server failed', error))
  },
})
