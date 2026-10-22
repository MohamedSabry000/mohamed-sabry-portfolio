import { Code2, Database, Layout, Server, Smartphone, Wrench, Palette, Lightbulb } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { useAppSelector } from '../../store'
import SectionTitle from '../ui/SectionTitle'

const icons = [Code2, Layout, Palette, Smartphone, Server, Database, Wrench, Lightbulb]

export default function Skills() {
  const { t, tr } = useLanguage()
  const groups = useAppSelector((state) => state.portfolio.skillGroups)

  return (
    <section id="skills" className="py-20">
      <div className="container-page">
        <SectionTitle title={t('skills.title')} subtitle={t('skills.subtitle')} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, index) => {
            const Icon = icons[index % icons.length]
            return (
              <div key={group.id} className="card p-6 transition hover:border-brand-400">
                <div className="mb-4 flex items-center gap-3">
                  <span className="bg-gradient-brand grid size-10 place-items-center rounded-xl text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white">{tr(group.name)}</h3>
                </div>
                <ul className="flex flex-wrap gap-2" dir="ltr">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
