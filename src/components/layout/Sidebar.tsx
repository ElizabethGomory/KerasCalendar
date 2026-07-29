import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import {
  LayoutDashboard,
  CalendarPlus,
  Users,
  Search,
  Settings,
  User,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CreateGroupModal } from '@/features/groups/components/CreateGroupModal'
import { SearchGroupModal } from '@/features/groups/components/SearchGroupModal'
import { AddActivityModal } from '@/features/calendar/components/AddActivityModal'
import { useAuthStore, useGroupStore } from '@/store'
import { fetchUserGroups } from '@/services/groups'
import { logout as logoutService } from '@/services/auth'
import type { Group } from '@/types'

export function Sidebar() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const groups = useGroupStore((s) => s.groups)
  const [createOpen, setCreateOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [addCalendarOpen, setAddCalendarOpen] = useState(false)

  useEffect(() => {
    if (user) {
      fetchUserGroups(user.id).then((g) => {
        useGroupStore.getState().setGroups(g)
      })
    }
  }, [user])

  const handleLogout = async () => {
    await logoutService()
    navigate('/login')
  }

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '', icon: CalendarPlus, label: 'Agregar Calendario', action: () => setAddCalendarOpen(true) },
    { to: '', icon: Users, label: 'Crear Grupo', action: () => setCreateOpen(true) },
    { to: '', icon: Search, label: 'Buscar Grupo', action: () => setSearchOpen(true) },
    { to: '/dashboard/settings', icon: Settings, label: 'Configuración' },
    { to: '/dashboard/profile', icon: User, label: 'Perfil' },
  ]

  return (
    <>
      <aside className="glass-strong flex h-full w-64 flex-col gap-2 p-4 z-10">
        <div className="mb-6 flex items-center gap-2 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF8A00] text-sm font-bold text-white">
            K
          </div>
          <span className="text-lg font-semibold">KerasCalendar</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            if (item.action) {
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-keras-text/70 transition-colors hover:bg-white/30 hover:text-keras-text"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            }
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#FF8A00]/10 text-[#FF8A00]'
                      : 'text-keras-text/70 hover:bg-white/30 hover:text-keras-text',
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {groups.length > 0 && (
          <div className="mt-4 border-t border-white/30 pt-4">
            <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-keras-text/40">
              Mis Grupos
            </p>
            <div className="flex max-h-40 flex-col gap-1 overflow-y-auto">
              {groups.map((group: Group) => (
                <NavLink
                  key={group.id}
                  to={`/dashboard/groups/${group.id}`}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-[#FF8A00]/10 text-[#FF8A00]'
                        : 'text-keras-text/60 hover:bg-white/30 hover:text-keras-text',
                    )
                  }
                >
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                  <span className="truncate">{group.name}</span>
                  <ChevronRight className="ml-auto h-3 w-3 shrink-0 opacity-40" />
                </NavLink>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto border-t border-white/30 pt-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-keras-text/70 transition-colors hover:bg-white/30 hover:text-keras-text"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <AddActivityModal open={addCalendarOpen} onOpenChange={setAddCalendarOpen} />
      <CreateGroupModal open={createOpen} onOpenChange={setCreateOpen} />
      <SearchGroupModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
