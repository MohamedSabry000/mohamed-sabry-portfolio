import { Field, Input, Textarea } from '../../components/ui/Field'
import { useLanguage } from '../../context/LanguageContext'
import type { Localized } from '../../types'

interface Props {
  name: string
  label: string
  value?: Localized
  multiline?: boolean
  required?: boolean
  rows?: number
}

export default function LocalizedField({ name, label, value, multiline, required, rows = 4 }: Props) {
  const { t } = useLanguage()
  const Control = multiline ? Textarea : Input
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label={`${label} (${t('common.english')})`} htmlFor={`${name}.en`}>
        <Control id={`${name}.en`} name={`${name}.en`} defaultValue={value?.en} dir="ltr" required={required} rows={rows} />
      </Field>
      <Field label={`${label} (${t('common.arabic')})`} htmlFor={`${name}.ar`}>
        <Control id={`${name}.ar`} name={`${name}.ar`} defaultValue={value?.ar} dir="rtl" rows={rows} />
      </Field>
    </div>
  )
}

export const readLocalized = (formData: FormData, name: string): Localized => ({
  en: String(formData.get(`${name}.en`) ?? '').trim(),
  ar: String(formData.get(`${name}.ar`) ?? '').trim(),
})
