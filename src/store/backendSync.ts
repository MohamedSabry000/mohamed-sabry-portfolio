// Keeps the Redux portfolio in sync with the MongoDB backend:
// - on start-up, content saved on the server replaces the built-in/persisted content;
// - while an admin is signed in, every portfolio edit is saved to the server (debounced).
import { api, authToken } from '../lib/api'
import type { PortfolioState } from '../types'
import { importPortfolio } from './slices/portfolioSlice'
import type { AppStore } from './index'

const SAVE_DELAY_MS = 800

export async function loadPortfolioFromServer(store: AppStore) {
  try {
    const result = await api<{ data: PortfolioState }>('/portfolio')
    if (result?.data) store.dispatch(importPortfolio(result.data))
  } catch {
    // 404: nothing saved on the server yet — keep the built-in content
  }
}

export function startBackendSync(store: AppStore) {
  let saved = store.getState().portfolio
  let timer: ReturnType<typeof setTimeout> | undefined

  const ready = loadPortfolioFromServer(store).finally(() => {
    saved = store.getState().portfolio
  })

  store.subscribe(() => {
    const current = store.getState().portfolio
    if (current === saved || !authToken.get()) return
    clearTimeout(timer)
    timer = setTimeout(async () => {
      await ready
      saved = current
      await api('/portfolio', { method: 'PUT', body: JSON.stringify({ data: current }) }).catch(() => undefined)
    }, SAVE_DELAY_MS)
  })
}
