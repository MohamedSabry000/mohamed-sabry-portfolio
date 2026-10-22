import { Globe, Mail } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../ui/BrandIcons'
import { Link } from 'react-router'
import { useLanguage } from '../../context/LanguageContext'
import { useAppSelector } from '../../store'

export default function Footer() {
  const { t, tr } = useLanguage()
  const profile = useAppSelector((state) => state.portfolio.profile)
  const socials = [
    { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: profile.github, icon: Github, label: 'GitHub' },
    { href: profile.website, icon: Globe, label: 'Website' },
    { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
  ].filter((item) => item.href && item.href !== 'mailto:')

  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="container-page flex flex-col items-center justify-between gap-6 text-sm text-slate-500 sm:flex-row">
        <div className="text-center sm:text-start">
          <p>
            © {new Date().getFullYear()} {tr(profile.name)}. {t('footer.rights')}
          </p>
          <p className="mt-1 text-xs">{t('footer.built')}</p>
        </div>
        <div className="flex items-center gap-2">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid size-10 place-items-center rounded-xl border border-slate-200 transition hover:border-brand-500 hover:text-brand-500 dark:border-slate-800"
            >
              <Icon className="size-4" />
            </a>
          ))}
          <Link to="/admin" className="ms-2 text-xs underline-offset-4 hover:underline">
            {t('nav.admin')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
