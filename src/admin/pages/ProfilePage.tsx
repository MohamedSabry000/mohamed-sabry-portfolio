import { useActionState } from 'react'
import { SubmitButton } from '../../components/ui/Button'
import { Field, Input, Toggle } from '../../components/ui/Field'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
import { wait } from '../../lib/utils'
import { useAppDispatch, useAppSelector } from '../../store'
import { setSoftSkills, updateProfile } from '../../store/slices/portfolioSlice'
import LocalizedField, { readLocalized } from '../components/LocalizedField'
import PageHeader from '../components/PageHeader'

export default function ProfilePage() {
  const { t } = useLanguage()
  const { notify } = useToast()
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) => state.portfolio.profile)
  const softSkills = useAppSelector((state) => state.portfolio.softSkills)

  const [, saveAction] = useActionState(async (_prev: null, formData: FormData) => {
    await wait(300)
    const text = (key: string) => String(formData.get(key) ?? '').trim()
    dispatch(
      updateProfile({
        name: readLocalized(formData, 'name'),
        title: readLocalized(formData, 'title'),
        tagline: readLocalized(formData, 'tagline'),
        summary: readLocalized(formData, 'summary'),
        location: readLocalized(formData, 'location'),
        email: text('email'),
        phones: text('phones').split(',').map((p) => p.trim()).filter(Boolean),
        linkedin: text('linkedin'),
        github: text('github'),
        website: text('website'),
        avatarUrl: text('avatarUrl'),
        cvUrl: text('cvUrl'),
        yearsExperience: Number(text('yearsExperience')) || 0,
        projectsCount: Number(text('projectsCount')) || 0,
        available: formData.get('available') === 'on',
      }),
    )
    const en = text('softSkills.en').split(',').map((s) => s.trim())
    const ar = text('softSkills.ar').split(/[,،]/).map((s) => s.trim())
    dispatch(setSoftSkills(en.filter(Boolean).map((value, i) => ({ en: value, ar: ar[i] ?? '' }))))
    notify(t('common.saved'))
    return null
  }, null)

  return (
    <>
      <PageHeader title={t('admin.profile')} />
      <form action={saveAction} className="card space-y-5 p-6" key={JSON.stringify(profile)}>
        <LocalizedField name="name" label="Name" value={profile.name} required />
        <LocalizedField name="title" label="Title" value={profile.title} />
        <LocalizedField name="tagline" label="Tagline" value={profile.tagline} multiline />
        <LocalizedField name="summary" label="Summary" value={profile.summary} multiline />
        <LocalizedField name="location" label={t('about.location')} value={profile.location} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t('about.email')} htmlFor="email">
            <Input id="email" name="email" type="email" defaultValue={profile.email} dir="ltr" />
          </Field>
          <Field label={`${t('about.phone')} (comma separated)`} htmlFor="phones">
            <Input id="phones" name="phones" defaultValue={profile.phones.join(', ')} dir="ltr" />
          </Field>
          <Field label="LinkedIn" htmlFor="linkedin">
            <Input id="linkedin" name="linkedin" defaultValue={profile.linkedin} dir="ltr" />
          </Field>
          <Field label="GitHub" htmlFor="github">
            <Input id="github" name="github" defaultValue={profile.github} dir="ltr" />
          </Field>
          <Field label="Website" htmlFor="website">
            <Input id="website" name="website" defaultValue={profile.website} dir="ltr" />
          </Field>
          <Field label="Avatar image URL" htmlFor="avatarUrl">
            <Input id="avatarUrl" name="avatarUrl" defaultValue={profile.avatarUrl} dir="ltr" placeholder="https://…" />
          </Field>
          <Field label="CV file URL" htmlFor="cvUrl">
            <Input id="cvUrl" name="cvUrl" defaultValue={profile.cvUrl} dir="ltr" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label={t('hero.years')} htmlFor="yearsExperience">
              <Input id="yearsExperience" name="yearsExperience" type="number" min={0} defaultValue={profile.yearsExperience} />
            </Field>
            <Field label={t('hero.projects')} htmlFor="projectsCount">
              <Input id="projectsCount" name="projectsCount" type="number" min={0} defaultValue={profile.projectsCount} />
            </Field>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={`${t('about.softSkills')} (${t('common.english')})`} htmlFor="softSkills.en">
            <Input id="softSkills.en" name="softSkills.en" defaultValue={softSkills.map((s) => s.en).join(', ')} dir="ltr" />
          </Field>
          <Field label={`${t('about.softSkills')} (${t('common.arabic')})`} htmlFor="softSkills.ar">
            <Input id="softSkills.ar" name="softSkills.ar" defaultValue={softSkills.map((s) => s.ar).join('، ')} dir="rtl" />
          </Field>
        </div>
        <Toggle name="available" label={t('admin.available')} checked={profile.available} />
        <SubmitButton pendingText={t('common.saving')}>{t('common.save')}</SubmitButton>
      </form>
    </>
  )
}
