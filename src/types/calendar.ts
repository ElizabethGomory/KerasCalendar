export type CalendarActivity = {
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
}
