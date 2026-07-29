import type { Activity } from '@/types'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
const SCOPES = 'https://www.googleapis.com/auth/calendar.events'

let tokenClient: TokenClient | null = null
let gisInited = false
let accessToken: string | null = null

export type GoogleStatus = 'disconnected' | 'connecting' | 'connected' | 'error'

type StatusListener = (status: GoogleStatus) => void
const statusListeners: StatusListener[] = []

function notifyListeners(status: GoogleStatus) {
  statusListeners.forEach((fn) => fn(status))
}

export function onGoogleStatusChange(fn: StatusListener) {
  statusListeners.push(fn)
  return () => {
    const i = statusListeners.indexOf(fn)
    if (i >= 0) statusListeners.splice(i, 1)
  }
}

export async function initGoogleApi(): Promise<void> {
  if (gisInited || !GOOGLE_CLIENT_ID) return

  try {
    await loadGisScript()
    const googleObj = window.google
    if (!googleObj?.accounts?.oauth2) {
      notifyListeners('error')
      return
    }
    tokenClient = googleObj.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: SCOPES,
      callback: (response: TokenResponse) => {
        if (response.error) {
          notifyListeners('error')
          return
        }
        accessToken = response.access_token
        notifyListeners('connected')
      },
    })
    gisInited = true
  } catch {
    notifyListeners('error')
  }
}

function loadGisScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load GIS script'))
    document.head.appendChild(script)
  })
}

export async function connectGoogleCalendar(): Promise<void> {
  if (!tokenClient) {
    notifyListeners('error')
    return
  }
  notifyListeners('connecting')
  tokenClient.requestAccessToken({ prompt: 'consent' })
}

export function disconnectGoogleCalendar(): void {
  accessToken = null
  notifyListeners('disconnected')
}

export function isGoogleConnected(): boolean {
  return !!accessToken
}

export async function syncActivityToGoogle(activity: Activity): Promise<boolean> {
  if (!accessToken) return false

  try {
    const event = {
      summary: activity.title,
      description: activity.description || '',
      start: {
        dateTime: `2026-07-28T${activity.startTime}:00`,
        timeZone: activity.timezone,
      },
      end: {
        dateTime: `2026-07-28T${activity.endTime}:00`,
        timeZone: activity.timezone,
      },
      colorId: getGoogleColorId(activity.color),
    }

    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      },
    )

    if (!response.ok) {
      if (response.status === 401) {
        accessToken = null
        notifyListeners('disconnected')
      }
      return false
    }

    return true
  } catch {
    return false
  }
}

function getGoogleColorId(hexColor: string): string {
  const colorMap: Record<string, string> = {
    '#FF8A00': '4',
    '#FF0000': '1',
    '#00FF00': '2',
    '#0000FF': '3',
    '#FFFF00': '5',
    '#FF00FF': '6',
    '#00FFFF': '7',
    '#808080': '8',
    '#008000': '9',
    '#800080': '10',
    '#FFD700': '11',
  }
  return colorMap[hexColor.toUpperCase()] || '1'
}
