import { Bot, CheckCircle2, CircleAlert, Database, RefreshCw } from 'lucide-react'
import { useActionState, useEffect, useState, useTransition } from 'react'
import { checkAgentHealth, type AgentHealth } from '../../agent/agentService'
import { Button, SubmitButton } from '../../components/ui/Button'
import { Field, Textarea, Toggle } from '../../components/ui/Field'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
import { useAppDispatch, useAppSelector } from '../../store'
import { resetAgent, updateAgent } from '../../store/slices/agentSlice'
import type { AgentMode } from '../../types'
import LocalizedField, { readLocalized } from '../components/LocalizedField'
import PageHeader from '../components/PageHeader'

export default function AgentPage() {
  const { t } = useLanguage()
  const { notify } = useToast()
  const dispatch = useAppDispatch()
  const agent = useAppSelector((state) => state.agent)
  const [health, setHealth] = useState<AgentHealth | null>(null)
  const [checking, startCheck] = useTransition()

  const refresh = () =>
    startCheck(async () => {
      const result = await checkAgentHealth(true)
      setHealth(result)
    })

  useEffect(refresh, [])

  const [, saveAction] = useActionState(async (_prev: null, formData: FormData) => {
    const suggestions = String(formData.get('suggestions') ?? '')
      .split('\n')
      .map((line) => line.split('|').map((s) => s.trim()))
      .filter(([en]) => en)
      .map(([en, ar = '']) => ({ en, ar }))
    dispatch(
      updateAgent({
        enabled: formData.get('enabled') === 'on',
        name: readLocalized(formData, 'name'),
        greeting: readLocalized(formData, 'greeting'),
        instructions: String(formData.get('instructions') ?? '').trim(),
        mode: String(formData.get('mode')) as AgentMode,
        suggestions,
      }),
    )
    notify(t('common.saved'))
    return null
  }, null)

  const modes: Array<{ value: AgentMode; label: string }> = [
    { value: 'auto', label: t('admin.agentModeAuto') },
    { value: 'local', label: t('admin.agentModeLocal') },
    { value: 'remote', label: t('admin.agentModeRemote') },
  ]

  return (
    <>
      <PageHeader title={t('admin.agent')} />
      <div className="card mb-6 flex flex-wrap items-center gap-4 p-5">
        <span className="bg-gradient-brand grid size-12 place-items-center rounded-xl text-white">
          <Bot className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-500">{t('admin.agentStatus')}</p>
          {health === null ? (
            <p className="font-semibold">…</p>
          ) : health.llm ? (
            <p className="flex items-center gap-1.5 font-semibold text-emerald-600">
              <CheckCircle2 className="size-4" /> {t('admin.agentConnected')}
            </p>
          ) : (
            <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-600">
              <CircleAlert className="size-4 shrink-0" />
              {health.reachable ? t('admin.agentNotConfigured') : t('admin.agentUnreachable')}
            </p>
          )}
        </div>
        <Button variant="secondary" onClick={refresh} disabled={checking}>
          <RefreshCw className={`size-4 ${checking ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="card mb-6 flex flex-wrap items-center gap-4 p-5">
        <span className="grid size-12 place-items-center rounded-xl bg-[#f03e2f] text-white">
          <Database className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-500">{t('admin.sanityStatus')}</p>
          {health === null ? (
            <p className="font-semibold">…</p>
          ) : health.sanity.configured ? (
            <>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <CheckCircle2 className="size-4 shrink-0" /> {t('admin.sanityConnected')}
              </p>
              {health.sanity.logging && <p className="mt-1 text-xs text-slate-500">{t('admin.sanityLogging')}</p>}
            </>
          ) : (
            <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-600">
              <CircleAlert className="size-4 shrink-0" /> {t('admin.sanityNotConfigured')}
            </p>
          )}
        </div>
      </div>

      <form action={saveAction} className="card space-y-5 p-6" key={JSON.stringify(agent)}>
        <Toggle name="enabled" label={t('admin.agentEnabled')} checked={agent.enabled} />
        <LocalizedField name="name" label={t('admin.agentName')} value={agent.name} required />
        <LocalizedField name="greeting" label={t('admin.agentGreeting')} value={agent.greeting} multiline />
        <fieldset>
          <legend className="label">{t('admin.agentMode')}</legend>
          <div className="grid gap-2">
            {modes.map((mode) => (
              <label key={mode.value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 dark:border-slate-800 dark:has-[:checked]:bg-brand-500/10">
                <input type="radio" name="mode" value={mode.value} defaultChecked={agent.mode === mode.value} className="accent-brand-600" />
                {mode.label}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label={t('admin.agentInstructions')} htmlFor="instructions">
          <Textarea id="instructions" name="instructions" defaultValue={agent.instructions} rows={3} />
        </Field>
        <Field label={t('admin.agentSuggestions')} htmlFor="suggestions">
          <Textarea
            id="suggestions"
            name="suggestions"
            rows={5}
            defaultValue={agent.suggestions.map((s) => `${s.en} | ${s.ar}`).join('\n')}
          />
        </Field>
        <div className="flex flex-wrap gap-2">
          <SubmitButton pendingText={t('common.saving')}>{t('common.save')}</SubmitButton>
          <Button type="button" variant="secondary" onClick={() => dispatch(resetAgent())}>
            {t('admin.reset')}
          </Button>
        </div>
      </form>
    </>
  )
}
