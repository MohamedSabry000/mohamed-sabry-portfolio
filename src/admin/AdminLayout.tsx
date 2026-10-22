import {
  Award,
  Bot,
  Briefcase,
  CircleHelp,
  ExternalLink,
  FolderGit2,
  GraduationCap,
  Languages,
  LayoutDashboard,
  LayoutList,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  Settings,
  User,
  Wrench,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, NavLink, Outlet } from 'react-router'
import { LanguageToggle, ThemeToggle } from '../components/ui/Toggles'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'
import { cn } from '../lib/utils'
import { useAppSelector } from '../store'
import './admin.less'

const nav: Array<{ to: string; key: TranslationKey; icon: typeof User; end?: boolean }> = [
  { to: '/admin', key: 'admin.dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/profile', key: 'admin.profile', icon: User },
  { to: '/admin/experience', key: 'admin.experience', icon: Briefcase },
  { to: '/admin/projects', key: 'admin.projects', icon: FolderGit2 },
  { to: '/admin/skills', key: 'admin.skills', icon: Wrench },
  { to: '/admin/education', key: 'admin.education', icon: GraduationCap },
  { to: '/admin/certificates', key: 'admin.certificates', icon: Award },
  { to: '/admin/languages', key: 'admin.languages', icon: Languages },
  { to: '/admin/blog', key: 'admin.blog', icon: Newspaper },
  { to: '/admin/faq', key: 'admin.faq', icon: CircleHelp },
  { to: '/admin/sections', key: 'admin.sections', icon: LayoutList },
  { to: '/admin/agent', key: 'admin.agent', icon: Bot },
  { to: '/admin/messages', key: 'admin.messages', icon: Mail },
  { to: '/admin/settings', key: 'admin.settings', icon: Settings },
]

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth()
  const { t, tr } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const unread = useAppSelector((state) => state.messages.items.filter((m) => !m.read).length)
  const name = useAppSelector((state) => state.portfolio.profile.name)

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />

  const sidebar = (
    <aside className="admin-sidebar flex h-full flex-col border-e border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <Link to="/admin" className="mb-6 flex items-center gap-3 px-2">
        <span className="bg-gradient-brand grid size-10 place-items-center rounded-xl font-extrabold text-white">MS</span>
        <div>
          <p className="font-bold text-slate-900 dark:text-white">{tr(name)}</p>
          <p className="text-xs text-slate-500">{t('admin.title')}</p>
        </div>
      </Link>
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {nav.map(({ to, key, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className="nav-link text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Icon className="size-4" />
            <span className="flex-1">{t(key)}</span>
            {key === 'admin.messages' && unread > 0 && (
              <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">{unread}</span>
            )}
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        onClick={logout}
        className="nav-link mt-4 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
      >
        <LogOut className="size-4 rtl:-scale-x-100" />
        {t('admin.logout')}
      </button>
    </aside>
  )

  return (
    <div className="admin-shell bg-slate-50 dark:bg-slate-950">
      <div className="sticky top-0 hidden h-screen lg:block">{sidebar}</div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 start-0">{sidebar}</div>
        </div>
      )}
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-slate-200 bg-white/80 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={t('common.menu')}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <div className="flex-1" />
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ExternalLink className="size-4" /> {t('admin.viewSite')}
          </Link>
          <LanguageToggle />
          <ThemeToggle />
        </header>
        <main className={cn('mx-auto max-w-5xl p-4 sm:p-6 lg:p-8')}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
