import { Search } from 'lucide-react'
import { useDeferredValue, useState, useTransition } from 'react'
import BlogCard from '../components/blog/BlogCard'
import PublicLayout from '../components/layout/PublicLayout'
import { Input } from '../components/ui/Field'
import SectionTitle from '../components/ui/SectionTitle'
import { useLanguage } from '../context/LanguageContext'
import { publishedPosts } from '../lib/blog'
import { cn } from '../lib/utils'
import { useAppSelector } from '../store'

export default function BlogListPage() {
  const { t, tr } = useLanguage()
  const blog = useAppSelector((state) => state.portfolio.blog)
  const name = useAppSelector((state) => state.portfolio.profile.name)
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  // React 19: useDeferredValue keeps typing responsive while the list filters.
  const deferredQuery = useDeferredValue(query, '')

  const posts = publishedPosts(blog)
  const tags = [...new Set(posts.flatMap((post) => post.tags))]
  const q = deferredQuery.trim().toLowerCase()
  const filtered = posts.filter(
    (post) =>
      (!tag || post.tags.includes(tag)) &&
      (!q || [post.title.en, post.title.ar, post.excerpt.en, post.excerpt.ar, ...post.tags].join(' ').toLowerCase().includes(q)),
  )

  return (
    <PublicLayout>
      <title>{`${t('blog.title')} — ${tr(name)}`}</title>
      <meta name="description" content={t('blog.subtitle')} />
      <section className="pb-20 pt-28">
        <div className="container-page">
          <SectionTitle title={t('blog.title')} subtitle={t('blog.subtitle')} />
          <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-slate-400 start-3" />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('blog.search')}
                aria-label={t('blog.search')}
                className="ps-9"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2" dir="ltr">
              {[null, ...tags].map((item) => (
                <button
                  key={item ?? 'all'}
                  type="button"
                  aria-pressed={tag === item}
                  onClick={() => startTransition(() => setTag(item))}
                  className={cn(
                    'rounded-full px-3 py-1 text-sm font-medium transition',
                    tag === item
                      ? 'bg-brand-600 text-white'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-brand-400 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800',
                  )}
                >
                  {item ?? t('blog.allTags')}
                </button>
              ))}
            </div>
          </div>
          <div className={cn('grid gap-6 transition-opacity md:grid-cols-2 lg:grid-cols-3', isPending && 'opacity-60')}>
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center text-slate-500">{t('blog.empty')}</p>}
        </div>
      </section>
    </PublicLayout>
  )
}
