export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-slate-500 dark:text-slate-400">{subtitle}</p>}
      <div className="bg-gradient-brand mx-auto mt-4 h-1 w-16 rounded-full" />
    </div>
  )
}
