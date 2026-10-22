import { ExternalLink, FolderGit2, Star } from 'lucide-react'
import { useMemo, useState, useTransition } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../lib/utils'
import { useAppSelector } from '../../store'
import type { ProjectCategory } from '../../types'
import SectionTitle from '../ui/SectionTitle'

type Filter = 'all' | ProjectCategory

const isVideo = (url: string) => /youtu\.?be|vimeo\.com/.test(url)

export default function Projects() {
  const { t, tr } = useLanguage()
  const projects = useAppSelector((state) => state.portfolio.projects)
  const [filter, setFilter] = useState<Filter>('all')
  const [isPending, startTransition] = useTransition()

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)),
    [projects, filter],
  )

  const filters: Filter[] = ['all', 'professional', 'personal']

  return (
    <section id="projects" className="py-20">
      <div className="container-page">
        <SectionTitle title={t('projects.title')} subtitle={t('projects.subtitle')} />
        <div role="tablist" className="mb-8 flex justify-center gap-2">
          {filters.map((value) => (
            <button
              key={value}
              role="tab"
              aria-selected={filter === value}
              onClick={() => startTransition(() => setFilter(value))}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                filter === value
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800',
              )}
            >
              {t(`projects.${value}`)}
            </button>
          ))}
        </div>
        <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', isPending && 'opacity-60')}>
          {filtered.map((project) => (
            <article
              key={project.id}
              className="card group flex flex-col p-6 transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                  <FolderGit2 className="size-5" />
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    <Star className="size-3 fill-current" /> {t('projects.featured')}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{tr(project.title)}</h3>
              <p className="text-sm font-medium text-brand-600 dark:text-brand-400">{tr(project.role)}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {tr(project.description)}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5" dir="ltr">
                {project.tech.map((tech) => (
                  <span key={tech} className="badge">
                    {tech}
                  </span>
                ))}
              </div>
              {(project.link || (project.links?.length ?? 0) > 0) && (
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {[
                    ...(project.link ? [{ label: isVideo(project.link) ? t('projects.demo') : t('projects.visit'), url: project.link }] : []),
                    ...(project.links ?? []),
                  ].map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
                    >
                      {link.label} <ExternalLink className="size-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
