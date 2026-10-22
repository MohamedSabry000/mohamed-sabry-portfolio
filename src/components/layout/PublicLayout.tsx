import { Suspense, type ReactNode } from 'react'
import { ChatUIProvider } from '../../context/ChatContext'
import ChatWidget from '../chat/ChatWidget'
import Footer from './Footer'
import Navbar from './Navbar'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <ChatUIProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </ChatUIProvider>
  )
}
