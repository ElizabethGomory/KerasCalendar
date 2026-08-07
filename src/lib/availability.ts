export type Activity = {
  id: string
  title: string
  category: string
  description: string
  date: string
  start: string
  end: string
  color: string
  flexibility: 'fija' | 'flexible'
  recurring: 'none' | 'daily' | 'weekly' | 'monthly'
  repeatDays?: string[]
  repeatMonths?: number
}

export type AvailabilitySlot = {
  label: string
  start: string
  end: string
  status: 'Disponible' | 'Disponible condicionado'
}

export type AvailabilitySuggestion = {
  day: string
  slots: AvailabilitySlot[]
}

export function getAvailabilitySuggestions(activities: Activity[], windowSizeHours = 2): AvailabilitySuggestion[] {
  const day = activities[0]?.date ?? '2026-08-03'
  const startOfDay = '08:00'
  const endOfDay = '22:00'
  const slots: AvailabilitySlot[] = []

  const blocked = activities
    .filter((activity) => activity.date === day && activity.category !== 'Tiempo Libre')
    .map((activity) => ({
      start: activity.start,
      end: activity.end,
    }))

  const restStart = '23:00'
  const restEnd = '07:00'

  let current = startOfDay
  while (current < endOfDay) {
    const next = addHours(current, windowSizeHours)
    const overlapsRest = overlaps(current, next, restStart, restEnd)
    const overlapsBlocked = blocked.some((activity) => overlaps(current, next, activity.start, activity.end))

    if (!overlapsRest) {
      slots.push({
        label: `${current} - ${next}`,
        start: current,
        end: next,
        status: overlapsBlocked ? 'Disponible condicionado' : 'Disponible',
      })
    }

    current = next
  }

  return [{ day, slots }]
}

function overlaps(startA: string, endA: string, startB: string, endB: string) {
  return toMinutes(startA) < toMinutes(endB) && toMinutes(endA) > toMinutes(startB)
}

function addHours(time: string, hours: number) {
  const minutes = toMinutes(time) + hours * 60
  return formatMinutes(minutes)
}

function toMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

function formatMinutes(total: number) {
  const hours = Math.floor(total / 60)
  const minutes = total % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}
