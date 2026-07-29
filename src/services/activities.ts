import type { Activity } from '@/types'
import { useCalendarStore } from '@/store'

const STORAGE_KEY = 'keras-activities'

function loadFromStorage(): Activity[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(activities: Activity[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities))
}

export async function fetchActivities(): Promise<Activity[]> {
  const activities = loadFromStorage()
  useCalendarStore.getState().setActivities(activities)
  return activities
}

export async function createActivity(activity: Omit<Activity, 'id' | 'createdAt' | 'updatedAt' | 'isGoogleSynced'>): Promise<Activity> {
  const newActivity: Activity = {
    ...activity,
    id: crypto.randomUUID(),
    isGoogleSynced: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const activities = [...loadFromStorage(), newActivity]
  saveToStorage(activities)
  useCalendarStore.getState().setActivities(activities)
  return newActivity
}

export async function updateActivity(id: string, data: Partial<Activity>): Promise<Activity> {
  const activities = loadFromStorage()
  const index = activities.findIndex((a) => a.id === id)
  if (index === -1) throw new Error('Activity not found')
  const updated = { ...activities[index], ...data, updatedAt: new Date().toISOString() }
  activities[index] = updated
  saveToStorage(activities)
  useCalendarStore.getState().setActivities(activities)
  return updated
}

export async function deleteActivity(id: string): Promise<void> {
  const activities = loadFromStorage().filter((a) => a.id !== id)
  saveToStorage(activities)
  useCalendarStore.getState().setActivities(activities)
}
