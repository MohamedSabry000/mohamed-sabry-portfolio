import { Bot, MessageCircle, SendHorizonal, Sparkles, Trash2, X } from 'lucide-react'
import { useEffect, useOptimistic, useRef, useState, useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import { getAgentReply } from '../../agent/agentService'
import { useChatUI } from '../../context/ChatContext'
import { useLanguage } from '../../context/LanguageContext'
import { cn, uid } from '../../lib/utils'
import { useAppDispatch, useAppSelector } from '../../store'
import { appendChatMessage, clearChat } from '../../store/slices/chatSlice'
import type { ChatMessage } from '../../types'
import MessageContent from './MessageContent'
import './chat.less'

function SendButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={label}
      className="bg-gradient-brand grid size-10 shrink-0 place-items-center rounded-xl text-white transition hover:opacity-90 disabled:opacity-50"
    >
      <SendHorizonal className="size-4 rtl:-scale-x-100" />
    </button>
  )
}

export default function ChatWidget() {
  const { t, tr, lang } = useLanguage()
  const { isOpen, toggle, close } = useChatUI()
  const dispatch = useAppDispatch()
  const messages = useAppSelector((state) => state.chat.messages)
  const portfolio = useAppSelector((state) => state.portfolio)
  const agent = useAppSelector((state) => state.agent)
  const [streaming, setStreaming] = useState('')
  const [, startTransition] = useTransition()
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // React 19: show the visitor's message instantly while the agent is thinking.
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (state: ChatMessage[], message: ChatMessage) => [...state, message],
  )
  const isThinking = optimisticMessages.length > messages.length

  const lastSource = [...messages].reverse().find((m) => m.role === 'assistant')?.source

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [optimisticMessages.length, streaming, isOpen])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  async function send(raw: string) {
    const question = raw.trim().slice(0, 1000)
    if (!question) return
    const userMessage: ChatMessage = {
      id: uid('chat'),
      role: 'user',
      content: question,
      createdAt: new Date().toISOString(),
    }
    addOptimistic(userMessage)
    const reply = await getAgentReply({
      question,
      history: [...messages, userMessage],
      portfolio,
      agent,
      lang,
      onToken: setStreaming,
    })
    setStreaming('')
    dispatch(appendChatMessage(userMessage))
    dispatch(
      appendChatMessage({
        id: uid('chat'),
        role: 'assistant',
        content: reply.text,
        createdAt: new Date().toISOString(),
        source: reply.source,
        action: reply.action,
      }),
    )
    if (reply.action?.type === 'scroll') {
      document.getElementById(reply.action.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const askSuggestion = (question: string) => startTransition(async () => send(question))

  return (
    <>
      {isOpen && (
        <div
          role="dialog"
          aria-label={tr(agent.name)}
          className="chat-panel fixed bottom-24 z-50 flex h-[min(600px,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl end-4 sm:end-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <header className="bg-gradient-brand flex items-center gap-3 px-4 py-3 text-white">
            <span className="grid size-10 place-items-center rounded-full bg-white/20">
              <Bot className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{tr(agent.name)}</p>
              <p className="flex items-center gap-1.5 text-xs text-white/85">
                <span className="size-2 rounded-full bg-emerald-300" />
                {t('chat.online')} · {lastSource === 'llm' ? t('chat.llm') : t('chat.local')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dispatch(clearChat())}
              className="grid size-9 place-items-center rounded-lg hover:bg-white/15"
              aria-label={t('chat.clear')}
              title={t('chat.clear')}
            >
              <Trash2 className="size-4" />
            </button>
            <button
              type="button"
              onClick={close}
              className="grid size-9 place-items-center rounded-lg hover:bg-white/15"
              aria-label={t('chat.close')}
            >
              <X className="size-5" />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            <Bubble role="assistant" content={tr(agent.greeting)} />
            {optimisticMessages.map((message) => (
              <Bubble key={message.id} role={message.role} content={message.content} />
            ))}
            {isThinking &&
              (streaming ? (
                <Bubble role="assistant" content={streaming} />
              ) : (
                <div className="chat-bubble from-assistant inline-flex bg-slate-100 px-4 py-3 text-slate-500 dark:bg-slate-800">
                  <span className="typing-dots" aria-label={t('chat.typing')}>
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              ))}
            {messages.length === 0 && !isThinking && (
              <div className="flex flex-wrap gap-2 pt-1">
                {agent.suggestions.map((suggestion) => (
                  <button
                    key={suggestion.en}
                    type="button"
                    onClick={() => askSuggestion(tr(suggestion))}
                    className="inline-flex items-center gap-1 rounded-full border border-brand-300 px-3 py-1.5 text-xs font-medium text-brand-700 transition hover:bg-brand-50 dark:border-brand-500/40 dark:text-brand-300 dark:hover:bg-brand-500/10"
                  >
                    <Sparkles className="size-3" />
                    {tr(suggestion)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            action={async (formData) => send(String(formData.get('message') ?? ''))}
            className="flex items-center gap-2 border-t border-slate-200 p-3 dark:border-slate-800"
          >
            <input
              ref={inputRef}
              name="message"
              autoComplete="off"
              maxLength={1000}
              placeholder={t('chat.placeholder')}
              aria-label={t('chat.placeholder')}
              className="input flex-1 py-2"
            />
            <SendButton label={t('chat.send')} />
          </form>
          <p className="px-4 pb-2 text-center text-[10px] text-slate-400">{t('chat.disclaimer')}</p>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? t('chat.close') : t('chat.open')}
        aria-expanded={isOpen}
        className={cn(
          'bg-gradient-brand fixed bottom-6 z-50 grid size-14 place-items-center rounded-full text-white shadow-xl shadow-brand-600/30 transition hover:scale-105 end-4 sm:end-6',
          !isOpen && 'chat-fab',
        )}
      >
        {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </>
  )
}

function Bubble({ role, content }: { role: ChatMessage['role']; content: string }) {
  const isUser = role === 'user'
  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'chat-bubble max-w-[85%] px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'from-user bg-brand-600 text-white'
            : 'from-assistant bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
        )}
        dir="auto"
      >
        <MessageContent content={content} />
      </div>
    </div>
  )
}
