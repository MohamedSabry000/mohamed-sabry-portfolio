import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import PublicLayout from '../components/layout/PublicLayout'
import { buttonClass } from '../components/ui/Button'
import Markdown from '../components/ui/Markdown'
import { useLanguage } from '../context/LanguageContext'
import { publishedPosts } from '../lib/blog'
import { formatDay, readingMinutes } from '../lib/utils'
import { useAppSelector } from '../store'

export default function BlogPostPage() {
  const { slug } = useParams()
  const { t, tr, lang } = useLanguage()
  const blog = useAppSelector((state) => state.portfolio.blog)
  const name = useAppSelector((state) => state.portfolio.profile.name)
  const posts = publishedPosts(blog)
  const index = posts.findIndex((post) => post.slug === slug)
  const post = posts[index]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post)
    return (
      <PublicLayout>
        <title>{t('blog.notFound')}</title>
        <section className="container-page pb-20 pt-32 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{t('blog.notFound')}</h1>
          <Link to="/blog" className={buttonClass('primary', 'mt-6')}>
            {t('blog.back')}
          </Link>
        </section>
      </PublicLayout>
    )

  const newer = posts[index - 1]
  const older = posts[index + 1]

  return (
    <PublicLayout>
      <title>{`${tr(post.title)} — ${tr(name)}`}</title>
      <meta name="description" content={tr(post.excerpt)} />
      <meta property="og:title" content={tr(post.title)} />
      <meta property="og:type" content="article" />
      <article className="pb-20 pt-28">
        <div className="container-page max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400">
            <ArrowLeft className="size-4 rtl:rotate-180" /> {t('blog.back')}
          </Link>
          <header className="mt-6">
            <div className="flex flex-wrap gap-1.5" dir="ltr">
              {post.tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {tr(post.title)}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="font-medium text-slate-700 dark:text-slate-300">{tr(name)}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={post.date}>{formatDay(post.date, lang)}</time>
              <span aria-hidden="true">•</span>
              <span>
                {readingMinutes(tr(post.content))} {t('blog.minRead')}
              </span>
            </div>
          </header>
          {post.cover && <img src={post.cover} alt="" className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" />}
          <Markdown content={tr(post.content)} className="mt-8" />
          {(older || newer) && (
            <nav className="mt-14 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2 dark:border-slate-800">
              {older && (
                <Link to={`/blog/${older.slug}`} className="card p-4 transition hover:border-brand-400">
                  <span className="text-xs text-slate-500">{t('blog.prev')}</span>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">{tr(older.title)}</p>
                </Link>
              )}
              {newer && (
                <Link to={`/blog/${newer.slug}`} className="card p-4 text-end transition hover:border-brand-400 sm:col-start-2">
                  <span className="text-xs text-slate-500">{t('blog.next')}</span>
                  <p className="mt-1 font-semibold text-slate-900 dark:text-white">{tr(newer.title)}</p>
                </Link>
              )}
            </nav>
          )}
        </div>
      </article>
    </PublicLayout>
  )
}
