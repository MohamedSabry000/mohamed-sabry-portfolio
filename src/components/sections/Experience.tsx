import { Briefcase, ExternalLink } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useAppSelector } from '../../store'
import SectionTitle from '../ui/SectionTitle'

export default function ExperienceSection() {
  const { t, tr, formatDate } = useLanguage()
  const experiences = useAppSelector((state) => state.portfolio.experiences)

  return (
    <section id="experience" className="py-20">
      <div className="container-page max-w-4xl">
        <SectionTitle title={t('experience.title')} subtitle={t('experience.subtitle')} />
        <ol className="timeline space-y-6">
          {experiences.map((item) => (
            <li key={item.id} className="relative ps-10">
              <span className="bg-gradient-brand absolute top-6 start-0 grid size-6 place-items-center rounded-full text-white ring-4 ring-slate-50 dark:ring-slate-950">
                <Briefcase className="size-3" />
              </span>
              <article className="card p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{tr(item.role)}</h3>
                    <p className="font-semibold text-brand-600 dark:text-brand-400">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
                          {tr(item.company)} <ExternalLink className="size-3.5" />
                        </a>
                      ) : (
                        tr(item.company)
                      )}
                    </p>
                  </div>
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {formatDate(item.start)} — {formatDate(item.end)}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{tr(item.description)}</p>
                {item.tech.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2" dir="ltr">
                    {item.tech.map((tech) => (
                      <span key={tech} className="badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
