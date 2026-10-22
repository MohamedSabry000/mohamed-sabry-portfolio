import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Spinner from './components/ui/Spinner'
import PortfolioPage from './pages/PortfolioPage'
import NotFoundPage from './pages/NotFoundPage'

const AdminLogin = lazy(() => import('./admin/pages/LoginPage'))
const AdminLayout = lazy(() => import('./admin/AdminLayout'))
const Dashboard = lazy(() => import('./admin/pages/DashboardPage'))
const ProfileEditor = lazy(() => import('./admin/pages/ProfilePage'))
const CollectionPage = lazy(() => import('./admin/pages/CollectionPage'))
const SectionsPage = lazy(() => import('./admin/pages/SectionsPage'))
const AgentPage = lazy(() => import('./admin/pages/AgentPage'))
const MessagesPage = lazy(() => import('./admin/pages/MessagesPage'))
const SettingsPage = lazy(() => import('./admin/pages/SettingsPage'))

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center">
          <Spinner className="size-8" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfileEditor />} />
          <Route path="experience" element={<CollectionPage collection="experiences" />} />
          <Route path="projects" element={<CollectionPage collection="projects" />} />
          <Route path="skills" element={<CollectionPage collection="skillGroups" />} />
          <Route path="education" element={<CollectionPage collection="education" />} />
          <Route path="certificates" element={<CollectionPage collection="certificates" />} />
          <Route path="languages" element={<CollectionPage collection="languages" />} />
          <Route path="sections" element={<SectionsPage />} />
          <Route path="agent" element={<AgentPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
