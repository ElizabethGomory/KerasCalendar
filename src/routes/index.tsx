import { createBrowserRouter } from 'react-router'
import { LandingPage } from '@/features/auth/pages/LandingPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { EmailLoginPage } from '@/features/auth/pages/EmailLoginPage'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { DashboardLayout } from '@/app/layouts/DashboardLayout'
import { DashboardPage } from '@/features/calendar/pages/DashboardPage'
import { GroupCalendarPage } from '@/features/calendar/pages/GroupCalendarPage'
import { SettingsPage } from '@/features/settings/pages/SettingsPage'
import { ProfilePage } from '@/features/users/pages/ProfilePage'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/login/email', element: <EmailLoginPage /> },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'groups/:groupId', element: <GroupCalendarPage /> },
        ],
      },
    ],
  },
])
