import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { useLanguage } from '../../context/LanguageContext'
import { publishedPosts } from '../../lib/blog'
import { useAppSelector } from '../../store'
import BlogCard from '../blog/BlogCard'
import { buttonClass } from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'

export default function Blog() {
  const { t } = useLanguage()
  const blog = useAppSelector((state) => state.portfolio.blog)
  const posts = publishedPosts(blog).slice(0, 3)
  if (posts.length === 0) return null

  return (
    <section id="blog" className="py-20">
      <div className="container-page">
        <SectionTitle title={t('blog.title')} subtitle={t('blog.subtitle')} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/blog" className={buttonClass('secondary')}>
            {t('blog.viewAll')} <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  )
}
