import type { BlogPost, FaqItem } from '../types'
import { interviewPosts } from './interviewPosts'

const rtlEn = [
  'Most products I build at Naseej ship in Arabic and English. Supporting both is a layout problem, not a translation problem. Here is what works for me.',
  '',
  '## 1. Let the document own the direction',
  'Set `dir` and `lang` on the `<html>` element from a language context, and don\'t hard-code direction in components. Every flex row, grid and text block then flips automatically.',
  '',
  '## 2. Use logical properties',
  'Replace `margin-left` and `padding-right` with logical properties. In Tailwind that means `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*` and `end-*`:',
  '- `ms-4` instead of `ml-4`',
  '- `text-start` instead of `text-left`',
  '- `start-0` instead of `left-0`',
  '',
  '## 3. Mirror icons that show direction',
  'Arrows and chevrons must flip in RTL, while logos and media controls must not. A `rtl:rotate-180` class on directional icons is usually enough.',
  '',
  '## 4. Keep code, numbers and URLs LTR',
  'Wrap tech stacks, phone numbers, e-mails and code samples in `dir="ltr"` so they don\'t get scrambled inside Arabic text.',
  '',
  '## 5. Pick fonts for both scripts',
  'Use a font stack with a good Arabic face (I like Cairo) so line heights and weights match between the two languages.',
  '',
  '> Test every screen in both directions before you call it done. RTL bugs are cheap to fix early and expensive to fix late.',
].join('\n')

const rtlAr = [
  'معظم المنتجات التي أبنيها في نسيج تُطلق باللغتين العربية والإنجليزية. دعم اللغتين مشكلة تخطيط قبل أن يكون مشكلة ترجمة. إليك ما ينجح معي.',
  '',
  '## 1. اجعل المستند يتحكم في الاتجاه',
  'اضبط `dir` و `lang` على عنصر `<html>` من خلال Context للغة، ولا تكتب الاتجاه داخل المكونات. بعدها تنعكس الصفوف والشبكات والنصوص تلقائيًا.',
  '',
  '## 2. استخدم الخصائص المنطقية',
  'استبدل `margin-left` و `padding-right` بالخصائص المنطقية. في Tailwind يعني ذلك `ms-*` و `me-*` و `ps-*` و `pe-*` و `start-*` و `end-*`:',
  '- `ms-4` بدلًا من `ml-4`',
  '- `text-start` بدلًا من `text-left`',
  '- `start-0` بدلًا من `left-0`',
  '',
  '## 3. اعكس الأيقونات التي تدل على اتجاه',
  'الأسهم يجب أن تنعكس في RTL، أما الشعارات وأزرار الوسائط فلا. غالبًا يكفي إضافة `rtl:rotate-180` للأيقونات الاتجاهية.',
  '',
  '## 4. أبقِ الأكواد والأرقام والروابط LTR',
  'ضع التقنيات وأرقام الهواتف والبريد الإلكتروني وأمثلة الكود داخل `dir="ltr"` حتى لا تختلط داخل النص العربي.',
  '',
  '## 5. اختر خطوطًا تناسب اللغتين',
  'استخدم مجموعة خطوط تحتوي على خط عربي جيد (أفضّل Cairo) حتى تتطابق المسافات والأوزان بين اللغتين.',
  '',
  '> اختبر كل شاشة في الاتجاهين قبل اعتبارها منتهية؛ إصلاح أخطاء RTL مبكرًا رخيص، ومتأخرًا مكلف.',
].join('\n')

const formsCode = [
  '```tsx',
  'const [state, formAction, isPending] = useActionState(async (prev, formData) => {',
  '  await save(formData)',
  '  return { ok: true }',
  '}, { ok: false })',
  '',
  'return <form action={formAction}>…</form>',
  '```',
]
const statusCode = [
  '```tsx',
  'function SubmitButton() {',
  '  const { pending } = useFormStatus()',
  "  return <button disabled={pending}>{pending ? 'Sending…' : 'Send'}</button>",
  '}',
  '```',
]

const formsEn = [
  "React 19 makes forms much simpler. This portfolio's contact form, admin editors and chat widget all use the new APIs.",
  '',
  '## useActionState',
  'Pass an async action and an initial state. React gives you the latest state, a form action and a pending flag:',
  '',
  ...formsCode,
  '',
  '## useFormStatus',
  'A submit button can read the status of its parent form, with no prop drilling:',
  '',
  ...statusCode,
  '',
  '## useOptimistic',
  "Show the result straight away, before the server answers. The chat widget adds the visitor's message to the list as soon as it's sent, and React swaps in the real state when the request finishes.",
  '',
  '## Takeaways',
  '- Fewer `useState` + `useEffect` pairs for loading and error state',
  '- Forms work with plain `FormData`',
  '- Pending UI is built in',
].join('\n')

