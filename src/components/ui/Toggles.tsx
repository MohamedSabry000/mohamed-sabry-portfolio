import { Languages, Moon, Sun } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'

const iconBtn =
  'inline-flex size-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-800'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  return (
    <button type="button" onClick={toggleTheme} className={iconBtn} aria-label={t('common.toggleTheme')}>
      {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  )
}

export function LanguageToggle() {
  const { lang, toggleLang, t } = useLanguage()
  return (
    <button
      type="button"
      onClick={toggleLang}
      className={`${iconBtn} w-auto gap-1.5 px-3 text-sm font-semibold`}
      aria-label={t('common.toggleLanguage')}
    >
      <Languages className="size-4" />
      {lang === 'en' ? 'عربي' : 'EN'}
    </button>
  )
}
