import { create } from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  userName: string | null
  timezone: string | null
  signIn: (provider: string, userName: string | null, timezone: string) => void
  setTimezone: (timezone: string) => void
  signOut: () => void
}

const storageKey = 'kerascalendar-auth'

function readStoredSession() {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, userName: null as string | null, timezone: null as string | null }
  }

  try {
    const storedValue = window.localStorage.getItem(storageKey)
    if (!storedValue) {
      return { isAuthenticated: false, userName: null as string | null, timezone: null as string | null }
    }

    const parsed = JSON.parse(storedValue) as Partial<AuthState>
    return {
      isAuthenticated: Boolean(parsed.isAuthenticated),
      userName: typeof parsed.userName === 'string' ? parsed.userName : null,
      timezone: typeof parsed.timezone === 'string' ? parsed.timezone : null,
    }
  } catch {
    return { isAuthenticated: false, userName: null as string | null, timezone: null as string | null }
  }
}

function persistSession(next: { isAuthenticated: boolean; userName: string | null; timezone: string | null }) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(next))
  } catch {
    // Ignore storage errors in the demo environment.
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  ...readStoredSession(),
  signIn: (provider, userName, timezone) => {
    const next = {
      isAuthenticated: true,
      userName: provider === 'Email' ? userName ?? 'Lizzy' : `${provider} user`,
      timezone,
    }

    set((state) => ({ ...state, ...next }))
    persistSession(next)
  },
  setTimezone: (timezone) => {
    set((state) => {
      const next = { ...state, timezone }
      persistSession(next)
      return next
    })
  },
  signOut: () => {
    const next = { isAuthenticated: false, userName: null, timezone: null }

    set((state) => ({ ...state, ...next }))
    persistSession(next)
  },
}))
