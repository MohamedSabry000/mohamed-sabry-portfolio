import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import BlogListPage from '../pages/BlogListPage'
import BlogPostPage from '../pages/BlogPostPage'
import PortfolioPage from '../pages/PortfolioPage'
import { renderWithProviders } from '../test/utils'
import Markdown from './ui/Markdown'

const blogRoutes = (
  <Routes>
    <Route path="/blog" element={<BlogListPage />} />
    <Route path="/blog/:slug" element={<BlogPostPage />} />
  </Routes>
)

describe('Blog', () => {
  it('lists posts and filters them by search', async () => {
    renderWithProviders(blogRoutes, { route: '/blog' })
    expect(await screen.findByRole('heading', { name: /React 19 forms/ })).toBeInTheDocument()
    await userEvent.type(screen.getByRole('searchbox'), 'capacitor')
    await waitFor(() => expect(screen.queryByRole('heading', { name: /React 19 forms/ })).not.toBeInTheDocument())
    expect(screen.getByRole('heading', { name: /Capacitor/ })).toBeInTheDocument()
  })

  it('filters posts by tag', async () => {
    renderWithProviders(blogRoutes, { route: '/blog' })
    await userEvent.click(await screen.findByRole('button', { name: 'RTL' }))
    await waitFor(() => expect(screen.queryByRole('heading', { name: /Capacitor/ })).not.toBeInTheDocument())
    expect(screen.getByRole('heading', { name: /bilingual/ })).toBeInTheDocument()
  })

  it('renders a post with Markdown content', async () => {
    renderWithProviders(blogRoutes, { route: '/blog/react-19-forms' })
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('React 19 forms')
    expect(screen.getByRole('heading', { level: 2, name: 'useActionState' })).toBeInTheDocument()
    expect(document.querySelector('pre code')?.textContent).toContain('useActionState')
  })

  it('renders posts in Arabic', async () => {
    renderWithProviders(blogRoutes, { route: '/blog/react-19-forms', lang: 'ar' })
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('النماذج في React 19')
    expect(document.documentElement.dir).toBe('rtl')
  })

  it('shows a not-found message for unknown slugs', async () => {
    renderWithProviders(blogRoutes, { route: '/blog/does-not-exist' })
    expect(await screen.findByRole('heading', { name: 'Article not found' })).toBeInTheDocument()
  })
})

describe('FAQ', () => {
  it('expands and collapses answers', async () => {
    renderWithProviders(<PortfolioPage />)
    const button = screen.getByRole('button', { name: /build Arabic \(RTL\) websites/ })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('region')).toHaveTextContent(/right-to-left/)
    await userEvent.click(button)
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })
})

describe('Markdown', () => {
  it('renders headings, lists, links and inline code without raw HTML', () => {
    const { container } = render(
      <Markdown content={'## Title\n- one\n- **two**\n\nSee [docs](https://react.dev) and `code`.\n\n<script>alert(1)</script>'} />,
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Title')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByRole('link', { name: 'docs' })).toHaveAttribute('href', 'https://react.dev')
    expect(container.querySelector('script')).toBeNull()
  })
})
