import { Toggle } from '../../components/ui/Field'
import { useLanguage } from '../../context/LanguageContext'
import { useAppDispatch, useAppSelector } from '../../store'
import { toggleSection } from '../../store/slices/portfolioSlice'
import type { SectionKey } from '../../types'
import PageHeader from '../components/PageHeader'

export default function SectionsPage() {
  const { t } = useLanguage()
  const dispatch = useAppDispatch()
  const sections = useAppSelector((state) => state.portfolio.sections)

  return (
    <>
      <PageHeader title={t('admin.sections')} subtitle={t('admin.sectionsHint')} />
      <div className="card grid gap-3 p-6 sm:grid-cols-2">
        {(Object.keys(sections) as SectionKey[]).map((key) => (
          <Toggle key={key} label={t(`nav.${key}`)} checked={sections[key]} onChange={() => dispatch(toggleSection(key))} />
        ))}
      </div>
    </>
  )
}
