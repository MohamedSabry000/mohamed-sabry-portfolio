// Contact messages for the admin inbox: from MongoDB when signed in to the backend,
// otherwise from the browser's Redux Persist store.
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { useAppDispatch, useAppSelector } from '../store'
import { deleteMessage, setMessageRead } from '../store/slices/messagesSlice'
import type { ContactMessage } from '../types'

export function useMessages() {
  const { isServerSession } = useAuth()
  const dispatch = useAppDispatch()
  const localMessages = useAppSelector((state) => state.messages.items)
  const [serverMessages, setServerMessages] = useState<ContactMessage[] | null>(null)

  const refresh = useCallback(async () => {
    if (!isServerSession) return
    setServerMessages(await api<ContactMessage[]>('/messages').catch(() => null))
  }, [isServerSession])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const useServer = isServerSession && serverMessages !== null

  return {
    messages: useServer ? serverMessages : localMessages,
    setRead: async (id: string, read: boolean) => {
      if (!useServer) return void dispatch(setMessageRead({ id, read }))
      setServerMessages((items) => items?.map((m) => (m.id === id ? { ...m, read } : m)) ?? null)
      await api(`/messages/${id}`, { method: 'PATCH', body: JSON.stringify({ read }) }).catch(refresh)
    },
    remove: async (id: string) => {
      if (!useServer) return void dispatch(deleteMessage(id))
      setServerMessages((items) => items?.filter((m) => m.id !== id) ?? null)
      await api(`/messages/${id}`, { method: 'DELETE' }).catch(refresh)
    },
  }
}
