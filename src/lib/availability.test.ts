import { describe, expect, it } from 'vitest'
import { getAvailabilitySuggestions } from './availability'

describe('getAvailabilitySuggestions', () => {
  it('returns free windows after subtracting blocked time', () => {
    const suggestions = getAvailabilitySuggestions([
      {
        id: '1',
        title: 'Trabajo',
        category: 'Trabajo',
        description: '',
        date: '2026-08-03',
        start: '09:00',
        end: '17:00',
        color: '#ff8a00',
        flexibility: 'fija',
        recurring: 'none',
      },
    ], 2)

    expect(suggestions[0]?.day).toBe('2026-08-03')
    expect(suggestions[0]?.slots.length).toBeGreaterThan(0)
    expect(suggestions[0]?.slots[0]?.status).toBeDefined()
  })
})