const formsAr = [
  'يجعل React 19 النماذج أبسط بكثير. نموذج التواصل ومحررات لوحة التحكم والمساعد الذكي في هذا الموقع تستخدم كلها الواجهات الجديدة.',
  '',
  '## useActionState',
  'مرّر دالة async وحالة ابتدائية، وسيعطيك React آخر حالة ودالة للنموذج ومؤشر انتظار:',
  '',
  ...formsCode,
  '',
  '## useFormStatus',
  'يستطيع زر الإرسال قراءة حالة النموذج الأب مباشرة دون تمرير props:',
  '',
  ...statusCode,
  '',
  '## useOptimistic',
  'اعرض النتيجة فورًا قبل رد الخادم. يضيف المساعد الذكي رسالة الزائر إلى القائمة لحظة إرسالها، ثم يستبدلها React بالحالة الحقيقية عند انتهاء الطلب.',
  '',
  '## الخلاصة',
  '- عدد أقل من أزواج `useState` و `useEffect` لحالات التحميل والأخطاء',
  '- النماذج تعمل مع `FormData` مباشرة',
  '- واجهة الانتظار مدمجة',
].join('\n')

const capEn = [
  'For the Medad platform we delivered white-labelled iOS and Android apps from the same React code base as the web app, using Capacitor.',
  '',
  '## Why Capacitor',
  '- One React + TypeScript code base for web, iOS and Android',
  '- Native plugins (camera, push notifications, file system) behind a JavaScript API',
  '- The web team can ship mobile releases without learning a new framework',
  '',
  '## Things to plan for',
  '1. **Safe areas and the keyboard.** Use `env(safe-area-inset-*)` and test forms with the on-screen keyboard open.',
  '2. **Deep links and routing.** Use the same routes on web and mobile so links from notifications open the right screen.',
  "3. **White-labelling.** Keep each client's brand colours, icons and app IDs in configuration, not in code.",
  '4. **Performance.** Lazy-load routes and keep the first bundle small, because low-end Android devices are less forgiving than desktops.',
  '',
  '## When to choose React Native instead',
  'If the app relies on heavy animations, complex gestures or deep native integrations, React Native is often the better fit. For content and form-heavy products, Capacitor gets you to the stores faster.',
].join('\n')

const capAr = [
  'في منصة مداد قدّمنا تطبيقات iOS و Android بعلامات تجارية مخصصة من نفس كود React الخاص بتطبيق الويب باستخدام Capacitor.',
  '',
  '## لماذا Capacitor',
  '- كود واحد بـ React و TypeScript للويب و iOS و Android',
  '- إضافات أصلية (الكاميرا، الإشعارات، نظام الملفات) عبر واجهة JavaScript',
  '- يستطيع فريق الويب إصدار تطبيقات الجوال دون تعلم إطار عمل جديد',
  '',
  '## أمور يجب التخطيط لها',
  '1. **المناطق الآمنة ولوحة المفاتيح.** استخدم `env(safe-area-inset-*)` واختبر النماذج مع ظهور لوحة المفاتيح.',
  '2. **الروابط العميقة والتوجيه.** استخدم نفس المسارات في الويب والجوال حتى تفتح روابط الإشعارات الشاشة الصحيحة.',
  '3. **العلامات التجارية المخصصة.** احفظ ألوان كل عميل وأيقوناته ومعرّفات تطبيقه في الإعدادات وليس في الكود.',
  '4. **الأداء.** حمّل المسارات عند الحاجة وأبقِ الحزمة الأولى صغيرة، فأجهزة Android الضعيفة أقل تسامحًا من الحواسيب.',
  '',
  '## متى تختار React Native بدلًا منه',
  'إذا كان التطبيق يعتمد على رسوم متحركة كثيفة أو إيماءات معقدة أو تكامل أصلي عميق فغالبًا React Native هو الأنسب. أما المنتجات القائمة على المحتوى والنماذج فيوصلك Capacitor إلى المتاجر أسرع.',
].join('\n')

