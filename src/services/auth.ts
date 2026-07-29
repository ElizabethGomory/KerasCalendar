import type { OAuthProvider, User } from '@/types'
import { useAuthStore } from '@/store'

const MOCK_USER: User = {
  id: '1',
  email: 'user@example.com',
  name: 'Usuario Demo',
  oauthProvider: 'email',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export async function loginWithOAuth(_provider: OAuthProvider): Promise<User> {
  await new Promise((r) => setTimeout(r, 300))
  const store = useAuthStore.getState()
  store.setUser(MOCK_USER)
  return MOCK_USER
}

export async function loginWithEmail(email: string, _password: string): Promise<User> {
  await new Promise((r) => setTimeout(r, 300))
  const store = useAuthStore.getState()
  const user: User = { ...MOCK_USER, email, oauthProvider: 'email' }
  store.setUser(user)
  return user
}

export async function logout(): Promise<void> {
  const store = useAuthStore.getState()
  store.logout()
}
