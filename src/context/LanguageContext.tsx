import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translations, type TranslationKey } from '../i18n/translations'
import type { Lang, Localized } from '../types'

interface LanguageContextValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  isRTL: boolean
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: (key: TranslationKey) => string
  tr: (value: Localized | undefined) => string
  formatDate: (value: string) => string
}

const STORAGE_KEY = 'ms-lang'

export const LanguageContext = createContext<LanguageContextValue | null>(null)

const initialLang = (): Lang => {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'ar') return saved
  return window.navigator.language?.startsWith('ar') ? 'ar' : 'en'
}

export function LanguageProvider({ children, defaultLang }: { children: ReactNode; defaultLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(() => defaultLang ?? initialLang())
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang, dir])

  const toggleLang = useCallback(() => setLang((prev) => (prev === 'en' ? 'ar' : 'en')), [])

  const value = useMemo<LanguageContextValue>(() => {
    const locale = lang === 'ar' ? 'ar-EG' : 'en-US'
    return {
      lang,
      dir,
      isRTL: dir === 'rtl',
      setLang,
      toggleLang,
      t: (key) => translations[lang][key] ?? key,
      tr: (value) => (value ? value[lang] || value.en || value.ar : ''),
      formatDate: (value) => {
        if (!value) return ''
        if (value === 'present') return translations[lang]['common.present']
        const [year, month] = value.split('-').map(Number)
        if (!month) return String(year)
        return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short' }).format(
          new Date(year, month - 1, 1),
        )
      },
    }
  }, [lang, dir, toggleLang])

  // React 19: a context can be rendered directly as its provider.
  return <LanguageContext value={value}>{children}</LanguageContext>
}

export function useLanguage() {
  // React 19: `use` reads context (and can be called conditionally).
  const context = use(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return context
}
