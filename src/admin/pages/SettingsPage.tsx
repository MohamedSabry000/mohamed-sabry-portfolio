import { Download, RotateCcw, Upload } from 'lucide-react'
import { useActionState, useRef } from 'react'
import { Button, SubmitButton } from '../../components/ui/Button'
import { Field, Input } from '../../components/ui/Field'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../lib/api'
import { sha256 } from '../../lib/utils'
import { useAppDispatch, useAppSelector } from '../../store'
import { importPortfolio, resetPortfolio } from '../../store/slices/portfolioSlice'
import { setCredentials } from '../../store/slices/settingsSlice'
import type { PortfolioState } from '../../types'
import PageHeader from '../components/PageHeader'

export default function SettingsPage() {
  const { t } = useLanguage()
  const { notify } = useToast()
  const { login } = useAuth()
  const dispatch = useAppDispatch()
  const portfolio = useAppSelector((state) => state.portfolio)
  const username = useAppSelector((state) => state.settings.adminUsername)
  const fileRef = useRef<HTMLInputElement>(null)

  const [error, credentialsAction] = useActionState(async (_prev: string | null, formData: FormData) => {
    const user = String(formData.get('username') ?? '').trim()
    const password = String(formData.get('password') ?? '')
    const confirm = String(formData.get('confirm') ?? '')
    if (!user || password.length < 6 || password !== confirm) return t('admin.passwordMismatch')
    await api('/auth/credentials', { method: 'PUT', body: JSON.stringify({ username: user, password }) }).catch(() => null)
    dispatch(setCredentials({ username: user, passwordHash: await sha256(password) }))
    await login(user, password)
    notify(t('common.saved'))
    return null
  }, null)

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(portfolio, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importJson = async (file: File) => {
    try {
      const data = JSON.parse(await file.text()) as PortfolioState
      if (!data.profile || !Array.isArray(data.projects) || !data.sections) throw new Error('invalid')
      dispatch(importPortfolio(data))
      notify(t('common.saved'))
    } catch {
      notify(t('admin.importError'), 'error')
    }
  }

  return (
    <>
      <PageHeader title={t('admin.settings')} />
      <section className="card mb-6 p-6">
        <h2 className="mb-4 font-bold">{t('admin.changeCredentials')}</h2>
        <form action={credentialsAction} className="grid gap-4 sm:grid-cols-3">
          <Field label={t('admin.username')} htmlFor="s-username">
            <Input id="s-username" name="username" defaultValue={username} autoComplete="username" />
          </Field>
          <Field label={t('admin.newPassword')} htmlFor="s-password">
            <Input id="s-password" name="password" type="password" autoComplete="new-password" />
          </Field>
          <Field label={t('admin.confirmPassword')} htmlFor="s-confirm">
            <Input id="s-confirm" name="confirm" type="password" autoComplete="new-password" />
          </Field>
          <div className="flex items-center gap-4 sm:col-span-3">
            <SubmitButton pendingText={t('common.saving')}>{t('common.save')}</SubmitButton>
            {error && <p role="alert" className="text-sm text-rose-500">{error}</p>}
          </div>
        </form>
      </section>
      <section className="card p-6">
        <h2 className="mb-4 font-bold">{t('admin.data')}</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exportJson}>
            <Download className="size-4" /> {t('admin.export')}
          </Button>
          <Button variant="secondary" onClick={() => fileRef.current?.click()}>
            <Upload className="size-4" /> {t('admin.import')}
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void importJson(file)
              e.target.value = ''
            }}
          />
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm(t('admin.resetConfirm'))) {
                dispatch(resetPortfolio())
                notify(t('common.saved'))
              }
            }}
          >
            <RotateCcw className="size-4" /> {t('admin.reset')}
          </Button>
        </div>
      </section>
    </>
  )
}
