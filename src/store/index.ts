import { create } from 'zustand'
import type { User, Group, Activity } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))

interface CalendarState {
  currentDate: Date
  view: 'day' | 'week' | 'month' | 'year'
  activities: Activity[]
  setCurrentDate: (date: Date) => void
  setView: (view: CalendarState['view']) => void
  setActivities: (activities: Activity[]) => void
}

export const useCalendarStore = create<CalendarState>((set) => ({
  currentDate: new Date(),
  view: 'month',
  activities: [],
  setCurrentDate: (currentDate) => set({ currentDate }),
  setView: (view) => set({ view }),
  setActivities: (activities) => set({ activities }),
}))

interface GroupState {
  groups: Group[]
  currentGroupId: string | null
  setGroups: (groups: Group[]) => void
  setCurrentGroupId: (id: string | null) => void
}

export const useGroupStore = create<GroupState>((set) => ({
  groups: [],
  currentGroupId: null,
  setGroups: (groups) => set({ groups }),
  setCurrentGroupId: (currentGroupId) => set({ currentGroupId }),
}))
