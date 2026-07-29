import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router/dom'
import { ToastProvider, ToastViewport } from '@/components/ui/toast'
import { router } from '@/routes'
import '@/lib/i18n'

const queryClient = new QueryClient()

export function App() {
  useEffect(() => {
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement
    if (link) link.href = '/favicon.svg'
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
        <ToastViewport />
      </ToastProvider>
    </QueryClientProvider>
  )
}
