import { Lock } from 'lucide-react'
import { useActionState } from 'react'
import { Link, Navigate } from 'react-router'
import { SubmitButton } from '../../components/ui/Button'
import { Field, Input } from '../../components/ui/Field'
import { LanguageToggle, ThemeToggle } from '../../components/ui/Toggles'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { wait } from '../../lib/utils'
import { useAppSelector } from '../../store'
import { DEFAULT_PASSWORD_HASH } from '../../store/slices/settingsSlice'

export default function LoginPage() {
  const { t } = useLanguage()
  const { isAuthenticated, login } = useAuth()
  const usingDefault = useAppSelector((state) => state.settings.passwordHash === DEFAULT_PASSWORD_HASH)

  const [error, loginAction] = useActionState<string | null, FormData>(async (_prev, formData) => {
    await wait(400)
    const ok = await login(String(formData.get('username') ?? ''), String(formData.get('password') ?? ''))
    return ok ? null : t('admin.invalid')
  }, null)

  if (isAuthenticated) return <Navigate to="/admin" replace />

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden p-4">
      <title>{t('admin.loginTitle')}</title>
      <div className="hero-grid absolute inset-0 -z-10" />
      <div className="blob blob-1 -z-10 size-72 top-10 start-10" />
      <div className="blob blob-2 -z-10 size-72 bottom-10 end-10" />
      <div className="absolute top-4 flex gap-1 end-4">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <div className="card w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <span className="bg-gradient-brand mx-auto grid size-14 place-items-center rounded-2xl text-white">
            <Lock className="size-6" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">{t('admin.loginTitle')}</h1>
          <p className="mt-1 text-sm text-slate-500">{t('admin.loginSubtitle')}</p>
        </div>
        <form action={loginAction} className="space-y-4">
          <Field label={t('admin.username')} htmlFor="username">
            <Input id="username" name="username" autoComplete="username" required />
          </Field>
          <Field label={t('admin.password')} htmlFor="password">
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </Field>
          {error && (
            <p role="alert" className="text-sm font-medium text-rose-500">
              {error}
            </p>
          )}
          <SubmitButton className="w-full" pendingText={t('admin.signingIn')}>
            {t('admin.login')}
          </SubmitButton>
        </form>
        {usingDefault && <p className="mt-4 text-center text-xs text-slate-500">{t('admin.defaultHint')}</p>}
        <Link to="/" className="mt-4 block text-center text-sm text-brand-600 hover:underline dark:text-brand-400">
          ← {t('admin.viewSite')}
        </Link>
      </div>
    </div>
  )
}
