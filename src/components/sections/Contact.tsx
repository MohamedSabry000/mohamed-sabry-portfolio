import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react'
import { api } from '../../lib/api'
import { useActionState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import type { TranslationKey } from '../../i18n/translations'
import { uid, wait } from '../../lib/utils'
import { useAppDispatch, useAppSelector } from '../../store'
import { addMessage } from '../../store/slices/messagesSlice'
import { SubmitButton } from '../ui/Button'
import { Field, Input, Textarea } from '../ui/Field'
import SectionTitle from '../ui/SectionTitle'

interface ContactState {
  status: 'idle' | 'success' | 'error'
  error?: TranslationKey
  values: Record<'name' | 'email' | 'subject' | 'message', string>
}

const emptyValues = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { t, tr } = useLanguage()
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) => state.portfolio.profile)

  // React 19: useActionState wires an async form action to state + pending flag.
  const [state, formAction] = useActionState<ContactState, FormData>(
    async (_prev, formData) => {
      const values = {
        name: String(formData.get('name') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        subject: String(formData.get('subject') ?? '').trim(),
        message: String(formData.get('message') ?? '').trim(),
      }
      if (Object.values(values).some((value) => !value)) {
        return { status: 'error', error: 'contact.errorRequired', values }
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        return { status: 'error', error: 'contact.errorEmail', values }
      }
      const saved = await api('/messages', { method: 'POST', body: JSON.stringify(values) }).catch(() => null)
      if (!saved) await wait(600)
      dispatch(addMessage({ id: uid('msg'), ...values, createdAt: new Date().toISOString(), read: false }))
      return { status: 'success', values: emptyValues }
    },
    { status: 'idle', values: emptyValues },
  )

  return (
    <section id="contact" className="py-20">
      <div className="container-page">
        <SectionTitle title={t('contact.title')} subtitle={t('contact.subtitle')} />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="bg-gradient-brand relative overflow-hidden rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold">{tr(profile.name)}</h3>
            <p className="mt-1 text-white/80">{tr(profile.title)}</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="size-5" />
                <a href={`mailto:${profile.email}`} className="break-all hover:underline">
                  {profile.email}
                </a>
              </li>
              {profile.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-3">
                  <Phone className="size-5" />
                  <a href={`tel:${phone.replace(/\s/g, '')}`} dir="ltr" className="hover:underline">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <MapPin className="size-5" />
                {tr(profile.location)}
              </li>
            </ul>
            <div className="absolute -bottom-16 size-48 rounded-full bg-white/10 -end-16" />
          </div>

          <form action={formAction} className="card grid gap-4 p-6 sm:grid-cols-2 sm:p-8" noValidate>
            <Field label={t('contact.name')} htmlFor="contact-name">
              <Input id="contact-name" name="name" defaultValue={state.values.name} autoComplete="name" />
            </Field>
            <Field label={t('contact.email')} htmlFor="contact-email">
              <Input id="contact-email" name="email" type="email" defaultValue={state.values.email} autoComplete="email" />
            </Field>
            <Field label={t('contact.subject')} htmlFor="contact-subject" className="sm:col-span-2">
              <Input id="contact-subject" name="subject" defaultValue={state.values.subject} />
            </Field>
            <Field label={t('contact.message')} htmlFor="contact-message" className="sm:col-span-2">
              <Textarea id="contact-message" name="message" rows={5} defaultValue={state.values.message} />
            </Field>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <SubmitButton pendingText={t('contact.sending')}>{t('contact.send')}</SubmitButton>
              {state.status === 'error' && state.error && (
                <p role="alert" className="text-sm font-medium text-rose-500">
                  {t(state.error)}
                </p>
              )}
              {state.status === 'success' && (
                <p role="status" className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-4" /> {t('contact.success')}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
