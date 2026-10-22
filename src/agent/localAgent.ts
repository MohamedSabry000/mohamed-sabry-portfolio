import { isArabicText } from '../lib/utils'
import { publishedPosts } from '../lib/blog'
import type { AgentSettings, ChatAction, FaqItem, Lang, PortfolioState, SectionKey } from '../types'

export interface AgentReply {
  text: string
  action?: ChatAction
}

export type Intent =
  | 'greeting'
  | 'thanks'
  | 'about'
  | 'current'
  | 'experience'
  | 'years'
  | 'skills'
  | 'projects'
  | 'education'
  | 'certificates'
  | 'contact'
  | 'location'
  | 'languages'
  | 'availability'
  | 'cv'
  | 'salary'
  | 'agent'
  | 'blog'

export const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[^\p{L}\p{N}#+.\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const keywords: Record<Intent, string[]> = {
  greeting: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'salam', 'مرحبا', 'اهلا', 'السلام', 'هاي', 'صباح', 'مساء'],
  thanks: ['thanks', 'thank you', 'thx', 'appreciate', 'شكرا', 'متشكر', 'جزاك'],
  about: ['who is', 'who are', 'about him', 'about mohamed', 'introduce', 'tell me about', 'summary', 'background', 'من هو', 'عرفني', 'نبذه', 'عن محمد', 'تعريف'],
  current: ['current', 'currently', 'now', 'present', 'naseej', 'medad', 'where does he work', 'role', 'الحالي', 'حاليا', 'الان', 'نسيج', 'مداد', 'دوره', 'يعمل'],
  experience: ['experience', 'worked', 'work history', 'career', 'companies', 'jobs', 'employment', 'خبره', 'خبرات', 'خبرته', 'شركات', 'وظائف', 'مسيره', 'عمل'],
  years: ['how many years', 'years', 'how long', 'senior', 'سنوات', 'سنه', 'كم سنه', 'مده'],
  skills: ['skill', 'skills', 'stack', 'technolog', 'tech', 'tools', 'framework', 'good at', 'expert', 'مهارات', 'مهاراته', 'تقنيات', 'ادوات', 'يجيد', 'خبير', 'لغات البرمجه'],
  projects: ['project', 'projects', 'portfolio', 'built', 'work samples', 'apps', 'show me', 'مشاريع', 'مشروع', 'مشاريعه', 'اعمال', 'اعماله', 'تطبيقات', 'اعرض'],
  education: ['education', 'degree', 'university', 'study', 'studied', 'diploma', 'iti', 'bachelor', 'college', 'تعليم', 'جامعه', 'دراسه', 'درس', 'بكالوريوس', 'دبلومه', 'كليه', 'مؤهل'],
  certificates: ['certificate', 'certification', 'course', 'nanodegree', 'training', 'udacity', 'شهادات', 'شهاده', 'دورات', 'كورس', 'تدريب', 'يوداسيتي'],
  contact: ['contact', 'email', 'mail', 'phone', 'reach', 'hire', 'call', 'whatsapp', 'linkedin', 'github', 'تواصل', 'ايميل', 'بريد', 'هاتف', 'رقم', 'توظيف', 'اتصل', 'واتساب', 'لينكد'],
  location: ['where is he', 'location', 'live', 'based', 'city', 'country', 'egypt', 'cairo', 'relocat', 'remote', 'اين', 'موقع', 'يسكن', 'مدينه', 'دوله', 'مصر', 'القاهره', 'عن بعد'],
  languages: ['speak', 'spoken', 'arabic', 'english', 'language', 'يتحدث', 'اللغات', 'الانجليزيه', 'العربيه', 'لغه'],
  availability: ['available', 'availability', 'open to work', 'freelance', 'opportunit', 'متاح', 'فرصه', 'فرص', 'متفرغ', 'عمل حر'],
  cv: ['cv', 'resume', 'résumé', 'download', 'سيره', 'السيره الذاتيه', 'تحميل'],
  salary: ['salary', 'rate', 'price', 'cost', 'expected', 'راتب', 'سعر', 'تكلفه', 'اجر'],
  blog: ['blog', 'article', 'articles', 'post', 'posts', 'write', 'writes', 'writing', 'مدونه', 'مقال', 'مقالات', 'تدوينه', 'يكتب'],
  agent: ['who are you', 'are you ai', 'are you a bot', 'what can you do', 'help', 'من انت', 'ماذا تستطيع', 'مساعده', 'ساعدني'],
}

