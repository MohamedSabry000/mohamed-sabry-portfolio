import { ArrowRight, Newspaper } from 'lucide-react'
import { Link } from 'react-router'
import { useLanguage } from '../../context/LanguageContext'
import { formatDay, readingMinutes } from '../../lib/utils'
import type { BlogPost } from '../../types'

export default function BlogCard({ post }: { post: BlogPost }) {
  const { t, tr, lang } = useLanguage()
  const href = `/blog/${post.slug}`
  return (
    <article className="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      {post.cover ? (
        <img src={post.cover} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
      ) : (
        <div className="bg-gradient-brand grid aspect-[16/9] place-items-center text-white">
          <Newspaper className="size-10 opacity-80 transition group-hover:scale-110" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <time dateTime={post.date}>{formatDay(post.date, lang)}</time>
          <span aria-hidden="true">•</span>
          <span>
            {readingMinutes(tr(post.content))} {t('blog.minRead')}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
          <Link to={href} className="hover:text-brand-600 dark:hover:text-brand-400">
            {tr(post.title)}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{tr(post.excerpt)}</p>
        <div className="mt-4 flex flex-wrap gap-1.5" dir="ltr">
          {post.tags.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
        <Link
          to={href}
          aria-hidden="true"
          tabIndex={-1}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
        >
          {t('blog.readMore')} <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    </article>
  )
}
