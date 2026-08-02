import { create } from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  userName: string | null
  signIn: (provider: string) => void
  signOut: () => void
}

const storageKey = 'kerascalendar-auth'

function readStoredSession() {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, userName: null as string | null }
  }

  try {
    const storedValue = window.localStorage.getItem(storageKey)
    if (!storedValue) {
      return { isAuthenticated: false, userName: null as string | null }
    }

    const parsed = JSON.parse(storedValue) as Partial<AuthState>
    return {
      isAuthenticated: Boolean(parsed.isAuthenticated),
      userName: typeof parsed.userName === 'string' ? parsed.userName : null,
    }
  } catch {
    return { isAuthenticated: false, userName: null as string | null }
  }
}

function persistSession(next: { isAuthenticated: boolean; userName: string | null }) {
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
  signIn: (provider) => {
    const next = {
      isAuthenticated: true,
      userName: provider === 'Email' ? 'Lizzy' : `${provider} user`,
    }

    set((state) => ({ ...state, ...next }))
    persistSession(next)
  },
  signOut: () => {
    const next = { isAuthenticated: false, userName: null }

    set((state) => ({ ...state, ...next }))
    persistSession(next)
  },
}))
