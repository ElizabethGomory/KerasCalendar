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

  it('marks a slot as conditioned when it overlaps a blocked window', () => {
    const suggestions = getAvailabilitySuggestions([
      {
        id: '1',
        title: 'Trabajo',
        category: 'Trabajo',
        description: '',
        date: '2026-08-03',
        start: '10:00',
        end: '12:00',
        color: '#ff8a00',
        flexibility: 'fija',
        recurring: 'none',
      },
    ], 2)

    const match = suggestions[0]?.slots.find((slot) => slot.label === '10:00 - 12:00')

    expect(match?.status).toBe('Disponible condicionado')
  })

  it('excludes night rest windows from the suggestions', () => {
    const suggestions = getAvailabilitySuggestions([], 2)
    const nightSlot = suggestions[0]?.slots.find((slot) => slot.label === '23:00 - 01:00')

    expect(nightSlot).toBeUndefined()
  })
})
