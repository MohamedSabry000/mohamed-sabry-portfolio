import type { ReactNode } from 'react'
import { ChatUIProvider } from '../../context/ChatContext'
import { useAppSelector } from '../../store'
import ChatWidget from '../chat/ChatWidget'
import Footer from './Footer'
import Navbar from './Navbar'

export default function PublicLayout({ children }: { children: ReactNode }) {
  const agentEnabled = useAppSelector((state) => state.agent.enabled)
  return (
    <ChatUIProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      {agentEnabled && <ChatWidget />}
    </ChatUIProvider>
  )
}
