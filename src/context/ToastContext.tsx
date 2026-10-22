import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { uid } from '../lib/utils'

type ToastType = 'success' | 'error'
interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastContextValue {
  notify: (message: string, type?: ToastType) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const notify = useCallback((message: string, type: ToastType = 'success') => {
    const id = uid('toast')
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => setToasts((prev) => prev.filter((toast) => toast.id !== id)), 3000)
  }, [])

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="toast-enter pointer-events-auto flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="size-5 text-emerald-500" />
            ) : (
              <XCircle className="size-5 text-rose-500" />
            )}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext>
  )
}

export function useToast() {
  const context = use(ToastContext)
  if (!context) throw new Error('useToast must be used inside <ToastProvider>')
  return context
}
