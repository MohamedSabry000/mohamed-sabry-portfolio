import { Mail, MailOpen, Trash2 } from 'lucide-react'
import MessageContent from '../../components/chat/MessageContent'
import { Button } from '../../components/ui/Button'
import { useLanguage } from '../../context/LanguageContext'
import { useAppDispatch, useAppSelector } from '../../store'
import { clearChat } from '../../store/slices/chatSlice'
import PageHeader from '../components/PageHeader'
import { useMessages } from '../useMessages'

export default function MessagesPage() {
  const { t, lang } = useLanguage()
  const dispatch = useAppDispatch()
  const { messages, setRead, remove } = useMessages()
  const chat = useAppSelector((state) => state.chat.messages)
  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))

  return (
    <>
      <PageHeader title={t('admin.messages')} />
      <section className="mb-8">
        <h2 className="mb-3 font-bold">{t('admin.contactMessages')}</h2>
        {messages.length === 0 ? (
          <p className="card p-6 text-center text-sm text-slate-500">{t('common.empty')}</p>
        ) : (
          <ul className="space-y-3">
            {messages.map((m) => (
              <li key={m.id} className={`card p-5 ${m.read ? '' : 'border-s-4 border-s-brand-500'}`}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{m.subject}</p>
                    <p className="text-sm text-slate-500">
                      {m.name} · <a href={`mailto:${m.email}`} className="hover:underline">{m.email}</a> · {fmt(m.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => void setRead(m.id, !m.read)}
                      className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      aria-label={m.read ? t('admin.markUnread') : t('admin.markRead')}
                      title={m.read ? t('admin.markUnread') : t('admin.markRead')}
                    >
                      {m.read ? <Mail className="size-4" /> : <MailOpen className="size-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => window.confirm(t('common.confirmDelete')) && void remove(m.id)}
                      className="grid size-9 place-items-center rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                      aria-label={t('common.delete')}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{m.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold">{t('admin.chatLog')}</h2>
          {chat.length > 0 && (
            <Button variant="secondary" onClick={() => dispatch(clearChat())}>
              <Trash2 className="size-4" /> {t('admin.clearChat')}
            </Button>
          )}
        </div>
        {chat.length === 0 ? (
          <p className="card p-6 text-center text-sm text-slate-500">{t('common.empty')}</p>
        ) : (
          <ul className="card space-y-3 p-5">
            {chat.map((m) => (
              <li key={m.id} className="text-sm" dir="auto">
                <span className={`me-2 text-xs font-bold uppercase ${m.role === 'user' ? 'text-brand-600' : 'text-emerald-600'}`}>
                  {m.role === 'user' ? 'Visitor' : `AI${m.source ? ` (${m.source})` : ''}`}
                </span>
                <span className="text-xs text-slate-400">{fmt(m.createdAt)}</span>
                <div className="mt-1 text-slate-700 dark:text-slate-300">
                  <MessageContent content={m.content} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
