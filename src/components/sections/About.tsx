import { Languages, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useAppSelector } from '../../store'
import SectionTitle from '../ui/SectionTitle'

export default function About() {
  const { t, tr } = useLanguage()
  const { profile, languages, softSkills } = useAppSelector((state) => state.portfolio)

  const info = [
    { icon: MapPin, label: t('about.location'), value: tr(profile.location) },
    { icon: Mail, label: t('about.email'), value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: t('about.phone'), value: profile.phones[0], href: `tel:${profile.phones[0]?.replace(/\s/g, '')}` },
  ].filter((item) => item.value)

  return (
    <section id="about" className="py-20">
      <div className="container-page">
        <SectionTitle title={t('about.title')} subtitle={t('about.subtitle')} />
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="card p-8">
            <p className="text-lg leading-loose text-slate-600 dark:text-slate-300">{tr(profile.summary)}</p>
            <h3 className="mt-8 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Sparkles className="size-4 text-brand-500" />
              {t('about.softSkills')}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span key={skill.en} className="badge">
                  {tr(skill)}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {info.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="card flex items-center gap-4 p-5">
                <span className="bg-gradient-brand grid size-11 shrink-0 place-items-center rounded-xl text-white">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">{label}</p>
                  {href ? (
                    <a href={href} dir="ltr" className="block truncate font-semibold hover:text-brand-500">
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold">{value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="card p-5">
              <p className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                <Languages className="size-4" /> {t('about.languages')}
              </p>
              <ul className="space-y-2">
                {languages.map((language) => (
                  <li key={language.id} className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{tr(language.name)}</span>
                    <span className="text-slate-500">{tr(language.level)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
