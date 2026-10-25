import { ArrowDown, ArrowUp, Pencil, Plus, Search, Trash2, X } from 'lucide-react'
import { useActionState, useDeferredValue, useState } from 'react'
import { Button, SubmitButton } from '../../components/ui/Button'
import { Field, Input, Textarea, Toggle } from '../../components/ui/Field'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
import { slugify, uid } from '../../lib/utils'
import { useAppDispatch, useAppSelector } from '../../store'
import { moveItem, removeItem, upsertItem } from '../../store/slices/portfolioSlice'
import type { CollectionItem, CollectionKey, Localized, ProjectLink } from '../../types'
import { schemas, emptyItem, today, parseLinks, type AnyItem, type Schema } from '../collectionSchemas'
import LocalizedField, { readLocalized } from '../components/LocalizedField'
import PageHeader from '../components/PageHeader'

export { parseLinks }

export default function CollectionPage({ collection }: { collection: CollectionKey }) {
  const schema = schemas[collection]
  const { t, tr } = useLanguage()
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.portfolio[collection]) as unknown as AnyItem[]
  const [editing, setEditing] = useState<AnyItem | null>(null)
  const [query, setQuery] = useState('')
  // React 19: useDeferredValue keeps typing responsive while the list filters.
  const deferredQuery = useDeferredValue(query, '')

  const label = (item: AnyItem, key?: string) => (key ? tr(item[key] as Localized) : '')
  const filtered = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(deferredQuery.trim().toLowerCase()),
  )

  return (
    <>
      <PageHeader
        title={t(schema.titleKey)}
        actions={
          <Button onClick={() => setEditing(emptyItem(schema))}>
            <Plus className="size-4" /> {t('common.add')}
          </Button>
        }
      />
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-slate-400 start-3" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('common.search')} className="ps-9" />
      </div>
      <ul className="card divide-y divide-slate-200 dark:divide-slate-800">
        {filtered.length === 0 && <li className="p-6 text-center text-sm text-slate-500">{t('common.empty')}</li>}
        {filtered.map((item) => {
          const index = items.findIndex((i) => i.id === item.id)
          return (
            <li key={item.id} className="flex items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-900 dark:text-white">{label(item, schema.primary)}</p>
                <p className="truncate text-sm text-slate-500">
                  {label(item, schema.secondary) ||
                    (Array.isArray(item.items) ? (item.items as string[]).join(', ') : '')}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <IconBtn label={t('common.moveUp')} disabled={index === 0} onClick={() => dispatch(moveItem({ collection, id: item.id, direction: -1 }))}>
                  <ArrowUp className="size-4" />
                </IconBtn>
                <IconBtn label={t('common.moveDown')} disabled={index === items.length - 1} onClick={() => dispatch(moveItem({ collection, id: item.id, direction: 1 }))}>
                  <ArrowDown className="size-4" />
                </IconBtn>
                <IconBtn label={t('common.edit')} onClick={() => setEditing(item)}>
                  <Pencil className="size-4" />
                </IconBtn>
                <IconBtn
                  label={t('common.delete')}
                  danger
                  onClick={() => window.confirm(t('common.confirmDelete')) && dispatch(removeItem({ collection, id: item.id }))}
                >
                  <Trash2 className="size-4" />
                </IconBtn>
              </div>
            </li>
          )
        })}
      </ul>
      {editing && <EditorModal collection={collection} schema={schema} item={editing} onClose={() => setEditing(null)} />}
    </>
  )
}