const sectionFor: Partial<Record<Intent, SectionKey>> = {
  about: 'about',
  experience: 'experience',
  current: 'experience',
  years: 'experience',
  skills: 'skills',
  projects: 'projects',
  education: 'education',
  certificates: 'certificates',
  contact: 'contact',
  availability: 'contact',
  salary: 'contact',
  blog: 'blog',
}

const hasKeyword = (text: string, keyword: string) => {
  const k = normalize(keyword)
  if (/^[a-z#+. ]+$/.test(k) && k.length <= 4) {
    return new RegExp(`(^|\\s)${k.replace(/[.+#]/g, '\\$&')}(\\s|$)`).test(text)
  }
  return text.includes(k)
}

export function detectIntent(question: string): { intent: Intent | null; scores: Partial<Record<Intent, number>> } {
  const text = normalize(question)
  const scores: Partial<Record<Intent, number>> = {}
  for (const [intent, words] of Object.entries(keywords) as Array<[Intent, string[]]>) {
    const score = words.reduce((sum, word) => sum + (hasKeyword(text, word) ? normalize(word).length : 0), 0)
    if (score > 0) scores[intent] = score
  }
  const ranked = (Object.entries(scores) as Array<[Intent, number]>).sort((a, b) => b[1] - a[1])
  return { intent: ranked[0]?.[0] ?? null, scores }
}

export const detectLang = (question: string, fallback: Lang): Lang => {
  if (isArabicText(question)) return 'ar'
  if (/[a-z]/i.test(question)) return 'en'
  return fallback
}

const allTech = (portfolio: PortfolioState) => {
  const set = new Set<string>()
  portfolio.skillGroups.forEach((group) => group.items.forEach((item) => set.add(item)))
  portfolio.projects.forEach((project) => project.tech.forEach((item) => set.add(item)))
  portfolio.experiences.forEach((exp) => exp.tech.forEach((item) => set.add(item)))
  return [...set]
}

const techAliases: Record<string, string[]> = {
  'react.js': ['react', 'reactjs', 'رياكت'],
  'next.js': ['next', 'nextjs', 'نكست'],
  'node.js': ['node', 'nodejs', 'نود'],
  typescript: ['ts', 'تايب سكريبت'],
  'javascript (es6+)': ['javascript', 'js', 'جافاسكريبت'],
  'tailwind css': ['tailwind', 'تيلويند'],
  'react native': ['react native', 'mobile', 'موبايل', 'جوال'],
  'rtl layouts': ['rtl', 'right to left', 'arabic support'],
  mongodb: ['mongo'],
  'express.js': ['express'],
}

export function findMentionedTech(question: string, portfolio: PortfolioState) {
  const text = normalize(question)
  return allTech(portfolio).filter((tech) => {
    const base = normalize(tech.replace(/\(.*?\)/g, ''))
    const aliases = [base, ...(techAliases[tech.toLowerCase()] ?? [])]
    return aliases.some((alias) => alias.length > 1 && hasKeyword(text, alias))
  })
}

export function findMentionedProject(question: string, portfolio: PortfolioState) {
  const text = normalize(question)
  const generic = new Set(['system', 'platform', 'app', 'apps', 'store', 'management', 'project', 'university'])
  allTech(portfolio).forEach((tech) => normalize(tech).split(' ').forEach((word) => generic.add(word)))
  return portfolio.projects.find((project) => {
    if ((project.links ?? []).some((link) => text.includes(normalize(link.label)))) return true
    const names = [project.title.en, project.title.ar].map((n) => normalize(n.replace(/\(.*?\)/g, '')))
    return names.some(
      (name) =>
        name.length > 2 &&
        (text.includes(name) || name.split(' ').some((w) => w.length > 3 && !generic.has(w) && hasKeyword(text, w))),
    )
  })
}

const stopwords = new Set([
  'the', 'and', 'for', 'you', 'your', 'does', 'did', 'can', 'could', 'what', 'which', 'how', 'his', 'him', 'are', 'with',
  'about', 'who', 'where', 'when', 'will', 'have', 'has', 'that', 'this', 'from', 'into', 'any', 'kind',
  'هل', 'ما', 'ماذا', 'كيف', 'من', 'في', 'علي', 'عن', 'الي', 'او', 'هو', 'لديه', 'يمكن', 'التي', 'الذي', 'مع', 'نوع',
])
const tokens = (text: string) => normalize(text).split(' ').filter((word) => word.length > 2 && !stopwords.has(word))

/** Finds the FAQ entry whose question best matches the visitor's question. */
export function findFaq(question: string, portfolio: PortfolioState): FaqItem | undefined {
  const asked = new Set(tokens(question))
  if (asked.size < 2) return undefined
  let best: { faq: FaqItem; score: number } | undefined
  for (const faq of portfolio.faqs ?? []) {
    for (const text of [faq.question.en, faq.question.ar]) {
      const words = [...new Set(tokens(text))]
      const hits = words.filter((word) => asked.has(word)).length
      const score = hits / Math.max(words.length, asked.size)
      if (hits >= 2 && score >= 0.5 && (!best || score > best.score)) best = { faq, score }
    }
  }
  return best?.faq
}

export function detectSectionAction(question: string, portfolio: PortfolioState): ChatAction | undefined {
  const { intent } = detectIntent(question)
  const section = intent ? sectionFor[intent] : findMentionedProject(question, portfolio) ? 'projects' : undefined
  return section && portfolio.sections[section] ? { type: 'scroll', target: section } : undefined
}

const bullet = (items: string[]) => items.map((item) => `• ${item}`).join('\n')

export function localAgentReply(
  question: string,
  portfolio: PortfolioState,
  agent: AgentSettings,
  uiLang: Lang,
): AgentReply {
  const lang = detectLang(question, uiLang)
  const ar = lang === 'ar'
  const l = (value: { en: string; ar: string }) => value[lang] || value.en
  const { profile } = portfolio
  const name = l(profile.name)
  const { intent, scores } = detectIntent(question)
  const project = findMentionedProject(question, portfolio)
  const tech = findMentionedTech(question, portfolio)
  const action = (section?: SectionKey): ChatAction | undefined =>
    section && portfolio.sections[section] ? { type: 'scroll', target: section } : undefined

  const strongIntent = intent && (scores[intent] ?? 0) >= 4

  const faq = findFaq(question, portfolio)
  if (faq && !project) return { text: l(faq.answer), action: action('faq') }

  if (project && !(intent && ['contact', 'salary', 'cv', 'availability'].includes(intent))) {
    const links = [
      ...(project.link ? [{ label: ar ? 'الرابط' : 'Link', url: project.link }] : []),
      ...(project.links ?? []),
    ]
    const linksText = links.length ? `\n\n${links.map((link) => `- ${link.label}: ${link.url}`).join('\n')}` : ''
    return {
      text: ar
        ? `**${l(project.title)}** — ${l(project.role)}\n${l(project.description)}\n\nالتقنيات: ${project.tech.join('، ')}${linksText}`
        : `**${l(project.title)}** — ${l(project.role)}\n${l(project.description)}\n\nTech: ${project.tech.join(', ')}${linksText}`,
      action: action('projects'),
    }
  }

  if (tech.length > 0 && (!intent || ['skills', 'experience', 'projects'].includes(intent) || !strongIntent)) {
    const related = portfolio.projects.filter((p) => p.tech.some((t) => tech.includes(t))).slice(0, 4)
    const relatedJobs = portfolio.experiences.filter((e) => e.tech.some((t) => tech.includes(t))).slice(0, 3)
    const list = tech.slice(0, 4).join(ar ? '، ' : ', ')
    const parts = [ar ? `نعم ✅ ${name} يعمل بـ **${list}**.` : `Yes ✅ ${name} works with **${list}**.`]
    if (relatedJobs.length)
      parts.push(
        (ar ? 'استخدمها في:\n' : 'He has used it at:\n') +
          bullet(relatedJobs.map((e) => `${l(e.company)} — ${l(e.role)}`)),
      )
    if (related.length)
      parts.push((ar ? 'مشاريع ذات صلة:\n' : 'Related projects:\n') + bullet(related.map((p) => l(p.title))))
    return { text: parts.join('\n\n'), action: action(related.length ? 'projects' : 'skills') }
  }

  const current = portfolio.experiences.find((e) => e.end === 'present') ?? portfolio.experiences[0]
  const contactLines = [
    `📧 ${profile.email}`,
    ...profile.phones.map((p) => `📱 ${p}`),
    profile.linkedin && `🔗 LinkedIn: ${profile.linkedin}`,
    profile.github && `💻 GitHub: ${profile.github}`,
  ].filter(Boolean) as string[]

  switch (intent) {
    case 'greeting':
      return { text: l(agent.greeting) }
    case 'thanks':
      return {
        text: ar
          ? 'العفو! 😊 إذا كان لديك أي سؤال آخر عن محمد فأنا هنا.'
          : "You're welcome! 😊 Let me know if there's anything else you'd like to know about Mohamed.",
      }
    case 'agent':
      return {
        text: ar
          ? `أنا ${l(agent.name)}، مساعد ذكي يجيب عن أسئلتك حول ${name}. يمكنني إخبارك عن:\n${bullet(['خبراته العملية', 'مهاراته التقنية', 'مشاريعه', 'تعليمه وشهاداته', 'طرق التواصل معه'])}`
          : `I'm ${l(agent.name)}, an AI assistant that answers questions about ${name}. I can tell you about:\n${bullet(['His work experience', 'His technical skills', 'His projects', 'His education & certificates', 'How to contact him'])}`,
      }
    case 'about':
      return { text: l(profile.summary), action: action('about') }
    case 'current':
      return {
        text: current
          ? ar
            ? `يعمل ${name} حاليًا **${l(current.role)}** في **${l(current.company)}** منذ ${current.start}.\n${l(current.description)}`
            : `${name} currently works as **${l(current.role)}** at **${l(current.company)}** (since ${current.start}).\n${l(current.description)}`
          : l(profile.summary),
        action: action('experience'),
      }
    case 'years':
      return {
        text: ar
          ? `لدى ${name} أكثر من **${profile.yearsExperience} سنوات** من الخبرة في تطوير الويب، منها أكثر من 3 سنوات في ${current ? l(current.company) : ''}.`
          : `${name} has **${profile.yearsExperience}+ years** of web development experience${current ? `, including his current role at ${l(current.company)} since ${current.start}` : ''}.`,
        action: action('experience'),
      }
    case 'experience':
      return {
        text:
          (ar ? `خبرات ${name} العملية:\n` : `${name}'s work experience:\n`) +
          bullet(
            portfolio.experiences.map(
              (e) => `**${l(e.role)}** — ${l(e.company)} (${e.start} → ${e.end === 'present' ? (ar ? 'حتى الآن' : 'present') : e.end})`,
            ),
          ),
        action: action('experience'),
      }
    case 'skills':
      return {
        text:
          (ar ? `أبرز مهارات ${name} التقنية:\n` : `${name}'s main technical skills:\n`) +
          bullet(portfolio.skillGroups.map((g) => `**${l(g.name)}:** ${g.items.join(', ')}`)),
        action: action('skills'),
      }
    case 'projects': {
      const featured = portfolio.projects.filter((p) => p.featured)
      const list = (featured.length ? featured : portfolio.projects).slice(0, 6)
      return {
        text:
          (ar ? `بعض أبرز مشاريع ${name}:\n` : `Some of ${name}'s key projects:\n`) +
          bullet(list.map((p) => `**${l(p.title)}** — ${l(p.description)}`)) +
          (ar ? '\n\nاسألني عن أي مشروع لمعرفة التفاصيل.' : '\n\nAsk me about any project for more details.'),
        action: action('projects'),
      }
    }
    case 'education':
      return {
        text:
          (ar ? 'المؤهلات الأكاديمية:\n' : 'Education:\n') +
          bullet(portfolio.education.map((e) => `**${l(e.title)}** — ${l(e.institution)} (${e.start} → ${e.end})`)),
        action: action('education'),
      }
    case 'certificates':
      return {
        text:
          (ar ? 'الدورات والشهادات:\n' : 'Trainings & certificates:\n') +
          bullet(portfolio.certificates.map((c) => `**${l(c.title)}** — ${l(c.issuer)} (${c.date})`)),
        action: action('certificates'),
      }
    case 'contact':
      return {
        text:
          (ar ? `يمكنك التواصل مع ${name} عبر:\n` : `You can reach ${name} via:\n`) +
          contactLines.join('\n') +
          (ar ? '\n\nأو استخدم نموذج التواصل في أسفل الصفحة.' : '\n\nOr use the contact form at the bottom of this page.'),
        action: action('contact'),
      }
    case 'location':
      return {
        text: ar
          ? `يقيم ${name} في **${l(profile.location)}**، ولديه خبرة في العمل مع فرق وعملاء في السعودية والكويت ومصر.`
          : `${name} is based in **${l(profile.location)}** and has worked with teams and clients in Saudi Arabia, Kuwait and Egypt.`,
      }
    case 'languages':
      return {
        text:
          (ar ? 'اللغات:\n' : 'Spoken languages:\n') +
          bullet(portfolio.languages.map((x) => `${l(x.name)} — ${l(x.level)}`)) +
          (ar ? '\n\nكما أنه متخصص في بناء واجهات ثنائية اللغة (RTL).' : '\n\nHe also specialises in bilingual Arabic (RTL) / English interfaces.'),
      }
    case 'availability':
      return {
        text: profile.available
          ? ar
            ? `نعم! ${name} منفتح على فرص جديدة 🚀 أرسل له رسالة عبر نموذج التواصل أو على ${profile.email}.`
            : `Yes! ${name} is open to new opportunities 🚀 Send him a message via the contact form or at ${profile.email}.`
          : ar
            ? `${name} غير متاح حاليًا، لكن يمكنك ترك رسالة عبر نموذج التواصل.`
            : `${name} is not actively looking right now, but feel free to leave a message via the contact form.`,
        action: action('contact'),
      }
    case 'cv':
      return {
        text: ar
          ? `يمكنك تحميل السيرة الذاتية لـ ${name} من زر "تحميل السيرة الذاتية" في أعلى الصفحة${profile.cvUrl ? `: ${location.origin}${profile.cvUrl}` : ''}.`
          : `You can download ${name}'s CV from the "Download CV" button at the top of the page${profile.cvUrl ? `: ${location.origin}${profile.cvUrl}` : ''}.`,
      }
    case 'salary':
      return {
        text: ar
          ? `تفاصيل الراتب والتكلفة تتم مناقشتها مباشرة مع ${name}. يرجى التواصل معه عبر نموذج التواصل أو ${profile.email}.`
          : `Compensation is best discussed directly with ${name}. Please reach out via the contact form or at ${profile.email}.`,
        action: action('contact'),
      }
    case 'blog': {
      const posts = publishedPosts(portfolio.blog).slice(0, 5)
      if (posts.length === 0) return { text: ar ? 'لا توجد مقالات منشورة بعد.' : 'There are no published articles yet.' }
      return {
        text:
          (ar ? `أحدث مقالات ${name}:\n` : `${name}'s latest articles:\n`) +
          bullet(posts.map((p) => `**${l(p.title)}** — ${location.origin}/blog/${p.slug}`)),
        action: action('blog'),
      }
    }
    default:
      return {
        text:
          (ar
            ? `لست متأكدًا من فهم سؤالك 🤔 يمكنني مساعدتك في معرفة المزيد عن ${name}. جرّب أن تسأل:\n`
            : `I'm not sure I understood that 🤔 I can help you learn more about ${name}. Try asking:\n`) +
          bullet(agent.suggestions.map((s) => l(s))),
      }
  }
}