export const defaultBlog: BlogPost[] = [
  ...interviewPosts,
  {
    id: 'post_rtl',
    slug: 'building-bilingual-rtl-interfaces-react',
    title: { en: 'Building bilingual Arabic/English (RTL) interfaces in React', ar: 'بناء واجهات ثنائية اللغة عربي/إنجليزي (RTL) في React' },
    excerpt: {
      en: 'Five practical rules I follow to ship React apps that look right in both Arabic (RTL) and English.',
      ar: 'خمس قواعد عملية أتبعها لإطلاق تطبيقات React تبدو صحيحة بالعربية (RTL) والإنجليزية.',
    },
    content: { en: rtlEn, ar: rtlAr },
    tags: ['React', 'RTL', 'CSS'],
    date: '2026-09-15',
    cover: '',
    published: true,
  },
  {
    id: 'post_forms',
    slug: 'react-19-forms',
    title: { en: 'React 19 forms: useActionState, useFormStatus and useOptimistic', ar: 'النماذج في React 19: useActionState و useFormStatus و useOptimistic' },
    excerpt: {
      en: 'How the new React 19 hooks remove most of the boilerplate around forms, pending states and optimistic UI.',
      ar: 'كيف تزيل واجهات React 19 الجديدة معظم الكود المتكرر في النماذج وحالات الانتظار والواجهة التفاؤلية.',
    },
    content: { en: formsEn, ar: formsAr },
    tags: ['React', 'React 19'],
    date: '2026-08-20',
    cover: '',
    published: true,
  },
  {
    id: 'post_capacitor',
    slug: 'web-to-mobile-with-capacitor',
    title: { en: 'From web app to iOS & Android with Capacitor', ar: 'من تطبيق ويب إلى iOS و Android باستخدام Capacitor' },
    excerpt: {
      en: 'Lessons from shipping white-labelled mobile apps from a single React code base.',
      ar: 'دروس من إطلاق تطبيقات جوال بعلامات تجارية مخصصة من كود React واحد.',
    },
    content: { en: capEn, ar: capAr },
    tags: ['Capacitor', 'Mobile', 'React'],
    date: '2026-07-10',
    cover: '',
    published: true,
  },
]

export const defaultFaqs: FaqItem[] = [
  {
    id: 'faq_work',
    question: { en: 'What kind of work does Mohamed do?', ar: 'ما نوع العمل الذي يقوم به محمد؟' },
    answer: {
      en: 'Front-end engineering: React.js and Next.js web apps, admin dashboards, bilingual Arabic (RTL) / English interfaces and mobile apps with React Native and Capacitor. He also builds REST APIs with Node.js and Express.js.',
      ar: 'هندسة الواجهات الأمامية: تطبيقات ويب بـ React.js و Next.js، ولوحات تحكم، وواجهات ثنائية اللغة عربي (RTL) / إنجليزي، وتطبيقات جوال بـ React Native و Capacitor. كما يبني واجهات REST API باستخدام Node.js و Express.js.',
    },
  },
  {
    id: 'faq_available',
    question: { en: 'Is Mohamed available for new opportunities or freelance projects?', ar: 'هل محمد متاح لفرص جديدة أو مشاريع عمل حر؟' },
    answer: {
      en: 'Yes, he is open to new opportunities. Send a message through the contact form or e-mail mohamed.sabry.ahmed000@gmail.com with a short description of the role or project.',
      ar: 'نعم، هو منفتح على الفرص الجديدة. أرسل رسالة عبر نموذج التواصل أو على mohamed.sabry.ahmed000@gmail.com مع وصف مختصر للوظيفة أو المشروع.',
    },
  },
  {
    id: 'faq_rtl',
    question: { en: 'Does Mohamed build Arabic (RTL) websites?', ar: 'هل يبني محمد مواقع باللغة العربية (RTL)؟' },
    answer: {
      en: 'Yes. Most of his products ship in Arabic and English, with full right-to-left (RTL) layouts, mirrored components and Arabic typography. This website is an example.',
      ar: 'نعم. معظم منتجاته تُطلق بالعربية والإنجليزية مع تخطيط كامل من اليمين إلى اليسار (RTL) ومكونات معكوسة وخطوط عربية مناسبة، وهذا الموقع مثال على ذلك.',
    },
  },
  {
    id: 'faq_stack',
    question: { en: 'Which technologies does Mohamed use most?', ar: 'ما التقنيات التي يستخدمها محمد أكثر؟' },
    answer: {
      en: 'React.js, TypeScript, Next.js, Redux and React Query, styled with Tailwind CSS, Less or Sass. On the back end he uses Node.js and Express.js with MySQL, MongoDB or SQL Server.',
      ar: 'React.js و TypeScript و Next.js و Redux و React Query، مع Tailwind CSS أو Less أو Sass للتنسيق. وفي الخلفية يستخدم Node.js و Express.js مع MySQL أو MongoDB أو SQL Server.',
    },
  },
  {
    id: 'faq_mobile',
    question: { en: 'Can Mohamed build mobile apps?', ar: 'هل يستطيع محمد بناء تطبيقات الجوال؟' },
    answer: {
      en: 'Yes. He built white-labelled iOS and Android apps for the Medad platform with Capacitor, and he also works with React Native.',
      ar: 'نعم. بنى تطبيقات iOS و Android بعلامات تجارية مخصصة لمنصة مداد باستخدام Capacitor، كما يعمل بـ React Native.',
    },
  },
  {
    id: 'faq_location',
    question: { en: 'Where is Mohamed based?', ar: 'أين يقيم محمد؟' },
    answer: {
      en: 'He is based in Cairo, Egypt, and has worked with teams and clients in Saudi Arabia, Kuwait and Egypt.',
      ar: 'يقيم في القاهرة، مصر، وعمل مع فرق وعملاء في السعودية والكويت ومصر.',
    },
  },
]
