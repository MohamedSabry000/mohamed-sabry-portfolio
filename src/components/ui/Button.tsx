import type { ComponentProps, Ref } from 'react'
import { useFormStatus } from 'react-dom'
import { cn } from '../../lib/utils'
import Spinner from './Spinner'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-500 focus-visible:ring-brand-500/40',
  secondary:
    'border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
  ghost: 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
  danger: 'bg-rose-600 text-white hover:bg-rose-500 focus-visible:ring-rose-500/40',
}

export const buttonClass = (variant: Variant = 'primary', className?: string) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    className,
  )

// React 19: `ref` is a regular prop for function components — no forwardRef needed.
type ButtonProps = ComponentProps<'button'> & { variant?: Variant; ref?: Ref<HTMLButtonElement> }

export function Button({ variant = 'primary', className, ref, ...props }: ButtonProps) {
  return <button ref={ref} className={buttonClass(variant, className)} {...props} />
}

// React 19: useFormStatus reads the pending state of the parent <form action>.
export function SubmitButton({
  children,
  pendingText,
  ...props
}: ButtonProps & { pendingText?: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending || props.disabled} aria-busy={pending} {...props}>
      {pending && <Spinner />}
      {pending && pendingText ? pendingText : children}
    </Button>
  )
}
