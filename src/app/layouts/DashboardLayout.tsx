import { Outlet } from 'react-router'
import { Sidebar } from '@/components/layout/Sidebar'
import { SkipLink } from '@/components/auth/SkipLink'

export function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-keras-bg">
      <SkipLink />
      <Sidebar />
      <main id="main-content" className="flex-1 overflow-auto p-6" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  )
}
