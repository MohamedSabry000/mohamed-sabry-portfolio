import { cn } from '../../lib/utils'

export default function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="progressbar"
      aria-label="loading"
      className={cn(
        'inline-block size-4 animate-spin rounded-full border-2 border-current border-e-transparent',
        className,
      )}
    />
  )
}
