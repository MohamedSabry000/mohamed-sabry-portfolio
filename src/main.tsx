import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { getAssistantContent } from './agent/sanityContent'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { persistor, store } from './store'
import './index.css'
import './styles/effects.less'

// Start loading the Sanity-managed assistant content before the chat widget renders.
void getAssistantContent()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              <AuthProvider>
                <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
                  <App />
                </BrowserRouter>
              </AuthProvider>
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
