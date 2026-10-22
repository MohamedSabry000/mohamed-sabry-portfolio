import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { AuthProvider } from '../context/AuthContext'
import { LanguageProvider } from '../context/LanguageContext'
import { ThemeProvider } from '../context/ThemeContext'
import { ToastProvider } from '../context/ToastContext'
import { makeStore } from '../store'
import type { Lang } from '../types'

export function renderWithProviders(ui: ReactElement, { lang = 'en', route = '/' }: { lang?: Lang; route?: string } = {}) {
  const store = makeStore()
  const result = render(
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider defaultLang={lang}>
          <ToastProvider>
            <AuthProvider>
              <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
            </AuthProvider>
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>,
  )
  return { store, ...result }
}
