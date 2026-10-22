import { Bot, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useChatUI } from '../../context/ChatContext'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../lib/utils'
import { useAppSelector } from '../../store'
import { buttonClass } from '../ui/Button'
import Markdown from '../ui/Markdown'
import SectionTitle from '../ui/SectionTitle'

export default function Faq() {
  const { t, tr } = useLanguage()
  const faqs = useAppSelector((state) => state.portfolio.faqs)
  const agentEnabled = useAppSelector((state) => state.agent.enabled)
  const { open } = useChatUI()
  const [openId, setOpenId] = useState<string | null>(null)
  if (faqs.length === 0) return null

  return (
    <section id="faq" className="py-20">
      <div className="container-page max-w-3xl">
        <SectionTitle title={t('faq.title')} subtitle={t('faq.subtitle')} />
        <div className="space-y-3">
          {faqs.map((item) => {
            const expanded = openId === item.id
            return (
              <div key={item.id} className={cn('card overflow-hidden transition', expanded && 'border-brand-400 dark:border-brand-500/50')}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${item.id}`}
                    aria-expanded={expanded}
                    aria-controls={`faq-a-${item.id}`}
                    onClick={() => setOpenId(expanded ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-start font-semibold text-slate-900 dark:text-white"
                  >
                    <span>{tr(item.question)}</span>
                    <ChevronDown className={cn('size-5 shrink-0 text-slate-400 transition-transform', expanded && 'rotate-180')} />
                  </button>
                </h3>
                {expanded && (
                  <div id={`faq-a-${item.id}`} role="region" aria-labelledby={`faq-q-${item.id}`} className="px-5 pb-5">
                    <Markdown content={tr(item.answer)} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {agentEnabled && (
          <div className="mt-8 text-center">
            <button type="button" onClick={open} className={buttonClass('secondary')}>
              <Bot className="size-4" /> {t('faq.askAi')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
