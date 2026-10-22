import type { ComponentProps, ReactNode, Ref } from 'react'
import { cn } from '../../lib/utils'

interface FieldProps {
  label: ReactNode
  hint?: ReactNode
  className?: string
  children: ReactNode
  htmlFor?: string
}

export function Field({ label, hint, className, children, htmlFor }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="label">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}

export function Input({
  className,
  ref,
  ...props
}: ComponentProps<'input'> & { ref?: Ref<HTMLInputElement> }) {
  return <input ref={ref} className={cn('input', className)} {...props} />
}

export function Textarea({
  className,
  ref,
  ...props
}: ComponentProps<'textarea'> & { ref?: Ref<HTMLTextAreaElement> }) {
  return <textarea ref={ref} className={cn('input min-h-24 resize-y', className)} {...props} />
}

export function Toggle({
  checked,
  onChange,
  label,
  name,
}: {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label: ReactNode
  name?: string
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800">
      <span className="text-sm font-medium">{label}</span>
      <span className="relative inline-flex">
        <input
          type="checkbox"
          name={name}
          className="peer sr-only"
          checked={onChange ? checked : undefined}
          defaultChecked={onChange ? undefined : checked}
          onChange={(event) => onChange?.(event.target.checked)}
        />
        <span className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-brand-600 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/30 dark:bg-slate-700" />
        <span className="absolute top-0.5 size-5 rounded-full bg-white shadow transition-all start-0.5 peer-checked:start-5.5" />
      </span>
    </label>
  )
}
