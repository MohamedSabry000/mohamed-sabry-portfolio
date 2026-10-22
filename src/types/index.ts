export type Lang = 'en' | 'ar'

export interface Localized {
  en: string
  ar: string
}

export interface Profile {
  name: Localized
  title: Localized
  tagline: Localized
  summary: Localized
  location: Localized
  email: string
  phones: string[]
  linkedin: string
  github: string
  website: string
  avatarUrl: string
  cvUrl: string
  yearsExperience: number
  projectsCount: number
  available: boolean
}

export interface Experience {
  id: string
  company: Localized
  role: Localized
  start: string
  end: string
  description: Localized
  tech: string[]
  link?: string
}

export type ProjectCategory = 'professional' | 'personal'

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: string
  title: Localized
  role: Localized
  description: Localized
  tech: string[]
  link: string
  links?: ProjectLink[]
  category: ProjectCategory
  featured: boolean
}

export interface SkillGroup {
  id: string
  name: Localized
  items: string[]
}

export interface Education {
  id: string
  title: Localized
  institution: Localized
  start: string
  end: string
  details: Localized
}

export interface Certificate {
  id: string
  title: Localized
  issuer: Localized
  date: string
  description: Localized
  link?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: Localized
  excerpt: Localized
  content: Localized
  tags: string[]
  date: string
  cover: string
  published: boolean
}

export interface FaqItem {
  id: string
  question: Localized
  answer: Localized
  keywords?: string[]
}

export interface SpokenLanguage {
  id: string
  name: Localized
  level: Localized
}

export type SectionKey =
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'certificates'
  | 'blog'
  | 'faq'
  | 'contact'

export type CollectionKey =
  | 'experiences'
  | 'projects'
  | 'skillGroups'
  | 'education'
  | 'certificates'
  | 'languages'
  | 'blog'
  | 'faqs'

export interface PortfolioState {
  profile: Profile
  experiences: Experience[]
  projects: Project[]
  skillGroups: SkillGroup[]
  education: Education[]
  certificates: Certificate[]
  languages: SpokenLanguage[]
  blog: BlogPost[]
  faqs: FaqItem[]
  softSkills: Localized[]
  sections: Record<SectionKey, boolean>
}

export type CollectionItem<K extends CollectionKey> = PortfolioState[K][number]

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

export type ChatRole = 'user' | 'assistant'

export interface ChatAction {
  type: 'scroll'
  target: SectionKey | 'home'
}

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  createdAt: string
  source?: 'llm' | 'local'
  action?: ChatAction
}

export type AgentMode = 'auto' | 'local' | 'remote'

export interface AgentSettings {
  enabled: boolean
  name: Localized
  greeting: Localized
  instructions: string
  mode: AgentMode
  suggestions: Localized[]
}
