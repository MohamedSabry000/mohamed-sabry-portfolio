import { Award } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useAppSelector } from '../../store'
import SectionTitle from '../ui/SectionTitle'

export default function Certificates() {
  const { t, tr, formatDate } = useLanguage()
  const certificates = useAppSelector((state) => state.portfolio.certificates)

  return (
    <section id="certificates" className="py-20">
      <div className="container-page">
        <SectionTitle title={t('certificates.title')} subtitle={t('certificates.subtitle')} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((item) => (
            <article key={item.id} className="card p-6">
              <div className="flex items-center justify-between">
                <Award className="size-6 text-amber-500" />
                <span className="text-xs text-slate-500">{formatDate(item.date)}</span>
              </div>
              <h3 className="mt-3 font-bold text-slate-900 dark:text-white">{tr(item.title)}</h3>
              <p className="text-sm font-medium text-brand-600 dark:text-brand-400">{tr(item.issuer)}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{tr(item.description)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
