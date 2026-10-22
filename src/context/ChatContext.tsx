import { createContext, use, useMemo, useState, type ReactNode } from 'react'

interface ChatUIContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export const ChatUIContext = createContext<ChatUIContextValue | null>(null)

export function ChatUIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
    }),
    [isOpen],
  )
  return <ChatUIContext value={value}>{children}</ChatUIContext>
}

export function useChatUI() {
  const context = use(ChatUIContext)
  if (!context) throw new Error('useChatUI must be used inside <ChatUIProvider>')
  return context
}