function IconBtn({ label, onClick, disabled, danger, children }: { label: string; onClick: () => void; disabled?: boolean; danger?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`grid size-9 place-items-center rounded-lg transition disabled:opacity-30 ${danger ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
    >
      {children}
    </button>
  )
}

function EditorModal({ collection, schema, item, onClose }: { collection: CollectionKey; schema: Schema; item: AnyItem; onClose: () => void }) {
  const { t } = useLanguage()
  const { notify } = useToast()
  const dispatch = useAppDispatch()

  const [, saveAction] = useActionState(async (_prev: null, formData: FormData) => {
    const next: AnyItem = { id: item.id || uid(collection.slice(0, 3)) }
    for (const field of schema.fields) {
      const raw = String(formData.get(field.key) ?? '').trim()
      if (field.type === 'localized' || field.type === 'localizedText' || field.type === 'markdown') next[field.key] = readLocalized(formData, field.key)
      else if (field.type === 'slug') next[field.key] = slugify(raw) || slugify((next.title as Localized | undefined)?.en ?? '') || next.id
      else if (field.type === 'date') next[field.key] = raw || today()
      else if (field.type === 'tags') next[field.key] = raw.split(',').map((s) => s.trim()).filter(Boolean)
      else if (field.type === 'links') next[field.key] = parseLinks(raw)
      else if (field.type === 'checkbox') next[field.key] = formData.get(field.key) === 'on'
      else next[field.key] = raw
    }
    dispatch(upsertItem({ collection, item: next as unknown as CollectionItem<typeof collection> } as never))
    notify(t('common.saved'))
    onClose()
    return null
  }, null)

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:items-center">
      <div className="admin-modal card w-full max-w-2xl bg-white p-6 dark:bg-slate-900" role="dialog" aria-modal="true">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{item.id ? t('common.edit') : t('common.add')} — {t(schema.titleKey)}</h2>
          <button type="button" onClick={onClose} aria-label={t('common.cancel')} className="grid size-9 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="size-5" />
          </button>
        </div>
        <form action={saveAction} className="space-y-4">
          {schema.fields.map((field) => {
            const value = item[field.key]
            switch (field.type) {
              case 'localized':
              case 'localizedText':
                return <LocalizedField key={field.key} name={field.key} label={field.label} value={value as Localized} multiline={field.type === 'localizedText'} required={field.key === schema.primary} />
              case 'tags':
                return (
                  <Field key={field.key} label={field.label} hint={field.hint} htmlFor={field.key}>
                    <Input id={field.key} name={field.key} defaultValue={(value as string[]).join(', ')} dir="ltr" />
                  </Field>
                )
              case 'markdown':
                return (
                  <div key={field.key}>
                    <LocalizedField name={field.key} label={field.label} value={value as Localized} multiline rows={12} />
                    {field.hint && <p className="mt-1 text-xs text-slate-500">{field.hint}</p>}
                  </div>
                )
              case 'date':
                return (
                  <Field key={field.key} label={field.label} htmlFor={field.key}>
                    <Input id={field.key} name={field.key} type="date" defaultValue={String(value ?? '')} dir="ltr" />
                  </Field>
                )
              case 'links':
                return (
                  <Field key={field.key} label={field.label} hint={field.hint} htmlFor={field.key}>
                    <Textarea id={field.key} name={field.key} rows={3} dir="ltr" defaultValue={((value as ProjectLink[] | undefined) ?? []).map((l) => `${l.label} | ${l.url}`).join('\n')} />
                  </Field>
                )
              case 'checkbox':
                return <Toggle key={field.key} name={field.key} label={field.label} checked={Boolean(value)} />
              case 'category':
                return (
                  <Field key={field.key} label={field.label} htmlFor={field.key}>
                    <select id={field.key} name={field.key} defaultValue={String(value)} className="input">
                      <option value="professional">{t('projects.professional')}</option>
                      <option value="personal">{t('projects.personal')}</option>
                    </select>
                  </Field>
                )
              default:
                return (
                  <Field key={field.key} label={field.label} hint={field.hint} htmlFor={field.key}>
                    <Input id={field.key} name={field.key} defaultValue={String(value ?? '')} dir="ltr" placeholder={field.type === 'month' ? '2024-01' : ''} pattern={field.type === 'month' ? '^(\\d{4}(-\\d{2})?|present)$' : undefined} />
                  </Field>
                )
            }
          })}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <SubmitButton pendingText={t('common.saving')}>{t('common.save')}</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  )
}
