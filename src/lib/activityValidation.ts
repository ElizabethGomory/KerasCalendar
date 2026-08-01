import type { Activity } from './availability'

export function validateActivity(activity: Activity, activities: Activity[]) {
  const start = toMinutes(activity.start)
  const end = toMinutes(activity.end)

  if (end <= start) {
    return { valid: false, message: 'La hora de fin debe ser posterior a la de inicio.' }
  }

  const sameDayActivities = activities.filter((item) => item.date === activity.date && item.id !== activity.id)
  const overlaps = sameDayActivities.some((item) => {
    const itemStart = toMinutes(item.start)
    const itemEnd = toMinutes(item.end)
    return start < itemEnd && end > itemStart
  })

  if (overlaps) {
    return { valid: false, message: 'Ese rango solapa con otra actividad del día.' }
  }

  return { valid: true, message: '' }
}

function toMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}
