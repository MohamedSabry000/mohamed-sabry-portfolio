import { useEffect } from 'react'
import { useLocation } from 'react-router'
import PublicLayout from '../components/layout/PublicLayout'
import About from '../components/sections/About'
import Blog from '../components/sections/Blog'
import Certificates from '../components/sections/Certificates'
import Contact from '../components/sections/Contact'
import Education from '../components/sections/Education'
import ExperienceSection from '../components/sections/Experience'
import Faq from '../components/sections/Faq'
import Hero from '../components/sections/Hero'
import Projects from '../components/sections/Projects'
import Skills from '../components/sections/Skills'
import { useLanguage } from '../context/LanguageContext'
import { useAppSelector } from '../store'

export default function PortfolioPage() {
  const { tr } = useLanguage()
  const { hash } = useLocation()
  const profile = useAppSelector((state) => state.portfolio.profile)
  const sections = useAppSelector((state) => state.portfolio.sections)

  useEffect(() => {
    if (!hash) return
    const timer = window.setTimeout(
      () => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' }),
      50,
    )
    return () => window.clearTimeout(timer)
  }, [hash])

  return (
    <PublicLayout>
      {/* React 19: document metadata rendered from components is hoisted to <head>. */}
      <title>{`${tr(profile.name)} — ${tr(profile.title)}`}</title>
      <meta name="description" content={tr(profile.tagline)} />
      <meta property="og:title" content={tr(profile.name)} />
      <Hero />
      {sections.about && <About />}
      {sections.experience && <ExperienceSection />}
      {sections.projects && <Projects />}
      {sections.skills && <Skills />}
      {sections.education && <Education />}
      {sections.certificates && <Certificates />}
      {sections.blog && <Blog />}
      {sections.faq && <Faq />}
      {sections.contact && <Contact />}
    </PublicLayout>
  )
}
