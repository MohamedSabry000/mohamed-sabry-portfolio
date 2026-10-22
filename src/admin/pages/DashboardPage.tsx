import { Award, Bot, Briefcase, CircleHelp, FolderGit2, Mail, MessageSquare, Newspaper, Wrench } from 'lucide-react'
import { Link } from 'react-router'
import { useLanguage } from '../../context/LanguageContext'
import { useAppSelector } from '../../store'
import PageHeader from '../components/PageHeader'

export default function DashboardPage() {
  const { t, tr } = useLanguage()
  const { portfolio, messages, chat, agent } = useAppSelector((state) => state)
  const unread = messages.items.filter((m) => !m.read).length
  const skillsCount = portfolio.skillGroups.reduce((sum, g) => sum + g.items.length, 0)

  const stats = [
    { label: t('admin.projects'), value: portfolio.projects.length, icon: FolderGit2, to: '/admin/projects' },
    { label: t('admin.experience'), value: portfolio.experiences.length, icon: Briefcase, to: '/admin/experience' },
    { label: t('admin.skills'), value: skillsCount, icon: Wrench, to: '/admin/skills' },
    { label: t('admin.certificates'), value: portfolio.certificates.length, icon: Award, to: '/admin/certificates' },
    { label: t('admin.blog'), value: portfolio.blog.length, icon: Newspaper, to: '/admin/blog' },
    { label: t('admin.faq'), value: portfolio.faqs.length, icon: CircleHelp, to: '/admin/faq' },
    { label: t('admin.unread'), value: unread, icon: Mail, to: '/admin/messages' },
    { label: t('admin.chatMessages'), value: chat.totalVisitorMessages, icon: MessageSquare, to: '/admin/messages' },
  ]

  return (
    <>
      <PageHeader title={`${t('admin.welcome')}, ${tr(portfolio.profile.name).split(' ')[0]}`} subtitle={t('admin.welcomeSub')} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to} className="card flex items-center gap-4 p-5 transition hover:border-brand-400">
            <span className="bg-gradient-brand grid size-12 place-items-center rounded-xl text-white">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="card p-5">
          <h2 className="mb-4 font-bold">{t('admin.recentMessages')}</h2>
          {messages.items.length === 0 ? (
            <p className="text-sm text-slate-500">{t('common.empty')}</p>
          ) : (
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {messages.items.slice(0, 5).map((m) => (
                <li key={m.id} className="flex items-start gap-3 py-3">
                  <span className={`mt-1.5 size-2 shrink-0 rounded-full ${m.read ? 'bg-slate-300' : 'bg-brand-500'}`} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {m.name} — {m.subject}
                    </p>
                    <p className="truncate text-xs text-slate-500">{m.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="card p-5">
          <h2 className="mb-4 font-bold">{t('admin.agent')}</h2>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10">
              <Bot className="size-6" />
            </span>
            <div>
              <p className="font-semibold">{tr(agent.name)}</p>
              <p className={`text-sm ${agent.enabled ? 'text-emerald-600' : 'text-slate-500'}`}>
                {agent.enabled ? t('chat.online') : '—'} · {agent.mode}
              </p>
            </div>
          </div>
          <Link to="/admin/agent" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400">
            {t('common.edit')} →
          </Link>
        </section>
      </div>
    </>
  )
}
