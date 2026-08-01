import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  isAuthenticated: boolean
  userName: string | null
  signIn: (provider: string) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userName: null,
      signIn: (provider) =>
        set({
          isAuthenticated: true,
          userName: provider === 'Email' ? 'Lizzy' : `${provider} user`,
        }),
      signOut: () => set({ isAuthenticated: false, userName: null }),
    }),
    {
      name: 'kerascalendar-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userName: state.userName,
      }),
    },
  ),
)
