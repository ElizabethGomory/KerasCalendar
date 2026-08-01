import { format, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns'
import { CalendarDays, PlusCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarWidget } from '../components/CalendarWidget'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { getAvailabilitySuggestions, type Activity } from '../lib/availability'
import { validateActivity } from '../lib/activityValidation'

type CalendarFormState = {
  title: string
  category: string
  date: string
  start: string
  end: string
}

const initialForm: CalendarFormState = {
  title: '',
  category: 'Trabajo',
  date: '2026-08-03',
  start: '09:00',
  end: '17:00',
}

const initialActivities: Activity[] = [
  {
    id: '1',
    title: 'Trabajo',
    category: 'Trabajo',
    description: 'Bloque principal de trabajo',
    date: '2026-08-03',
    start: '09:00',
    end: '17:00',
    color: '#ff8a00',
    flexibility: 'fija',
    recurring: 'none',
  },
  {
    id: '2',
    title: 'Estudio',
    category: 'Estudio',
    description: 'Clase de inglés',
    date: '2026-08-03',
    start: '19:00',
    end: '20:30',
    color: '#f9c74f',
    flexibility: 'flexible',
    recurring: 'weekly',
  },
]

export function CalendarPage() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [form, setForm] = useState<CalendarFormState>(initialForm)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const today = new Date()
  const monthStart = startOfMonth(today)
  const monthEnd = endOfMonth(today)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })
  void calendarStart
  void calendarEnd

  const suggestions = useMemo(() => getAvailabilitySuggestions(activities, 2), [activities])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.title.trim()) {
      setMessage('El título es obligatorio.')
      return
    }

    const activityDraft: Activity = {
      id: editingId ?? crypto.randomUUID(),
      title: form.title.trim(),
      category: form.category,
      description: '',
      date: form.date,
      start: form.start,
      end: form.end,
      color: '#7dd3fc',
      flexibility: 'flexible',
      recurring: 'none',
    }

    const validation = validateActivity(activityDraft, activities)
    if (!validation.valid) {
      setMessage(validation.message)
      return
    }

    setActivities((current) => {
      if (editingId) {
        return current.map((item) => (item.id === editingId ? activityDraft : item))
      }
      return [...current, activityDraft]
    })

    setMessage('Actividad guardada correctamente.')
    setEditingId(null)
    setForm(initialForm)
  }

  const handleEdit = (activity: Activity) => {
    setEditingId(activity.id)
    setForm({
      title: activity.title,
      category: activity.category,
      date: activity.date,
      start: activity.start,
      end: activity.end,
    })
    setMessage('Editando actividad.')
  }

  const handleDelete = (id: string) => {
    setActivities((current) => current.filter((activity) => activity.id !== id))
    setMessage('Actividad eliminada.')
    if (editingId === id) {
      setEditingId(null)
      setForm(initialForm)
    }
  }

  return (
    <main className="dashboard-shell">
      <section className="dashboard-grid">
        <aside className="sidebar-card">
          <div>
            <p className="eyebrow">Calendario</p>
            <h2>Vista personal</h2>
          </div>
          <nav className="nav-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/calendar">Calendario</Link>
            <Link to="/dashboard">Equipos</Link>
          </nav>
          <form className="calendar-form" onSubmit={handleSubmit}>
            {message ? <p className="calendar-message">{message}</p> : null}
            <input
              aria-label="Título de actividad"
              placeholder="Título"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            />
            <select
              aria-label="Categoría"
              value={form.category}
              onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
            >
              <option>Trabajo</option>
              <option>Estudio</option>
              <option>Hobby</option>
              <option>Familia</option>
            </select>
            <input
              aria-label="Fecha"
              type="date"
              value={form.date}
              onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
            />
            <div className="calendar-form-row">
              <input
                aria-label="Hora de inicio"
                type="time"
                value={form.start}
                onChange={(event) => setForm((current) => ({ ...current, start: event.target.value }))}
              />
              <input
                aria-label="Hora de fin"
                type="time"
                value={form.end}
                onChange={(event) => setForm((current) => ({ ...current, end: event.target.value }))}
              />
            </div>
            <Button type="submit" size="sm" className="calendar-action">
              <PlusCircle size={16} /> {editingId ? 'Actualizar actividad' : 'Guardar actividad'}
            </Button>
          </form>
        </aside>

        <div className="content-stack">
          <Card title="Calendario personal" description="Añade actividades y revisa espacios disponibles.">
            <div className="calendar-header">
              <div className="calendar-title-group">
                <CalendarDays size={18} />
                <h3>{format(today, 'MMMM yyyy')}</h3>
              </div>
            </div>
            <CalendarWidget activities={activities} />
          </Card>

          <Card title="Actividades" description="Gestiona tus bloques y edita o elimina los que ya no necesites.">
            <div className="activity-list">
              {activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div>
                    <strong>{activity.title}</strong>
                    <p>{activity.date} · {activity.start} - {activity.end}</p>
                  </div>
                  <div className="activity-actions">
                    <Button type="button" size="sm" variant="secondary" onClick={() => handleEdit(activity)}>
                      Editar
                    </Button>
                    <Button type="button" size="sm" variant="ghost" onClick={() => handleDelete(activity.id)}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Sugerencias de disponibilidad" description="Ventanas recomendadas según tus actividades.">
            {suggestions.map((suggestion) => (
              <div key={suggestion.day} className="availability-block">
                <h4>{suggestion.day}</h4>
                <ul>
                  {suggestion.slots.map((slot) => (
                    <li key={slot.label}>
                      <span>{slot.label}</span>
                      <strong>{slot.status}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>
        </div>
      </section>
    </main>
  )
}
