import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { DashboardLayout } from '@/app/layouts/DashboardLayout'

const LandingPage = lazy(() => import('@/features/auth/pages/LandingPage').then((m) => ({ default: m.LandingPage })))
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })))
const EmailLoginPage = lazy(() => import('@/features/auth/pages/EmailLoginPage').then((m) => ({ default: m.EmailLoginPage })))
const DashboardPage = lazy(() => import('@/features/calendar/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const GroupCalendarPage = lazy(() => import('@/features/calendar/pages/GroupCalendarPage').then((m) => ({ default: m.GroupCalendarPage })))
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })))
const ProfilePage = lazy(() => import('@/features/users/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })))

function LazyFallback() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-keras-bg">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#FF8A00] border-t-transparent" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      </div>
    </div>
  )
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LazyFallback />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SuspenseWrapper><LandingPage /></SuspenseWrapper>,
  },
  {
    path: '/login',
    element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
  },
  {
    path: '/login/email',
    element: <SuspenseWrapper><EmailLoginPage /></SuspenseWrapper>,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <SuspenseWrapper><DashboardPage /></SuspenseWrapper> },
          { path: 'settings', element: <SuspenseWrapper><SettingsPage /></SuspenseWrapper> },
          { path: 'profile', element: <SuspenseWrapper><ProfilePage /></SuspenseWrapper> },
          { path: 'groups/:groupId', element: <SuspenseWrapper><GroupCalendarPage /></SuspenseWrapper> },
        ],
      },
    ],
  },
])
