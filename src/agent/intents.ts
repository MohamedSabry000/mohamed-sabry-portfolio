// Intent detection for the built-in assistant: keyword lists (EN/AR) and scoring.
import { isArabicText } from '../lib/utils'
import type { Lang, SectionKey } from '../types'

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

export const keywords: Record<Intent, string[]> = {
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

export const sectionFor: Partial<Record<Intent, SectionKey>> = {
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

export const hasKeyword = (text: string, keyword: string) => {
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
