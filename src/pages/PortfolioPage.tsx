import ChatWidget from '../components/chat/ChatWidget'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import About from '../components/sections/About'
import Certificates from '../components/sections/Certificates'
import Contact from '../components/sections/Contact'
import Education from '../components/sections/Education'
import ExperienceSection from '../components/sections/Experience'
import Hero from '../components/sections/Hero'
import Projects from '../components/sections/Projects'
import Skills from '../components/sections/Skills'
import { ChatUIProvider } from '../context/ChatContext'
import { useLanguage } from '../context/LanguageContext'
import { useAppSelector } from '../store'

export default function PortfolioPage() {
  const { tr } = useLanguage()
  const profile = useAppSelector((state) => state.portfolio.profile)
  const sections = useAppSelector((state) => state.portfolio.sections)
  const agentEnabled = useAppSelector((state) => state.agent.enabled)

  return (
    <ChatUIProvider>
      {/* React 19: document metadata rendered from components is hoisted to <head>. */}
      <title>{`${tr(profile.name)} — ${tr(profile.title)}`}</title>
      <meta name="description" content={tr(profile.tagline)} />
      <meta property="og:title" content={tr(profile.name)} />
      <Navbar />
      <main>
        <Hero />
        {sections.about && <About />}
        {sections.experience && <ExperienceSection />}
        {sections.projects && <Projects />}
        {sections.skills && <Skills />}
        {sections.education && <Education />}
        {sections.certificates && <Certificates />}
        {sections.contact && <Contact />}
      </main>
      <Footer />
      {agentEnabled && <ChatWidget />}
    </ChatUIProvider>
  )
}
