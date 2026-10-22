import { assetUrl } from '../../lib/utils'
import { Bot, Download, Send } from 'lucide-react'
import { useChatUI } from '../../context/ChatContext'
import { useLanguage } from '../../context/LanguageContext'
import { useAppSelector } from '../../store'
import { buttonClass } from '../ui/Button'

export default function Hero() {
  const { t, tr, lang } = useLanguage()
  const { open } = useChatUI()
  const profile = useAppSelector((state) => state.portfolio.profile)
  const companies = useAppSelector((state) => state.portfolio.experiences.length)
  const agentEnabled = useAppSelector((state) => state.agent.enabled)
  const initials = tr(profile.name)
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  const stats = [
    { value: `${profile.yearsExperience}+`, label: t('hero.years') },
    { value: `${profile.projectsCount}+`, label: t('hero.projects') },
    { value: `${companies}`, label: t('hero.companies') },
  ]

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div className="hero-grid absolute inset-0 -z-10" />
      <div className="blob blob-1 -z-10 size-72 -top-10 start-[-4rem]" />
      <div className="blob blob-2 -z-10 size-72 top-40 end-[-4rem]" />
      <div className="blob blob-3 -z-10 size-60 bottom-0 start-1/3" />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="text-center lg:text-start">
          {profile.available && (
            <span className="reveal inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {t('hero.available')}
            </span>
          )}
          <p className="reveal delay-1 mt-6 text-lg font-medium text-slate-500 dark:text-slate-400">{t('hero.hello')}</p>
          <h1 className="reveal delay-2 mt-2 text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white">
            <span className="text-gradient">{tr(profile.name)}</span>
          </h1>
          <p className="reveal delay-3 mt-4 text-xl font-semibold text-slate-700 sm:text-2xl dark:text-slate-200">
            {tr(profile.title)}
          </p>
          <p className="reveal delay-4 mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 lg:mx-0 dark:text-slate-400">
            {tr(profile.tagline)}
          </p>
          <div className="reveal delay-5 mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#contact" className={buttonClass('primary')}>
              <Send className="size-4 rtl:-scale-x-100" />
              {t('hero.contact')}
            </a>
            {profile.cvUrl && (
              <a href={assetUrl(profile.cvUrl)} download className={buttonClass('secondary')}>
                <Download className="size-4" />
                {t('hero.cv')}
              </a>
            )}
            {agentEnabled && (
              <button type="button" onClick={open} className={buttonClass('ghost')}>
                <Bot className="size-4" />
                {t('hero.chat')}
              </button>
            )}
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 max-lg:mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="card p-4 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {lang === 'ar' ? stat.value.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]) : stat.value}
                </dd>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal delay-3 mx-auto">
          <div className="avatar-ring size-64 sm:size-80">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={tr(profile.name)}
                className="size-full rounded-full border-4 border-white object-cover dark:border-slate-950"
              />
            ) : (
              <div className="grid size-full place-items-center rounded-full border-4 border-white bg-slate-100 text-7xl font-black text-slate-800 dark:border-slate-950 dark:bg-slate-900 dark:text-white">
                {initials}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
