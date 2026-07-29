import { describe, it, expect } from 'vitest'
import { calculateAvailability } from '@/services/availability'
import type { Activity } from '@/types'

const mockActivity = (overrides: Partial<Activity> = {}): Activity => ({
  id: '1',
  userId: 'user1',
  title: 'Test',
  description: '',
  category: 'work',
  flexibility: 'fixed',
  repeat: 'none',
  startTime: '09:00',
  endTime: '12:00',
  color: '#FF0000',
  timezone: 'America/Argentina/Buenos_Aires',
  isGoogleSynced: false,
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
  ...overrides,
})

describe('calculateAvailability', () => {
  it('returns available slots when no activities', () => {
    const result = calculateAvailability([
      { userId: 'user1', timezone: 'UTC', activities: [] },
    ])
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((s) => s.status === 'available')).toBe(true)
  })

  it('creates gaps around a fixed activity', () => {
    const result = calculateAvailability([
      {
        userId: 'user1',
        timezone: 'America/Argentina/Buenos_Aires',
        activities: [mockActivity({ startTime: '10:00', endTime: '11:00', flexibility: 'fixed' })],
      },
    ])
    const before = result.find((s) => s.endTime === '10:00')
    const after = result.find((s) => s.startTime === '11:00')
    expect(before?.status).toBe('available')
    expect(after?.status).toBe('available')
  })

  it('returns empty array with no schedules', () => {
    const result = calculateAvailability([])
    expect(result).toEqual([])
  })

  it('handles multiple users with different timezones', () => {
    const result = calculateAvailability([
      {
        userId: 'user1',
        timezone: 'UTC',
        activities: [mockActivity({ startTime: '09:00', endTime: '10:00' })],
      },
      {
        userId: 'user2',
        timezone: 'America/New_York',
        activities: [mockActivity({ startTime: '14:00', endTime: '15:00' })],
      },
    ])
    expect(result.length).toBeGreaterThan(0)
  })

  it('respects night time restriction', () => {
    const result = calculateAvailability([
      {
        userId: 'user1',
        timezone: 'America/Argentina/Buenos_Aires',
        activities: [],
      },
    ])
    const nightSlot = result.find((s) => s.startTime >= '23:00' || s.endTime <= '07:00')
    expect(nightSlot).toBeUndefined()
  })
})
