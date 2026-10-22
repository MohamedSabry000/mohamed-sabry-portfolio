import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import type { TranslationKey } from '../../i18n/translations'
import { cn } from '../../lib/utils'
import { useAppSelector } from '../../store'
import type { SectionKey } from '../../types'
import { LanguageToggle, ThemeToggle } from '../ui/Toggles'

const links: Array<{ id: SectionKey | 'home'; key: TranslationKey }> = [
  { id: 'home', key: 'nav.home' },
  { id: 'about', key: 'nav.about' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'education', key: 'nav.education' },
  { id: 'contact', key: 'nav.contact' },
]

export default function Navbar() {
  const { t, tr } = useLanguage()
  const sections = useAppSelector((state) => state.portfolio.sections)
  const name = useAppSelector((state) => state.portfolio.profile.name)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visible = links.filter((link) => link.id === 'home' || sections[link.id])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all',
        scrolled
          ? 'border-b border-slate-200/70 bg-white/80 backdrop-blur-lg dark:border-slate-800/70 dark:bg-slate-950/80'
          : 'bg-transparent',
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white">
          <span className="bg-gradient-brand grid size-9 place-items-center rounded-xl text-sm text-white">MS</span>
          <span className="hidden sm:inline">{tr(name)}</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {visible.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl lg:hidden"
            aria-label={t('common.menu')}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="container-page grid gap-1 border-t border-slate-200 bg-white pb-4 pt-2 lg:hidden dark:border-slate-800 dark:bg-slate-950">
          {visible.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
