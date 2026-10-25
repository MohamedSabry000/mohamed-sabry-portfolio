import { siteUrl } from '../lib/utils'
import { publishedPosts } from '../lib/blog'
import type { AgentSettings, ChatAction, FaqItem, Lang, PortfolioState, SectionKey } from '../types'
import { detectIntent, detectLang, normalize, sectionFor, type Intent } from './intents'
import { findFaq, findMentionedProject, findMentionedTech } from './matching'

// Composes answers for the built-in (offline) assistant from portfolio data and FAQ/knowledge entries.

export interface AgentReply {
  text: string
  action?: ChatAction
}

export { detectIntent, detectLang, findFaq, findMentionedProject, findMentionedTech, normalize }
export type { Intent }

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
  knowledge: FaqItem[] = [],
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

  const faq = findFaq(question, [...(portfolio.faqs ?? []), ...knowledge])
  if (faq && !project) {
    const inFaqSection = (portfolio.faqs ?? []).some((item) => item.id === faq.id)
    return { text: l(faq.answer), action: inFaqSection ? action('faq') : undefined }
  }

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
          ? `يمكنك تحميل السيرة الذاتية لـ ${name} من زر "تحميل السيرة الذاتية" في أعلى الصفحة${profile.cvUrl ? `: ${siteUrl(profile.cvUrl)}` : ''}.`
          : `You can download ${name}'s CV from the "Download CV" button at the top of the page${profile.cvUrl ? `: ${siteUrl(profile.cvUrl)}` : ''}.`,
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
          bullet(posts.map((p) => `**${l(p.title)}** — ${siteUrl(`/blog/${p.slug}`)}`)),
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
