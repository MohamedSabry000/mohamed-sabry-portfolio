import { GraduationCap } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useAppSelector } from '../../store'
import SectionTitle from '../ui/SectionTitle'

export default function Education() {
  const { t, tr, formatDate } = useLanguage()
  const education = useAppSelector((state) => state.portfolio.education)

  return (
    <section id="education" className="py-20">
      <div className="container-page">
        <SectionTitle title={t('education.title')} subtitle={t('education.subtitle')} />
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item) => (
            <article key={item.id} className="card flex gap-4 p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <GraduationCap className="size-6" />
              </span>
              <div>
                <span className="text-xs font-medium text-slate-500">
                  {formatDate(item.start)} — {formatDate(item.end)}
                </span>
                <h3 className="mt-1 font-bold text-slate-900 dark:text-white">{tr(item.title)}</h3>
                <p className="text-sm font-medium text-brand-600 dark:text-brand-400">{tr(item.institution)}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{tr(item.details)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
