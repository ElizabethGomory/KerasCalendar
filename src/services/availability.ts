import type { Activity, AvailabilitySlot, AvailabilityStatus } from '@/types'

export interface UserSchedule {
  userId: string
  timezone: string
  activities: Activity[]
}

const NIGHT_START = 23
const NIGHT_END = 7

function toMinutes(h: number, m: number = 0): number {
  return h * 60 + m
}

function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return toMinutes(h, m)
}

function isNightTime(startMinutes: number, endMinutes: number, _userTimezone: string): boolean {
  const tzOffset = -new Date().getTimezoneOffset()
  const localStart = (startMinutes + tzOffset + 1440) % 1440
  const localEnd = (endMinutes + tzOffset + 1440) % 1440
  const nightStartMin = toMinutes(NIGHT_START)
  const nightEndMin = toMinutes(NIGHT_END)

  if (localStart < localEnd) {
    return (localStart < nightEndMin && localEnd > nightStartMin)
  }
  return (localStart > nightStartMin || localEnd < nightEndMin)
}

function buildBusyIntervals(activities: Activity[]): { start: number; end: number; flexibility: string }[] {
  return activities.map((a) => ({
    start: parseTimeToMinutes(a.startTime),
    end: parseTimeToMinutes(a.endTime),
    flexibility: a.flexibility,
  }))
}

function findGaps(
  busySlots: { start: number; end: number; flexibility: string }[],
  dayStart: number,
  dayEnd: number,
): { start: number; end: number; conditionedBy: string[] }[] {
  const sorted = [...busySlots].sort((a, b) => a.start - b.start)
  const gaps: { start: number; end: number; conditionedBy: string[] }[] = []
  let current = dayStart

  for (const slot of sorted) {
    if (slot.start > current) {
      gaps.push({ start: current, end: slot.start, conditionedBy: [] })
    }
    current = Math.max(current, slot.end)
  }
  if (current < dayEnd) {
    gaps.push({ start: current, end: dayEnd, conditionedBy: [] })
  }

  return gaps
}

export function calculateAvailability(schedules: UserSchedule[]): AvailabilitySlot[] {
  if (schedules.length === 0) return []

  const dayStart = toMinutes(0)
  const dayEnd = toMinutes(24 * 60)

  const allGaps = schedules.map((schedule) => {
    const busy = buildBusyIntervals(schedule.activities)
    const gaps = findGaps(busy, dayStart, dayEnd)

    return gaps.filter((g) => !isNightTime(g.start, g.end, schedule.timezone))
  })

  if (allGaps.length === 1) {
    return allGaps[0].map((g) => ({
      startTime: formatMinutes(g.start),
      endTime: formatMinutes(g.end),
      status: 'available' as AvailabilityStatus,
    }))
  }

  const commonGaps = findCommonGaps(allGaps)
  const resolved = resolveConditionedGaps(commonGaps)

  return resolved.map((g) => ({
    startTime: formatMinutes(g.start),
    endTime: formatMinutes(g.end),
    status: g.conditionedBy.length > 0 && g.conditionedBy.every((u) => u !== 'fixed')
      ? 'conditioned' as AvailabilityStatus
      : 'available' as AvailabilityStatus,
  }))
}

function findCommonGaps(
  userGaps: { start: number; end: number; conditionedBy: string[] }[][],
): { start: number; end: number; conditionedBy: string[] }[] {
  if (userGaps.length === 0) return []

  let result = userGaps[0].map((g) => ({ ...g }))

  for (let i = 1; i < userGaps.length; i++) {
    const next: typeof result = []
    for (const a of result) {
      for (const b of userGaps[i]) {
        const start = Math.max(a.start, b.start)
        const end = Math.min(a.end, b.end)
        if (start < end) {
          next.push({
            start,
            end,
            conditionedBy: [...new Set([...a.conditionedBy, ...b.conditionedBy])],
          })
        }
      }
    }
    result = next
  }

  return result
}

function resolveConditionedGaps(
  gaps: { start: number; end: number; conditionedBy: string[] }[],
): { start: number; end: number; conditionedBy: string[] }[] {
  return gaps.filter((g) => {
    const fixedConflicts = g.conditionedBy.filter((c) => c === 'fixed')
    return fixedConflicts.length === 0
  })
}

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}
